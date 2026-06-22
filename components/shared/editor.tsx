"use client"

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useTheme } from 'next-themes';
import React from 'react';
import { BlockNoteView } from '@blocknote/mantine';
// import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { useCreateBlockNote } from '@blocknote/react';
import { useEdgeStore } from "@/lib/edgestore";
import { cn } from "@/lib/utils";

interface EditorProps {
    preview?: boolean,
    initialContent?: string,
    editable?: boolean,
    onChange: (value: string) => void,
}

const Editor = ({preview, initialContent, editable, onChange}: EditorProps) => {
    const { resolvedTheme } = useTheme();

    const { edgestore } = useEdgeStore();

    const handleUpload = async (file: File) => {
        const res = await edgestore.publicFiles.upload({file});

        return res.url;
    }

    const editor = useCreateBlockNote({
        editable,
        initialContent: initialContent
            ? JSON.parse(initialContent)
            : undefined,
        uploadFile: handleUpload,
    });

    return (
        <BlockNoteView
            className={cn('mt-15', preview && 'mt-0')}
            editor={editor}
            editable={editable}
            theme={resolvedTheme === "dark" ? "dark" : "light"}
            onChange={() => {
                // console.log("editor changed");

                onChange(JSON.stringify(editor.document));
            }}
        />
    );
}

export default Editor;