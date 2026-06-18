"use client"

import { useSearch } from '@/hooks/use-search';
import { useUser } from '@clerk/clerk-react';
import React, { useEffect } from 'react';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { File } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const SearchCommand = () => {
    const { user } = useUser();

    const router = useRouter();

    const documents = useQuery(api.document.getSearchDocuments);

    const search = useSearch();

    const {isOpen, onClose, onToggle} = search;

    useEffect(() => {
        const down = (event: KeyboardEvent) => {
            if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();

                onToggle();
            }
        }

        document.addEventListener("keydown", down);

        return () => document.removeEventListener("keydown", down);
    }, [onToggle]);

    const onSelect = (id: string) => {
        router.push(`/documents/${id}`);

        onClose();
    }

    return (
        <CommandDialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <Command>
                <CommandInput placeholder={`Search ${user?.fullName}'s Notion`} />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading={"Documents"}>
                        {
                            documents?.map((document) => {
                                return (
                                    <CommandItem 
                                        key={document._id}
                                        value={`${document._id}-${document.title}`}
                                        title={document.title}
                                        onSelect={() => onSelect(document._id)}
                                        className='cursor-pointer'
                                    >
                                        {
                                            document.icon ? (
                                                <p className='mr-2 text-[18px]'>{document.icon}</p>
                                            ) : (
                                                <File className='mr-2 h-4 w-4' />
                                            )
                                        }
                                        <span>{document.title}</span>
                                    </CommandItem>
                                )
                            })
                        }
                    </CommandGroup>
                </CommandList>
            </Command>
        </CommandDialog>
    );
}