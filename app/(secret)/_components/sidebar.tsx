import { ChevronsLeft } from 'lucide-react';
import React from 'react';

export const Sidebar = () => {
    const collapse = () => {
        
    }

    return (
        <>
            <div className={`
                group/sidebar w-60 h-screen 
                bg-secondary overflow-y-auto relative 
                flex flex-col z-50
            `}>
                <div className={`
                    h-6 w-6 text-muted-foreground 
                    rounded-sm hover:bg-neutral-300 
                    dark:hover:bg-neutral-600 
                    absolute top-3 right-3 opacity-0 
                    group-hover/sidebar:opacity-100 transition
                `} role='button'>
                    <ChevronsLeft className='h-6 w-6' />
                </div>

                <div className={`
                    absolute top-0 right-0 w-1 h-full 
                    cursor-ew-resize bg-primary/10 opacity-0 
                    group-hover/sidebar:opacity-100 transition
                `} />
            </div>
        </>
    );
}