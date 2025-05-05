'use client'

import {Note} from '@prisma/client'
import { SidebarContent as SidebarContentShadCN, SidebarMenu, SidebarMenuItem} from './ui/sidebar'
import { SearchIcon } from 'lucide-react'
import { Input } from './ui/input'
import { useEffect, useMemo, useState } from 'react'
import Fuse from "fuse.js"
import SelectNoteButton from './SelectNoteButton'
import DelectNoteButton from './DelectNoteButton'
type Props ={
    notes: Note[]
}
function SidebarGroupContent({notes}: Props) {
  const [searchText,setSearchText] = useState("")
  const [localNotes,setLocalNotes] = useState(notes)
  useEffect(()=>{
    setLocalNotes(notes)
  }, [notes])
  const fuse = useMemo(()=>{
    return new Fuse(localNotes,{
      keys:["text"],
      threshold:0.3
    })},[localNotes]
  )
  const filterNotes = searchText? fuse.search(searchText).map(result=>result.item):localNotes
  const deleteNoteLocally = (noteId: string)=>{
    setLocalNotes((prevNotes)=>prevNotes.filter((note)=>note.id!==noteId))
  }
  return (
    <SidebarContentShadCN>
      <div className="relative flex items-center">
        <SearchIcon className="absolute left-2 size-2"></SearchIcon>
        <Input className='bg-muted pl-8' placeholder='Search your notes..' value={searchText} onChange={(e)=>setSearchText(e.target.value)}></Input>

      </div>
      <SidebarMenu className='mt-4'>
        {filterNotes.map(note=>{
          return (<SidebarMenuItem key = {note.id} className='group/item'>
            <SelectNoteButton note = {note}/>
            <DelectNoteButton noteId = {note.id} deleteNoteLocally = {deleteNoteLocally}/>
          </SidebarMenuItem>)
        })}
      </SidebarMenu>

    </SidebarContentShadCN>
  )
}

export default SidebarGroupContent