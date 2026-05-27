import { createClient } from '#/lib/supabase/server';
import { redirect } from 'next/navigation';

// Use this to a route where user is optional, for example a home page
export async function getUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    return null;
  }

  return data.claims;
}

// Use this to a route where user is required, for example a dashboard page
export async function getUserForProtectedRoutes() {
  const user = await getUser();

  if (!user) {
    redirect('/auth/sign-in');
  }

  return user;
}
