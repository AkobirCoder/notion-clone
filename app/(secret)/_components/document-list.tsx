"use client"

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import React, { useState } from 'react';
import { Item } from './item';

interface DocumentListProps {
    parentDocumentId?: Id<"documents">;
    level?: number;
}

export const DocumentList = ({parentDocumentId, level = 0}: DocumentListProps) => {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const onExpand = (documentId: string) => {
        setExpanded((prevState) => {
            return {
                ...prevState,
                [documentId]: !prevState[documentId],
            }
        });
    }

    const documents = useQuery(api.document.getDocuments, {
        parentDocument: parentDocumentId,
    });

    console.log(documents);

    return (
        <>
            {
                documents?.map((document) => {
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