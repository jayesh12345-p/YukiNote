'use server';
import { createClient } from '@/app/auth/server';
import { prisma } from '@/db/prisma';
import { handleError } from '@/lib/utils';
export const loginUserAction = async (email: string, password: string) => {
  try {
    const { auth } = await createClient();
    const { error } = await auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};
export const logOutUserAction = async () => {
  try {
    const { auth } = await createClient();
    const { error } = await auth.signOut();
    if (error) throw error;
    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};
export const SignUpUserAction = async (email: string, password: string) => {
  try {
    const { auth } = await createClient();
    const { data, error } = await auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    const userId = data.user?.id;
    if (!userId) throw new Error('Error signing up');
    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        email,
      },
    });
    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};
