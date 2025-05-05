'use client';
import React, { useTransition } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';
import { Loader2, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import { deleteNoteAction } from '@/actions/note';

type Props = {
  noteId: string;
  deleteNoteLocally: (noteId: string) => void;
};

function DelectNoteButton({ noteId, deleteNoteLocally }: Props) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const noteIdParam = useSearchParams().get("noteId") ||""
    const handleDeleteNote = ()=>{
        startTransition(async ()=>{
            const {errorMessage} = await deleteNoteAction(noteId)
            if (!errorMessage) {
                toast('Deleted', {
                  description: 'You have been successfully delete this note.',
                  style: {
                    backgroundColor: 'green',
                    color: 'white',
                  },
                });
                deleteNoteLocally(noteId)
                if (noteId === noteIdParam){
                    router.replace('/')
                }

              } else {
                toast(errorMessage, {
                  description: 'Delete action is not successful.',
                  style: {
                    backgroundColor: 'red',
                    color: 'white',
                  },
                });
              }
            
        })
    }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='absolute right-2 top-1/2 -translate-y-1/2 size-7 p-0 opacity-0 group-hover/item:opacity-100 [&_svg]:size-3' variant="ghost"><Trash/></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            note and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteNote} className='bg-destructive text-destructive-foreground hover:bg-destructive/90 w-24'>{isPending? <Loader2 className='animite-spin'></Loader2>:"Delete"}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DelectNoteButton;
