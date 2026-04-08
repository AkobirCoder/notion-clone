"use client"

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { SignInButton } from '@clerk/clerk-react';
import { useConvexAuth } from 'convex/react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const Heroes = () => {
    const {isAuthenticated, isLoading} = useConvexAuth();

    return (
        <>
            <div className='max-w-3xl space-y-4'>
                <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>
                    Write, plan, share. With AI at your side.
                </h1>
                <h3 className='text-base sm:text-xl md:text-2xl font-medium'>
                    Notion is the connected workspace where better, faster work happens.
                </h3>

                {
                    isLoading && (
                        <div className='w-full flex items-center justify-center'>
                            <Spinner />
                        </div>
                    )
                }

                {
                    isAuthenticated && !isLoading && (
                        <Button asChild>
                            <Link href={'/documents'}>
                                Enter Notion
                                <ArrowRight className='h-4 w-4 ml-2' />
                            </Link>
                        </Button>
                    )
                }

                {
                    !isAuthenticated && !isLoading && (
                        <SignInButton mode="modal">
                            <Button>
                                Get Notion Free
                                <ArrowRight className='h-4 w-4 ml-2' />
                            </Button>
                        </SignInButton>
                    )
                }
            </div>

            <div className='flex flex-col items-center justify-center max-w-5xl'>
                <div className='flex items-center'>
                    <div className='relative h-100 w-100 hidden md:block'>
                        <Image 
                            src={'/men.svg'} 
                            alt='Heroes image' 
                            fill
                            className='object-cover dark:hidden' 
                        />
                        <Image 
                            src={'/men-dark.svg'} 
                            alt='Heroes image'
                            fill
                            className='object-cover hidden dark:block' 
                        />
                    </div>
                </div>
            </div>
        </>
    );                   
}