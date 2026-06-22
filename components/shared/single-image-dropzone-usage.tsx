'use client';

import { SingleImageDropzone } from '@/components/upload/single-image';
import {
    UploaderProvider,
    type UploadFn,
} from '@/components/upload/uploader-provider';
import { useCoverImage } from '@/hooks/use-cover-image';
import { useEdgeStore } from '@/lib/edgestore';
import * as React from 'react';

interface SingleImageDropzoneUsageProps {
    onUploadComplete: (url: string) => Promise<void>;
    disabled?: boolean;
    className?: string;
}

export function SingleImageDropzoneUsage({
    onUploadComplete,
    disabled,
    className,
}: SingleImageDropzoneUsageProps) {
    const { edgestore } = useEdgeStore();

    const coverImage = useCoverImage();

    const uploadFn: UploadFn = React.useCallback(
        async ({ file, onProgressChange, signal }) => {
            const res = await edgestore.publicFiles.upload({
                file,
                signal,
                onProgressChange,
                options: {
                    replaceTargetUrl: coverImage.url,
                }
            });

            await onUploadComplete(res.url);

            return res;
        },
        [edgestore, onUploadComplete, coverImage.url],
    );

    return (
        <UploaderProvider uploadFn={uploadFn} autoUpload>
            <SingleImageDropzone
                disabled={disabled}
                className={className}
                height={200}
                width={200}
                dropzoneOptions={{
                    maxSize: 1024 * 1024 * 5,
                }}
            />
        </UploaderProvider>
    );
}