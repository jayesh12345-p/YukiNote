'use client';
import { useRouter } from 'next/navigation';
import React, { startTransition, useTransition } from 'react';
import { toast } from 'sonner';
import { CardContent, CardFooter } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { loginUserAction, SignUpUserAction } from '@/actions/users';
type Props = {
  type: 'login' | 'signup';
};
function AuthForm({ type }: Props) {
  const isLoginForm = type === 'login';
  const router = useRouter();
  const [isPending, setIspending] = useTransition();
  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      let errorMessage, title, description;
      if (isLoginForm) {
        errorMessage = (await loginUserAction(email, password)).errorMessage;
        title = 'Logged in';
        description = 'You have been successfully logged in';
      } else {
        errorMessage = (await SignUpUserAction(email, password)).errorMessage;
        title = 'Sign up';
        description = 'Check your email for a confirmation link.';
      }
      if (!errorMessage) {
        toast(title, {
          description,
          style: {
            backgroundColor: 'green',
            color: 'white',
          },
        });
        router.replace('/');
      } else {
        toast(errorMessage, {
          description: 'Something is wrong',
          style: {
            backgroundColor: 'red',
            color: 'white',
          },
        });
      }
    });
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        handleSubmit(formData);
      }}
    >
      <CardContent className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            type="email"
            disabled={isPending}
          ></Input>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            type="password"
            disabled={isPending}
          ></Input>
        </div>
      </CardContent>
      <CardFooter className="flex justify-contentmt-4 flex flex-col gap-6">
        <Button className="w-full">
          {isPending ? (
            <Loader2 className="animate-spin"></Loader2>
          ) : isLoginForm ? (
            'Login'
          ) : (
            'Sign Up'
          )}
        </Button>
        <p className="text-xs">
          {isLoginForm ? "Don't have an account?" : 'Already have an account'}
          <Link
            href={isLoginForm ? '/signup' : 'login'}
            className={`text-blue-500 underline ${isPending ? 'pointer-events-none opacity-50' : ''}`}
          >
            {isLoginForm ? '/sign-up' : 'login'}
          </Link>
        </p>
      </CardFooter>
    </form>
  );
}

export default AuthForm;
