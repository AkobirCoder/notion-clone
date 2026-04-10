"use client"

import { Spinner } from '@/components/ui/spinner';
import { ChildProps } from '@/types';
import { useConvexAuth } from 'convex/react';
import { redirect } from 'next/navigation';
import React from 'react';
import { Sidebar } from './_components';

const SecretLayout = ({children}: ChildProps) => {
    const {isAuthenticated, isLoading} = useConvexAuth();

    if (isLoading) {
        return (
            <div className='w-full h-full flex items-center justify-center'>
                <Spinner />
            </div>
        );
    }

    if (!isAuthenticated) {
        return redirect('/');
    }

    return (
        <div className='w-full flex'>
            <Sidebar />
            <main className='h-full flex-1 overflow-y-auto'>
                {children}
            </main>
        </div>
    );
}

export default SecretLayout;