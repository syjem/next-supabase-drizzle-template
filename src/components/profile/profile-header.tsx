'use client';

import { uploadAvatar } from '#/actions/upload-avatar';
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar';
import { avatarUploadSchema } from '#/lib/zod/schema';
import { Loader2, Upload, User } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import z from 'zod';

interface ProfileHeaderProps {
  name: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
}

export function ProfileHeader({
  name,
  email,
  avatarUrl,
  bio,
}: ProfileHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // Validate file using Zod schema
      await avatarUploadSchema.parseAsync({ file });

      setIsUploading(true);

      await uploadAvatar(file);

      toast.success('Avatar updated successfully');
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.issues[0].message);
      } else {
        toast.error('Failed to upload avatar');
      }
    } finally {
      setIsUploading(false);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex flex-col items-center gap-6 rounded-lg border border-border bg-card p-8 sm:flex-row sm:items-start">
      <div className="relative">
        {avatarUrl ? (
          <Avatar className="h-24 w-24 border-4 border-border">
            <AvatarImage src={avatarUrl} alt={initials} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        ) : (
          <User className="rounded-full h-24 w-24 border-4 p-4 border-border" />
        )}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-opacity hover:opacity-90 disabled:opacity-50"
          aria-label="Upload avatar"
        >
          {isUploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileSelect}
          disabled={isUploading}
          className="hidden"
          aria-label="Select avatar image"
        />
      </div>

      <div className="flex-1 text-center sm:text-left">
        <h1 className="text-2xl font-bold">{name}</h1>
        <address className="text-muted-foreground not-italic">{email}</address>
        <p className="mt-4 text-sm text-muted-foreground">{bio}</p>
      </div>
    </div>
  );
}
