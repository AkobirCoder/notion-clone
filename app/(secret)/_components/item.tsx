"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/clerk-react';
import { useMutation } from 'convex/react';
import { ChevronDown, ChevronRight, LucideIcon, MoreHorizontal, Plus, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

interface ItemProps {
    id?: Id<"documents">,
    label: string,
    level?: number,
    expanded?: boolean,
    active?: boolean,
    documentIcon?: string,
    icon?: LucideIcon,
    // isSearch?: boolean,
    // isSettings?: boolean,
    shortcut?: {
        modifier: string,
        key: string,
    },
    onClick?: () => void,
    onExpand?: () => void,
    onRedirect?: () => void,
}

export const Item = ({
    id, 
    label, 
    level, 
    expanded, 
    active, 
    documentIcon, 
    icon: Icon, 
    // isSearch, 
    // isSettings,
    shortcut,
    onClick, 
    onExpand, 
    onRedirect}: ItemProps
) => {
    const { user } = useUser();

    const router = useRouter();

    const createDocument = useMutation(api.document.createDocument);

    const archiveDocument = useMutation(api.document.archiveDocument);

    const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();

        if (!id) return;

        const promise = archiveDocument({id});

        router.push('/documents');

        toast.promise(promise, {
            loading: "Archiving document...",
            success: "Archived document!",
            error: "Failed to archive document",
        });
    }

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
            className={cn(`
                group min-h-6.75 w-full text-sm py-1 pr-3
                flex items-center
                text-muted-foreground font-medium
                hover:bg-primary/5 cursor-pointer
            `, active && "bg-primary/5 text-primary")}
            role="button"
            onClick={() => {
                onClick?.();

                onRedirect?.();
            }}
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

            {
                documentIcon ? (
                    <div className='shrink-0 mr-2 text-[18px]'>
                        {documentIcon}
                    </div>
                ) : Icon && (
                    <Icon className="shrink-0 h-4.5 w-4.5 mr-2 text-muted-foreground" />
                )
            }

            <span className='truncate'>{label}</span>

            {/* {
                isSearch && (
                    <kbd
                        className={`
                            inline-flex items-center gap-1 ml-auto 
                            pointer-events-none h-5 select-none rounded border 
                            bg-muted px-1.5 font-mono text-[10px] 
                            font-medium text-muted-foreground opacity-100
                        `}
                    >
                        <span>CTRL</span>K
                    </kbd>
                )
            }

            {
                isSettings && (
                    <kbd
                        className={`
                            inline-flex items-center gap-1 ml-auto 
                            pointer-events-none h-5 select-none rounded border 
                            bg-muted px-1.5 font-mono text-[10px] 
                            font-medium text-muted-foreground opacity-100
                        `}
                    >
                        <span>CTRL</span>M
                    </kbd>
                )
            } */}

            {
                shortcut && (
                    <kbd
                        className={`
                            inline-flex items-center gap-1 ml-auto 
                            pointer-events-none h-5 select-none rounded border 
                            bg-muted px-1.5 font-mono text-[10px] 
                            font-medium text-muted-foreground opacity-100
                        `}
                    >
                        <span>{shortcut.modifier}</span>
                        {shortcut.key}
                    </kbd>
                )
            }

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
                                <DropdownMenuItem className='cursor-pointer' onClick={onArchive}>
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

Item.Skeleton = function ItemSkeleton({level}: {level?: number}) {
    return (
        <div 
            style={{paddingLeft: level ? `${level * 12 + 12}px`: '12px'}}
            className='flex gap-x-2 py-0.75'
        >   
            <Skeleton className='h-4 w-4' />
            <Skeleton className='h-4 w-[30%]' />
        </div>
    );
}