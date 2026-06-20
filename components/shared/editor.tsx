"use client"

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useTheme } from 'next-themes';
import React from 'react';
import { BlockNoteView } from '@blocknote/mantine';
// import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { useCreateBlockNote } from '@blocknote/react';

interface EditorProps {
    initialContent?: string,
    editable?: boolean,
    onChange: (value: string) => void,
}

const Editor = ({initialContent, editable, onChange}: EditorProps) => {
    const {resolvedTheme} = useTheme();

    const editor = useCreateBlockNote({
        editable,
        initialContent: initialContent
            ? JSON.parse(initialContent)
            : undefined,
    });

    return (
        <BlockNoteView
            editor={editor}
            theme={resolvedTheme === "dark" ? "dark" : "light"}
            onChange={() => {
                // console.log("editor changed");

                onChange(JSON.stringify(editor.document));
            }}
        />
    );
}

export default Editor;