import ConfirmModal from '@/components/modals/confirm-modal';
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

interface BannerProps {
    documentId: Id<"documents">,
}

export const Banner = ({documentId}: BannerProps) => {
    const router = useRouter();

    const removeDocument = useMutation(api.document.removeDocument);

    const restoreDocument = useMutation(api.document.restoreDocument);

    const onRemove = (documentId: Id<"documents">) => {
        const promise = removeDocument({id: documentId});

        toast.promise(promise, {
            loading: "Removing document...",
            success: "Removed document!",
            error: "Failed to remove document",
        });

        router.push('/documents');
    }

    const onRestore = () => {
        const promise = restoreDocument({id: documentId});

        toast.promise(promise, {
            loading: "Restoring document...",
            success: "Restored document!",
            error: "Failed to restore document",
        });

        router.push(`/documents/${documentId}`);
    }

    return (
        <div
            className='w-full flex items-center justify-center gap-x-2 text-center text-sm p-2 text-white bg-red-500'    
        >
            <p>This page is in the Trash.</p>
            <Button
                className={`h-auto font-normal text-white p-1 px-2
                    border-white bg-transparent hover:bg-primary/5 hover:text-white 
                    cursor-pointer
                `}
                size={"sm"}
                variant={"outline"}
                onClick={onRestore}
            >
                Restore document
            </Button>
            <ConfirmModal onConfirm={() => onRemove(documentId)}>
                <Button
                    className={`h-auto font-normal text-white p-1 px-2
                        border-white bg-transparent hover:bg-primary/5 hover:text-white 
                        cursor-pointer
                    `}
                    size={"sm"}
                    variant={"outline"}
                >
                    Delete forever
                </Button>
            </ConfirmModal>
        </div>
    );
}