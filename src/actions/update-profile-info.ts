'use server';

import { createClient } from '#/lib/supabase/server';
import { PersonalInfoFormData } from '#/lib/zod/schema';

export async function updateProfileInfo(
  userInfo: Partial<PersonalInfoFormData>,
) {
  const supabase = await createClient();

  const patch = {
    ...(userInfo.name !== undefined && { full_name: userInfo.name }),
    ...(userInfo.occupation !== undefined && {
      occupation: userInfo.occupation,
    }),
    ...(userInfo.phone !== undefined && { phone: userInfo.phone }),
    ...(userInfo.location !== undefined && {
      location: userInfo.location,
    }),
    ...(userInfo.website !== undefined && {
      website: userInfo.website,
    }),
    ...(userInfo.bio !== undefined && { bio: userInfo.bio }),
  };

  if (Object.keys(patch).length === 0) return;

  const { error } = await supabase.auth.updateUser({ data: patch });

  if (error) throw new Error(error.message);

  await supabase.auth.refreshSession();
}
