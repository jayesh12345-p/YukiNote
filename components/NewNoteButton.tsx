'use client';

import { User } from '@supabase/supabase-js';
import { Button } from './ui/button';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { createNoteAction } from '@/actions/note';
type Props = { user: User | null };

export default function NewNoteButton({ user }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleClickNewNoteButton = async () => {
    if (!user) {
      router.push('/login');
    } else {
      setLoading(true);
      const uuid = uuidv4();
      try {
        const res = await createNoteAction(uuid);
        if (res.errorMessage) {
          toast('Fail to create a note', {
            description: res.errorMessage,
            style: { backgroundColor: 'red', color: 'white' },
          });
          return;
        }
  
        router.push(`/?noteId=${uuid}`);
        toast('New Note created', {
          description: 'You can see your note from the sidebar now!',
          style: { backgroundColor: 'green', color: 'white' },
        });
      } catch (error) {
        toast('Error', {
          description: 'An unknown error occurred.',
          style: { backgroundColor: 'red', color: 'white' },
        });
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    }
  ;
  return (
    <Button
      onClick={handleClickNewNoteButton}
      variant={'secondary'}
      className="w-24"
      disabled={loading}
    >
      {loading ? <Loader2 className="animate-spin"></Loader2> : 'New Note'}
    </Button>
  );
}
