import { ERRORS } from '#/constant/errors';
import { createClient } from '#/lib/supabase/server';

// Use this for routes where user is optional (e.g. home page).
export async function getClaims() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    return null;
  }

  return data.claims;
}

// Verifies if the session is still active server-side and returns the user data if valid.
// Use this for sensitive operations
export async function getUser() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  if (!data.user) throw new Error(ERRORS.UNAUTHORIZED);

  return data.user;
}
