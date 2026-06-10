"use client"

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import React, { useState } from 'react';
import { Item } from './item';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface DocumentListProps {
    parentDocumentId?: Id<"documents">;
    level?: number;
}

export const DocumentList = ({parentDocumentId, level = 0}: DocumentListProps) => {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const router = useRouter();

    const onExpand = (documentId: string) => {
        setExpanded((prevState) => {
            return {
                ...prevState,
                [documentId]: !prevState[documentId],
            }
        });
    }

    const onRedirect = (documentId: string) => {
        router.push(`/documents/${documentId}`);
    }

    const documents = useQuery(api.document.getDocuments, {
        parentDocument: parentDocumentId,
    });

    console.log(documents);

    if (documents === undefined) {
        return (
            <>
                <Item.Skeleton level={level} />

                {
                    level === 0 && (
                        <>
                            <Item.Skeleton level={level} />
                            <Item.Skeleton level={level} />
                        </>
                    )
                }
            </>
        );
    }

    return (
        <>
            <p 
                className={
                    cn("hidden text-sm font-medium text-muted-foreground/80", 
                    expanded && "last:block",
                    level === 0 && "hidden")
                }
                style={{
                    paddingLeft: level ? `${level * 12 + 25}px` : undefined
                }}
            >
                No documents found.
            </p>
            {
                documents.map((document) => {
                    return (
                        <div 
                            key={document._id}
                        >
                            <Item
                                id={document._id}
                                label={document.title}
                                level={level}
                                expanded={expanded[document._id]}
                                onExpand={() => onExpand(document._id)}
                                onRedirect={() => onRedirect(document._id)}
                            />
                            {
                                expanded[document._id] && (
                                    <DocumentList 
                                        parentDocumentId={document._id} 
                                        level={level + 1}
                                    />
                                )
                            }
                        </div>
                    )
                })
            }
        </>
    );
}