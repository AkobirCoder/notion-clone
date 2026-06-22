"use client"

import { api } from '@/convex/_generated/api';
import { useCoverImage } from '@/hooks/use-cover-image';
import { useEdgeStore } from '@/lib/edgestore';
import { useMutation } from 'convex/react';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { SingleImageDropzoneUsage } from '../shared/single-image-dropzone-usage';
import { Id } from '@/convex/_generated/dataModel';

const CoverImageModal = () => {
    const params = useParams();

    const updateFields = useMutation(api.document.updateFields);

    const coverImage = useCoverImage();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onClose = () => {
        setIsSubmitting(false);

        coverImage.onClose();
    }

    const onUploadComplete = async (url: string) => {
        setIsSubmitting(true);

        await updateFields({
            id: params.documentId as Id<"documents">,
            coverImage: url
        });

        onClose();
    }
 
    return (
        <Dialog
            open={coverImage.isOpen}
            onOpenChange={coverImage.onClose}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-center font-semibold'>Cover Image</DialogTitle>
                </DialogHeader>
                <SingleImageDropzoneUsage
                    onUploadComplete={onUploadComplete}
                />
            </DialogContent>
        </Dialog>
    );
}

export default CoverImageModal;