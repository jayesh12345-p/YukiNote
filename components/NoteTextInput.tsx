'use client';

import { useSearchParams } from 'next/navigation';
import { Textarea } from './ui/textarea';
import { ChangeEvent, useEffect } from 'react';
import { debounceTimeout } from '@/lib/constant';
import useNote from '@/hooks/useNote';
import { updateNoteAction } from '@/actions/note';


type Props = { noteId: string; startingNoteText: string };
let updatedTimeout: NodeJS.Timeout;
export default function NoteTextInput({ noteId, startingNoteText }: Props) {
  const noteIdParam = useSearchParams().get('noteId') || '';
  const { noteText, setNoteText } = useNote();
  useEffect(() => {
    if (noteIdParam === noteId) {
      setNoteText(startingNoteText);
    }
  }, [startingNoteText, noteIdParam, noteId, setNoteText]);
  const handleUpdateNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setNoteText(text);
    clearTimeout(updatedTimeout);
    updatedTimeout = setTimeout(() => {
      updateNoteAction(noteId, text);
    }, debounceTimeout);
  };
  return (
    <Textarea
      value={noteText}
      onChange={(e) => handleUpdateNote(e)}
      placeholder="Type your Note here.."
      className="custom-scroller mb-4 h-full max-w-4xl resize-none border p-4 focus-visivles:ring-0 focus-visible:ring-offset-0"
    ></Textarea>
  );
}
