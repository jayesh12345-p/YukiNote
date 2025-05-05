import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { shadow } from '@/styles/util';
import { Button } from './ui/button';
import DarkModeToggle from './DarkModeToggle';
import LogOutButton from './LogOutButton';
import { getUser } from '@/app/auth/server';
import { SidebarTrigger } from './ui/sidebar';
async function Header() {
  const user = await getUser();
  return (
    <header
      className="bg-popover relative flex h-24 w-full items-center justify-between px-3 sm:px-8"
      style={{ boxShadow: shadow }}
    >
      <SidebarTrigger className='absolute left-1 top-1 cursor-pointer' title="Hide the sidebar"/>
      <Link href="/" className="flex items-end gap-2">
        <Image
          src="/portrait.png"
          height={60}
          width={0}
          style={{ width: 'auto', height: '60px' }}
          alt="Portrait"
          priority
          unoptimized
        />
        <h1 className="flex flex-col pb-1 text-2xl font-semibold leading-6">
          Yuki<span>Notes</span>
        </h1>
      </Link>
      <div className="flex gap-4">
        {user ? (
          <LogOutButton/>
        ) : (
          <div className="flex gap-2">
            <Button asChild className="hidden sm:block">
              <Link href="./signup">Sign Up</Link>
            </Button>
            <Button asChild>
              <Link href="./login">Login</Link>
            </Button>
          </div>
        )}
        <DarkModeToggle />
      </div>
    </header>
  );
}

export default Header;
