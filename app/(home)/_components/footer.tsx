import React from 'react';
import { Logo } from './logo';
import { Button } from '@/components/ui/button';

export const Footer = () => {
    return (
        <div className='flex flex-col md:flex-row md:items-center w-full p-6 bg-background z-50 border-t shadow-sm mt-10'>
            <Logo />

            <div className={`
                w-full flex flex-col items-start
                md:flex-row md:justify-end md:items-center gap-x-2 md:ml-auto 
                text-muted-foreground
            `}>
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