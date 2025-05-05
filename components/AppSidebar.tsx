import { getUser } from "@/app/auth/server"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
  } from "@/components/ui/sidebar"
import { prisma } from "@/db/prisma"
import { Note } from "@prisma/client"
import Link from "next/link"
import SidebarGroupContent from "./SidebarGroupContent"
   
export async function AppSidebar() {
    const user = await getUser()
    let notes:Note[] = []
    if (user){
        notes = await prisma.note.findMany({
            where:{
                authorId: user.id,
            },
            orderBy:{
                updateAt:"desc"
            }
        })
    }
    
    return (
      <Sidebar>
        <SidebarContent className="custom-scrollbar">
          <SidebarGroup> 
            <SidebarGroupLabel className="mb-2 mt-2 text-lg">
                {user ? "Your Note":(<p> <Link href = "/login" className="underline">Login</Link> to see your notes</p>)}
            </SidebarGroupLabel>
            {user && <SidebarGroupContent notes = {notes}></SidebarGroupContent>}
          </SidebarGroup>
          <SidebarGroup> 

          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    )
  }