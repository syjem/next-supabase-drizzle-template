import { createClient } from '#/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function getOptionalUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    return null;
  }

  return data.claims;
}

export async function getUserForProtectedRoutes() {
  const user = await getOptionalUser();

  if (!user) {
    redirect('/auth/sign-in');
  }

  return user;
}
