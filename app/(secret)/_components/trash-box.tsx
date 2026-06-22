import ConfirmModal from '@/components/modals/confirm-modal';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation, useQuery } from 'convex/react';
import { Search, Trash, Undo } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

export const TrashBox = () => {
    const router = useRouter();

    const params = useParams();

    const documents = useQuery(api.document.getTrashDocuments);

    const removeDocument = useMutation(api.document.removeDocument);

    const restoreDocument = useMutation(api.document.restoreDocument);

    const [search, setSearch] = useState('');

    if (documents === undefined) {
        return (
            <div className='h-full flex items-center justify-center p-4'>
                <Spinner />
            </div>
        );
    }

    const filteredDocuments = documents.filter((document) => {
        return document.title.toLocaleLowerCase().includes(search.toLocaleLowerCase());
    });

    const onRemove = (documentId: Id<"documents">) => {
        const promise = removeDocument({id: documentId});

        toast.promise(promise, {
            loading: "Removing document...",
            success: "Removed document!",
            error: "Failed to remove document",
        });

        if (params.documentId === documentId) {
            router.push('/documents');
        }
    }

    const onRestore = (documentId: Id<"documents">) => {
        const promise = restoreDocument({id: documentId});

        toast.promise(promise, {
            loading: "Restoring document...",
            success: "Restored document!",
            error: "Failed to restore document",
        });
    }

    return (
        <div className='text-sm'>
            <div className='flex items-center gap-x-1 p-2'>
                <Search className='w-4 h-4 mr-1' />
                <Input
                    className='h-7 px-2 focus-visible:ring-transparent bg-secondary'
                    placeholder='Filter by page title...'
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />
            </div>
            <div className='mt-2 px-1 pb-1'>
                <p className='hidden last:block text-xs text-center text-muted-foreground pb-2'>
                    No documents in trash
                </p>
                {
                    filteredDocuments.map((document) => {
                        return (
                            <div
                                key={document._id}
                                className='flex items-center justify-between w-full text-primary cursor-pointer text-sm rounded-sm hover:bg-primary/5'
                                role="button"
                                onClick={() => router.push(`/documents/${document._id}`)}
                            >
                                <span className='truncate pl-2'>{document.title}</span>
                                <div className='flex items-center'>
                                    <div
                                        className='rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                                        role="button"
                                    >
                                        <Undo
                                            className='h-4 w-4 text-muted-foreground'
                                            onClick={() => onRestore(document._id)}
                                        />
                                    </div>
                                    <ConfirmModal onConfirm={() => onRemove(document._id)}>
                                        <div
                                            className='rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                                            role="button"
                                        >
                                            <Trash className='h-4 w-4 text-muted-foreground' />
                                        </div>
                                    </ConfirmModal>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}