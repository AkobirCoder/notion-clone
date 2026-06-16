import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useUser } from '@clerk/clerk-react';
import { useMutation } from 'convex/react';
import { MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

interface MenuProps {
    documentId: Id<"documents">,
}

export const Menu = ({documentId}: MenuProps) => {
    const { user } = useUser();

    const router = useRouter();

    const archiveDocument = useMutation(api.document.archiveDocument);
    
    const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();

        if (!documentId) return;

        const promise = archiveDocument({id: documentId});

        toast.promise(promise, {
            loading: "Archiving document...",
            success: "Archived document!",
            error: "Failed to archive document",
        });

        router.push('/documents');
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                asChild
                onClick={(event) => event.stopPropagation()}
            >
                <Button
                    className=''
                    size={"sm"}
                    variant={"ghost"}
                >
                    <MoreHorizontal className='h-4 w-4 text-muted-foreground' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className='w-60'
                align='end'
                alignOffset={3}
                forceMount
            >
                <DropdownMenuItem onClick={onArchive}>
                    <Trash className='h-4 w-4 mr-2' />
                    Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className='text-xs text-muted-foreground p-2'>
                    Last edited by <span className='font-medium'>{user?.fullName}</span>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

Menu.Skeleton = function MenuSkeleton() {
    return <Skeleton className='h-9 w-20 rounded-md' />
}