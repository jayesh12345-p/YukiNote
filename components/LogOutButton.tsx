'use client';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { logOutUserAction } from '@/actions/users';
function LogOutButton() {
  const [Loading, setLoading] = useState(false);
  const router = useRouter();
  const handleLogOut = async () => {
    setLoading(true);
    const { errorMessage } = await logOutUserAction();
    const message: string = errorMessage ?? "Good";
    if (!errorMessage) {
      toast('Logged Out', {
        description: 'You have been successfully logged out.',
        style: {
          backgroundColor: 'green',
          color: 'white',
        },
      });
      router.push('/');
    } else {
      toast(message, {
        description: 'Something went wrong.',
        style: {
          backgroundColor: 'red',
          color: 'white',
        },
      });
    }
    setLoading(false);
  };
  return (
    <Button
      className="w-24"
      onClick={handleLogOut}
      disabled={Loading}
      variant="outline"
    >
      {Loading ? <Loader2 className="animate-spin" /> : 'Log Out'}
    </Button>
  );
}

export default LogOutButton;
