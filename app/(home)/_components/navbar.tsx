"use client"

import React from 'react';
import { Logo } from './logo';
import { ModeToggle } from '@/components/shared/mode-toggle';
import { Button } from '@/components/ui/button';
import { useScrolled } from '@/hooks/use-scrolled';
import { cn } from '@/lib/utils';
import { SignInButton, UserButton } from '@clerk/clerk-react';
import { useConvexAuth } from 'convex/react';
import Link from 'next/link';
import { Spinner } from '@/components/ui/spinner';

export const Navbar = () => {
    const {isAuthenticated, isLoading} = useConvexAuth();

    const scrolled = useScrolled();

    return (
        <div 
            className={cn('z-50 bg-background fixed top-0 flex items-center justify-between w-full p-6', 
                scrolled && 'border-b shadow-sm'
            )}
        >
            <Logo />
            <div className='flex items-center gap-x-2'>
                {
                    isLoading && <Spinner />
                }

                {
                    !isAuthenticated && !isLoading && (
                        <>
                            <SignInButton mode="modal">
                                <Button size={'sm'} variant={'outline'}>
                                    Sign In
                                </Button>
                            </SignInButton>
                            <SignInButton mode="modal">
                                <Button size={'sm'}>
                                    Get Notion Free
                                </Button>
                            </SignInButton>
                        </>
                    )
                }

                {
                    isAuthenticated && !isLoading && (
                        <>
                            <Button variant={'outline'} size={'sm'} asChild>
                                <Link href={'/documents'}>
                                    Enter notion
                                </Link>
                            </Button>
                            <UserButton afterSignOutUrl='/' />
                        </>
                    )
                }

                <ModeToggle />
            </div>
        </div>
    );
}