"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useUser } from '@clerk/clerk-react';
import { useMutation } from 'convex/react';
import { ChevronDown, ChevronRight, MoreHorizontal, Plus, Trash } from 'lucide-react';
import React from 'react';

interface ItemProps {
    id?: Id<"documents">,
    label: string,
    level?: number,
    expanded?: boolean,
    onExpand?: () => void;
}

export const Item = ({id, label, level, expanded, onExpand}: ItemProps) => {
    const {user} = useUser();

    const createDocument = useMutation(api.document.createDocument);

    const onCreateDocument = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();

        if (!id) return;

        createDocument({
            title: "Untitled",
            parentDocument: id,
        }).then(() => {
            if (!expanded) {
                onExpand?.();
            }
        });
    }

    const handleExpand = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();

        onExpand?.();        
    }

    const ChevronIcon = expanded ? ChevronDown : ChevronRight;

    return (
        <div
            style={{paddingLeft: level ? `${level * 12 + 12}px`: '12px'}}
            className={`
                group min-h-6.75 w-full text-sm py-1 pr-3
                flex items-center
                text-muted-foreground font-medium
                hover:bg-primary/5 
            `}
        >
            {
                !!id && (
                    <div 
                        className='h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1'
                        role='button'
                        onClick={handleExpand}
                    >
                        <ChevronIcon className='h-4 w-4 shrink-0 text-muted-foreground/50' />
                    </div>
                )
            }

            <span className='truncate'>{label}</span>

            {
                !!id && (
                    <div className='ml-auto flex items-center gap-x-2'>
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                asChild
                                onClick={(event) => event.stopPropagation()}
                            >
                                <div 
                                    className={`
                                        opacity-0 group-hover:opacity-100 
                                        h-full ml-auto rounded-sm
                                        hover:bg-neutral-300 dark:hover:bg-neutral-600
                                    `}
                                >
                                    <MoreHorizontal className='h-4 w-4 text-muted-foreground' />
                                </div> 
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className='w-60'
                                align='start'
                                side='right'
                                forceMount
                            >
                                <DropdownMenuItem>
                                    <Trash className='h-4 w-4 mr-2' />
                                    Delete
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <div className='text-xs text-muted-foreground p-2'>
                                    Last edited by <span className='font-medium'>{user?.fullName}</span>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <div
                            className={`
                                opacity-0 group-hover:opacity-100 
                                h-full ml-auto rounded-sm
                                hover:bg-neutral-300 dark:hover:bg-neutral-600
                            `}
                            role='button'
                            onClick={onCreateDocument}
                        >
                            <Plus className='h-4 w-4 text-muted-foreground' />
                        </div>
                    </div>
                )
            }
        </div>
    );
}