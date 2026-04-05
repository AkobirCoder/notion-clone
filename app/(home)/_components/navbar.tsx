import React from 'react';
import { Logo } from './logo';
import { ModeToggle } from '@/components/shared/mode-toggle';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
    return (
        <div className='z-50 bg-background fixed top-0 flex items-center justify-between w-full p-6'>
            <Logo />
            <div className='flex items-center gap-x-2'>
                <Button size={'sm'} variant={'outline'}>Sign In</Button>
                <Button size={'sm'}>Get Notion Free</Button>
                <ModeToggle />
            </div>
        </div>
    );
}