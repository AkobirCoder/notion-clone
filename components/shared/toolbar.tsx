"use client"

import { Doc } from '@/convex/_generated/dataModel';
import React, { ElementRef, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { ImageIcon, Smile, X } from 'lucide-react';
import IconPicker from './icon-picker';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import TextareaAutosize from 'react-textarea-autosize';
import { useCoverImage } from '@/hooks/use-cover-image';
import { cn } from '@/lib/utils';

interface ToolbarProps {
    document: Doc<"documents">,
    preview?: boolean,
}

export const Toolbar = ({document, preview}: ToolbarProps) => {
    const textareaRef = useRef<ElementRef<"textarea">>(null);

    const [value, setValue] = useState(document.title || "Untitled");

    const [isEditing, setIsEditing] = useState(false);

    const updateFields = useMutation(api.document.updateFields);

    const coverImage = useCoverImage();

    const onIconChange = (icon: string) => {
        updateFields({
            id: document._id,
            icon,
        });
    }

    const onRemoveIcon = () => {
        updateFields({
            id: document._id,
            icon: "",
        });
    }

    const disableInput = () => {
        setIsEditing(false);
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();

            disableInput();
        }
    }

    const onInput = (value: string) => {
        setValue(value);

        updateFields({
            id: document._id,
            title: value || "Untitled",
        });
    }

    const enableInput = () => {
        if (preview) return;

        setIsEditing(true);

        setTimeout(() => {
            setValue(document.title);

            textareaRef.current?.focus();

            textareaRef.current?.setSelectionRange(0, textareaRef.current.value.length);
        }, 0);        
    }

    return (
        <div className={cn('relative top-12 pl-13.5 group', preview && 'top-0')}>
            {
                !!document.icon && !preview && (
                    <div className='flex items-center gap-x-2 group/icon pt-6'>
                        <IconPicker onChange={onIconChange}>
                            <p className='text-6xl hover:opacity-75 transition cursor-pointer'>
                                {document.icon}
                            </p>
                        </IconPicker>
                        
                        <Button
                            size={'icon'}
                            variant={'outline'}
                            className='rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs cursor-pointer'
                            onClick={onRemoveIcon}
                        >
                            <X className='h-4 w-4' />
                        </Button>
                    </div>
                )
            }

            {
                !!document.icon && preview && (
                    <p className='text-6xl pt-6'>{document.icon}</p>
                )
            }

            <div className='flex items-center gap-x-1 py-4 opacity-0 group-hover:opacity-100'>
                {
                    !document.icon && !preview && (
                        <IconPicker asChild onChange={onIconChange}>
                            <Button
                                size={"sm"}
                                variant={"outline"}
                                className='text-muted-foreground text-xs cursor-pointer'
                            >
                                <Smile className='h-4 w-4 mr-2' />
                                <span>Add icon</span>
                            </Button>
                        </IconPicker>
                    )
                }

                {
                    !document.coverImage && !preview && (
                        <Button
                            size={"sm"}
                            variant={"outline"}
                            className='text-muted-foreground text-xs cursor-pointer'
                            onClick={coverImage.onOpen}
                        >
                            <ImageIcon className='h-4 w-4 mr-2' />
                            <span>Add cover</span>
                        </Button>
                    )
                }
            </div>

            {
                isEditing && !preview ? (
                    <TextareaAutosize 
                        ref={textareaRef}
                        value={value}
                        onBlur={disableInput} 
                        onKeyDown={onKeyDown}
                        onChange={(event) => onInput(event.target.value)}
                        className={`
                            text-5xl bg-transparent font-bold wrap-break-words outline-none
                            text-[#3F3F3F] dark:text-[#CFCFCF] resize-none    
                        `}
                    />
                ) : (
                    <div
                        className={`
                            text-5xl bg-transparent font-bold wrap-break-words outline-none
                            text-[#3F3F3F] dark:text-[#CFCFCF] pb-[11.5px] 
                        `}
                        onClick={enableInput}
                    >
                        {document.title || "Untitled"}
                    </div>
                )
            }
        </div>
    );
}