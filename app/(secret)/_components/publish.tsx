import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { Check, Copy, Globe } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

interface PublishProps {
    document: Doc<"documents">
}

export const Publish = ({document}: PublishProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const [copied, setCopied] = useState(false);

    const updateFields = useMutation(api.document.updateFields);

    const url = `${process.env.NEXT_PUBLIC_DOMAIN}/preview/${document._id}`;

    const onPublish = () => {
        setIsLoading(true);

        const promise = updateFields({
            id: document._id,
            isPublished: true,
        }).finally(() => setIsLoading(false));

        toast.promise(promise, {
            loading: "Publishing...",
            success: "Published!",
            error: "Failed to publish",
        });
    }

    const onUnpublish = () => {
        setIsLoading(true);

        const promise = updateFields({
            id: document._id,
            isPublished: false,
        }).finally(() => setIsLoading(false));

        toast.promise(promise, {
            loading: "Unpublishing...",
            success: "Unpublished!",
            error: "Failed to unpublish",
        });
    }

    const onCopy = () => {
        navigator.clipboard.writeText(url); // navigator button eventi ishlaganida matnni nusxalaydi

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className='cursor-pointer' variant={"ghost"}>
                    Share
                    {
                        document.isPublished && (
                            <Globe className='h-4 w-4 text-sky-500' />
                        )
                    }
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className='w-72'
                align='end'
                alignOffset={3}
                forceMount
            >
                {
                    !document.isPublished ? (
                        <div className='flex flex-col items-center justify-center'>
                            <Globe className='h-8 w-8 text-muted-foreground mb-2' />
                            <p className='text-sm font-medium mb-2'>Publish this document</p>
                            <span className='text-xs text-muted-foreground mb-4'>
                                Share your work with others.
                            </span>
                            <Button 
                                className='w-full text-sm cursor-pointer' 
                                size={'sm'} 
                                onClick={onPublish} 
                                disabled={isLoading}
                            >
                                Publish
                            </Button>
                        </div>
                    ) : (
                        <div className='space-y-4'>
                            <div className='flex items-center gap-x-2'>
                                <Globe className='h-4 w-4 text-sky-500 animate-pulse' />
                                <p className='text-xs font-medium text-sky-500'>
                                    This note is live on web.
                                </p>
                            </div>
                            <div className='flex items-center'>
                                <input 
                                    className='flex-1 h-8 px-2 text-xs border rounded-md rounded-r-none bg-muted truncate'
                                    value={url}
                                    disabled
                                />
                                <Button 
                                    className='h-8 rounded-l-none cursor-pointer' 
                                    disabled={copied} 
                                    onClick={onCopy}
                                >
                                    {
                                        copied ? (
                                            <Check className='h-4 w-4' />
                                        ) : (
                                            <Copy className='h-4 w-4' />
                                        )
                                    }
                                </Button>
                            </div>
                            <Button 
                                className='w-full text-sm cursor-pointer' 
                                size={'sm'} 
                                onClick={onUnpublish} 
                                disabled={isLoading}
                            >
                                Unpublish
                            </Button>
                        </div>
                    )
                }
            </PopoverContent>
        </Popover>
    );
}