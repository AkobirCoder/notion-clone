import ConfirmModal from '@/components/modals/confirm-modal';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import useSubscription from '@/hooks/use-subscription';
import { useUser } from '@clerk/clerk-react';
import { useMutation, useQuery } from 'convex/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { email } from 'zod';

interface BannerProps {
    documentId: Id<"documents">,
}

export const Banner = ({documentId}: BannerProps) => {
    const router = useRouter();

    const { user } = useUser();

    const removeDocument = useMutation(api.document.removeDocument);

    const restoreDocument = useMutation(api.document.restoreDocument);

    const allDocuments = useQuery(api.document.getAllDocuments);

    const { isLoading, plan } = useSubscription(user?.emailAddresses[0]?.emailAddress!);

    const [isRestoring, setIsRestoring] = useState(false);

    const onRestore = () => {
        if (allDocuments?.length && allDocuments.length >= 3 && plan === "Free") {
            toast.error(
                "You already have 3 notes. Please delete one to restore this note"
            );

            return;
        }

        setIsRestoring(true);

        const promise = restoreDocument({id: documentId}).finally(() => setIsRestoring(false));

        toast.promise(promise, {
            loading: "Restoring document...",
            success: "Restored document!",
            error: "Failed to restore document",
        });

        router.push(`/documents/${documentId}`);
    }

    const onRemove = (documentId: Id<"documents">) => {
        const promise = removeDocument({id: documentId});

        toast.promise(promise, {
            loading: "Removing document...",
            success: "Removed document!",
            error: "Failed to remove document",
        });

        router.push('/documents');
    }

    return (
        <div
            className='w-full flex items-center justify-center gap-x-2 text-center text-sm p-2 text-white bg-red-500/50 backdrop-blur-lg'
        >
            <p>This page is in the Trash.</p>
            <Button
                className={`h-auto font-normal text-white p-1 px-2
                    border-white bg-transparent hover:bg-primary/5 hover:text-white 
                    cursor-pointer
                `}
                size={"sm"}
                variant={"outline"}
                disabled={isLoading}
                onClick={onRestore}
            >
                {
                    isRestoring ? (
                        <>
                            <Spinner />
                            <span className='ml-2'>Restoring...</span>
                        </>
                    ) : (
                        <>
                            Restore document
                        </>
                    )
                }
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