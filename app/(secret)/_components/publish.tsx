import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { Globe } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

interface PublishProps {
    document: Doc<"documents">
}

export const Publish = ({document}: PublishProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const updateFields = useMutation(api.document.updateFields);

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

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className='cursor-pointer' variant={"ghost"}>Share</Button>
            </PopoverTrigger>
            <PopoverContent
                className='w-72'
                align='end'
                alignOffset={3}
                forceMount
            >
                {
                    !document.isPublished && (
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
                    )
                }
            </PopoverContent>
        </Popover>
    );
}