"use client"

// import { Id } from '@/convex/_generated/dataModel';
import { useParams } from 'next/navigation';
import React from 'react';

const DocumentIdPage = () => {
    const params = useParams() as { documentId: string };

    return (
        <div>{params.documentId}</div>
    );
}

export default DocumentIdPage;