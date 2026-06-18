"use client"

import { cn } from '@/lib/utils';
import { ChevronsLeft, MenuIcon, Plus, Rocket, Search, Settings, Trash } from 'lucide-react';
import React, { ElementRef, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { DocumentList } from './document-list';
import { Item } from './item';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { UserBox } from './user-box';
import { Progress } from '@/components/ui/progress';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { TrashBox } from './trash-box';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Navbar } from './navbar';
import { useSearch } from '@/hooks/use-search';
import { useSettings } from '@/hooks/use-settings';

export const Sidebar = () => {
    const isMobile = useMediaQuery("(max-width: 770px)");

    const router = useRouter();

    const params = useParams();

    const search = useSearch();

    const settings = useSettings();

    const createDocument = useMutation(api.document.createDocument);

    console.log(isMobile);

    const sidebarRef = useRef<ElementRef<"div">>(null);

    const navbarRef = useRef<ElementRef<"div">>(null);

    const isResizing = useRef(false);

    const [isCollapsed, setIsCollapsed] = useState(isMobile);

    const [isResetting, setIsResetting] = useState(false);

    useEffect(() => {
        if (isMobile) {
            collapse();
        } else {
            reset();
        }
    }, [isMobile]);

    const collapse = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true);

            setIsResetting(true);
            
            sidebarRef.current.style.width = "0";

            navbarRef.current.style.width = "100%";

            navbarRef.current.style.left = "0";

            setTimeout(() => setIsResetting(false), 300);
        } 
    }

    const reset = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false);

            setIsResetting(true);

            sidebarRef.current.style.width = isMobile ? "100%" : "240px";

            navbarRef.current.style.width = isMobile ? "0" : "calc(100% - 240px)";

            navbarRef.current.style.left = isMobile ? "100%" : "240px";

            setTimeout(() => setIsResetting(false), 300);
        }
    }

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();

        event.stopPropagation();

        isResizing.current = true;

        document.addEventListener('mousemove', handleMouseMove);

        document.addEventListener('mouseup', handleMouseUp);
    }

    const handleMouseMove = (event: MouseEvent) => {
        if (!isResizing.current) return;

        let newWidth = event.clientX;

        if (newWidth < 240) newWidth = 240;
        if (newWidth > 400) newWidth = 400;

        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`;

            navbarRef.current.style.width = `calc(100% - ${newWidth}px)`;

            navbarRef.current.style.left = `${newWidth}px`;
        } 
    }

    const handleMouseUp = () => {
        isResizing.current = false;

        document.removeEventListener('mousemove', handleMouseMove);

        document.removeEventListener('mouseup', handleMouseUp);
    }

    const onCreateDocument = () => {
        const promise = createDocument({
            title: "Untitled",
        }).then((docId) => router.push(`/documents/${docId}`));

        toast.promise(promise, {
            loading: "Creating a new document...",
            success: "Created a new document!",
            error: "Failed to create a new document",
        });
    }

    const arr = [1];

    return (
        <>
            <div 
                className={cn(`
                    group/sidebar w-60 h-screen 
                    bg-secondary relative overflow-y-auto
                    flex flex-col z-50
                `, 
                isCollapsed ? 'overflow-hidden' : 'overflow-y-auto',
                isResetting && 'transition-all ease-in duration-300', 
                isMobile && 'w-0')} 
                ref={sidebarRef}
            >
                <div 
                    className={cn(`
                        h-6 w-6 text-muted-foreground 
                        rounded-sm hover:bg-neutral-300 
                        dark:hover:bg-neutral-600 
                        absolute top-2.5 right-3 opacity-0 
                        group-hover/sidebar:opacity-100 transition
                        cursor-pointer
                    `, isMobile && 'opacity-100')} 
                    role='button' 
                    onClick={collapse}
                >
                    <ChevronsLeft className='h-6 w-6' />
                </div>

                <div>
                    <UserBox />
                    <Item 
                        label='Search' 
                        icon={Search} 
                        // isSearch
                        shortcut={{
                            modifier: "CTRL",
                            key: "K"
                        }}
                        onClick={() => {search.onOpen()}}
                    />
                    <Item 
                        label='Settings' 
                        icon={Settings}
                        // isSettings
                        shortcut={{
                            modifier: "CTRL",
                            key: "M"
                        }}
                        onClick={() => settings.onOpen()}
                    />
                    <Item 
                        label='New document' 
                        icon={Plus} 
                        onClick={onCreateDocument} 
                    />
                </div>

                <div className='mt-4'>
                    <DocumentList />
                    <Item label='Add a page' icon={Plus} onClick={onCreateDocument} />

                    <Popover>
                        <PopoverTrigger
                            className='w-full mt-4'
                        >
                            <Item label='Trash' icon={Trash} />
                        </PopoverTrigger>
                        <PopoverContent 
                            className='w-72 p-0'
                            side={isMobile ? 'bottom' : 'right'}
                        >
                            <TrashBox />
                        </PopoverContent>
                    </Popover>
                </div>

                <div 
                    className={`
                        absolute top-0 right-0 w-1 h-full
                        cursor-ew-resize bg-primary/10 opacity-0 
                        group-hover/sidebar:opacity-100 transition
                    `} 
                    onMouseDown={handleMouseDown}
                />

                <div className='absolute bottom-0 px-2 py-4 w-full bg-white/50 dark:bg-black/50'>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-1 text-[13px]'>
                            <Rocket />
                            <p className='opacity-70 font-bold'>Free plan</p>
                        </div>
                        <p className='text-[13px] opacity-70'>{arr.length}/3</p>
                    </div>

                    <Progress
                        value={
                            arr.length >= 3 ? 100 : arr.length * 33.33
                        }
                        className='mt-2 h-2'
                    />
                </div>
            </div>

            <div 
                className={cn("absolute top-0 z-50 left-60 w-[calc(100% - 240px)]",
                    isResetting && "transition-all ease-in duration-300",
                    isMobile && "w-full left-0"
                )} 
                ref={navbarRef}
            >
                {
                    !!params.documentId ? (
                        <Navbar isCollapsed={isCollapsed} reset={reset} />
                    ) : (
                        <nav className='bg-transparent px-3 py-2 w-full'>
                            {
                                isCollapsed && (
                                    <MenuIcon 
                                        className='h-6 w-6 text-muted-foreground cursor-pointer' 
                                        role='button'  
                                        onClick={reset}
                                    />
                                )
                            }
                        </nav>
                    )
                }
            </div>
        </>
    );
}