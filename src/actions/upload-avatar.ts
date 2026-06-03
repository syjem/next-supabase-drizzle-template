'use server';

import { getUser } from '#/app/auth';
import { createClient } from '#/lib/supabase/server';

export async function uploadAvatar(file: File): Promise<string> {
  const supabase = await createClient();
  const user = await getUser();

  const fileExt = file.name.split('.').pop();
  const fileName = `${user.id}-${Date.now()}.${fileExt}`;
  const filePath = `${user.id}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (uploadError) {
    throw new Error(uploadError.message || 'Failed to upload avatar');
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from('avatars').getPublicUrl(filePath);

  const { error: updateError } = await supabase.auth.updateUser({
    data: { avatar_url: publicUrl },
  });

  if (updateError) {
    throw new Error(updateError.message || 'Failed to update avatar URL');
  }

  await supabase.auth.refreshSession();

  return publicUrl;
}
