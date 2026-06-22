"use client"

import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import { ImageIcon, X } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { useCoverImage } from '@/hooks/use-cover-image';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useParams } from 'next/navigation';
import { Id } from '@/convex/_generated/dataModel';
import { useEdgeStore } from '@/lib/edgestore';

interface CoverProps {
    url?: string,
    preview?: boolean,
}

export const Cover = ({url, preview}: CoverProps) => {
    const params = useParams();
    
    const coverImage = useCoverImage();

    const { edgestore } = useEdgeStore();

    const updateFields = useMutation(api.document.updateFields);

    const onRemove = async () => {
        if (url) {
            await edgestore.publicFiles.delete({
                url,
            });

            await updateFields({
                id: params.documentId as Id<"documents">,
                coverImage: "",
            });
        }
    }

    return (
        <div 
            className={cn('relative top-12 w-full h-[25vh] group', 
                preview && 'top-0',
                !url && 'h-[25vh] bg-accent/30', 
                url && 'bg-muted')
            }
        >
            {
                !!url ? (
                    <Image fill src={url} alt="cover image" className='object-cover' />
                ) : (
                    <div className='flex items-center justify-center h-full'>
                        <p className='text-muted-foreground text-sm'>
                            Your cover image will appear here
                        </p>
                    </div>
                )
            }

            {
                url && !preview && (
                    <div className='flex items-center gap-x-2 opacity-0 group-hover:opacity-100 absolute bottom-5 right-20'>
                        <Button
                            size={"sm"}
                            variant={"outline"}
                            className='text-muted-foreground text-xs cursor-pointer backdrop-blur-sm'
                            onClick={() => coverImage.onReplace(url)}
                        >
                            <ImageIcon />
                            <span>Change cover</span>
                        </Button>
                        <Button
                            size={"sm"}
                            variant={"outline"}
                            className='text-muted-foreground text-xs cursor-pointer backdrop-blur-sm'
                            onClick={onRemove}
                        >
                            <X />
                            <span>Remove cover</span>
                        </Button>
                    </div>
                )
            }
        </div>
    );
}

Cover.Skeleton = function CoverSkeleton() {
    return <Skeleton className='w-full h-[12vh]' />
}