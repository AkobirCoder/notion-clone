"use client"

import { Cover } from '@/components/shared/cover';
import { Toolbar } from '@/components/shared/toolbar';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation, useQuery } from 'convex/react';
import dynamic from 'next/dynamic';
// import { Id } from '@/convex/_generated/dataModel';
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react';

const DocumentIdPage = () => {
    const params = useParams() as { documentId: string };

    const document = useQuery(api.document.getDocumentsById, {
        id: params.documentId as Id<"documents">
    });

    const updateFields = useMutation(api.document.updateFields);

    const Editor = useMemo(() => {
        return dynamic(() => 
            import('@/components/shared/editor'), {ssr: false}
        )
    }, []);

    if (document === undefined) {
        return (
            <>
                <Cover.Skeleton />
                <div className='md:max-w-3xl lg:max-w-4xl mx-auto mt-10'>
                    <div className='space-y-4 pl-8 pt-4'>
                        <Skeleton className='h-14 w-[50%]' />
                        <Skeleton className='h-14 w-[80%]' />
                        <Skeleton className='h-14 w-[40%]' />
                        <Skeleton className='h-14 w-[60%]' />
                    </div>
                </div>
            </>
        );
    } 

    if (document === null) {
        return null;
    }

    const onChange = (value: string) => {
        // console.log("saving", value);
        updateFields({
            id: document._id,
            content: value,
        });
    }

    return (
        <div className='pb-40'>
            <Cover url={'https://images.unsplash.com/photo-1542903660-eedba2cda473?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=4800'} />

            <div className='md:max-w-3xl lg:max-w-4xl mx-auto'>
                <Toolbar document={document} />
                <Editor editable initialContent={document.content} onChange={onChange} />
            </div>
        </div>
    );
}

export default DocumentIdPage;