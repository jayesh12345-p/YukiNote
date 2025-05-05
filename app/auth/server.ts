import { createServerClient } from '@supabase/ssr'

import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  console.log(process.env.SUPABASE_URL)
  const client =  createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {

          }
        },
      },
    }
  )
  return client
}

export async function getUser() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.debug('Supabase auth error:', error.message);
      return null;
    }

    return data.user;
  } catch (error) {
    console.error('Unexpected error fetching user:', error);
    return null;
  }
}