import React from 'react';
import { Logo } from './logo';
import { Button } from '@/components/ui/button';

export const Footer = () => {
    return (
        <div className='flex items-center w-full p-6 bg-background z-50 border-t shadow-sm mt-10'>
            <Logo />

            <div className='md:ml-auto w-full flex justify-between md:justify-end items-center gap-x-2 text-muted-foreground'>
                <Button variant={'ghost'} size={'sm'}>
                    Privacy Policy
                </Button>
                <Button variant={'ghost'} size={'sm'}>
                    Terms & Conditions
                </Button>
            </div>
        </div>
    );
}