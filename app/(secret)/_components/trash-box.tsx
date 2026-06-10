import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import React from 'react';

export const TrashBox = () => {
    return (
        <div className='text-sm'>
            <div className='flex items-center gap-x-1 p-2'>
                <Search className='w-4 h-4 mr-1' />
                <Input placeholder='Filter by page title...' />
            </div>

            <div className='mt-2 px-1 pb-1'>
                <p className='hidden last:block text-xs text-center text-muted-foreground pb-2'>
                    No documents in trash
                </p>
            </div>
        </div>
    );
}