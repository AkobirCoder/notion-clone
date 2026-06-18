import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { MenuIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react';
import { Title } from './title';
import { Publish } from './publish';
import { Menu } from './menu';
import { Banner } from './banner';

interface NavbarProps {
    isCollapsed: boolean,
    reset: () => void,
}

export const Navbar = ({isCollapsed, reset}: NavbarProps) => {
    const params = useParams();

    const document = useQuery(api.document.getDocumentsById, {
        id: params.documentId as Id<"documents">,
    });

    if (document === undefined) {
        return (
            <nav className='flex items-center justify-between w-full px-3 py-2 bg-background'>
                <Title.Skeleton />
                <div className='flex items-center gap-x-2'>
                    <Menu.Skeleton />
                </div>
            </nav>
        );
    }

    if (document === null) {
        return null;
    }

    return (
        <>
            <nav className='flex items-center gap-x-4 w-full px-3 py-2 bg-background'>
                {
                    isCollapsed && (
                        <MenuIcon
                            className='h-6 w-6 text-muted-foreground cursor-pointer' 
                            role="button"
                            onClick={reset}
                        />
                    )
                }
                <div className='flex items-center justify-between w-full'>
                    <Title document={document} />
                    <div className='flex items-center gap-x-2'>
                        {
                            !document.isArchived && (
                                <>
                                    <Publish document={document} />
                                    <Menu documentId={document._id} />
                                </>
                            )
                        }
                    </div>
                </div>
            </nav>

            {
                document.isArchived && (
                    <Banner documentId={document._id} />
                )
            }
        </>
    );
}