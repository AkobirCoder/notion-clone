import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { ChevronLeft, MenuIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { Title } from './title';
import { Publish } from './publish';
import { Menu } from './menu';
import { Banner } from './banner';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface NavbarProps {
    isCollapsed: boolean,
    reset: () => void,
}

export const Navbar = ({isCollapsed, reset}: NavbarProps) => {
    const params = useParams();

    const router = useRouter();

    const document = useQuery(api.document.getDocumentsById, {
        id: params.documentId as Id<"documents">,
    });

    const routes = [
        {
            label: '/documents',
            path: '/documents',
        },
        {
            label: '/home',
            path: '/',
        }
    ];

    const onRouteBack = (path: string) => {
        router.push(path);
    }

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
            <nav className='flex items-center gap-x-4 w-full px-3 py-2 bg-accent/50'>
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
                    <div className='flex items-center gap-x-2'>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    size={"sm"}
                                    variant={"outline"}
                                    className='w-10 cursor-pointer'
                                >
                                    <ChevronLeft />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                align='start'
                                className='w-45'
                            >
                                {
                                    routes.map((route) => {
                                        return (
                                            <Button
                                                key={route.path}
                                                variant={"outline"} 
                                                className='flex justify-start cursor-pointer'
                                                onClick={() => onRouteBack(route.path)}
                                            >
                                                Go
                                                <span className='text-muted-foreground text-xs font-light'>
                                                    {route.label}
                                                </span>
                                            </Button>
                                        );
                                    })
                                }
                            </PopoverContent>
                        </Popover>
                        
                        <Title document={document} />
                    </div>
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