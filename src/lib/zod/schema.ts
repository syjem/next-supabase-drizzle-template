import { z } from 'zod';

// Personal Information Schema
export const personalInfoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  occupation: z.string().max(100).optional(),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\+?[1-9]\d{1,14}$/.test(val),
      'Invalid phone number',
    ),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  location: z.string().max(100).optional(),
  website: z.url('Invalid URL').optional().or(z.literal('')),
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

// Account Settings Schema
export const accountSettingsSchema = z.object({
  notificationsEmail: z.boolean().default(true),
  notificationsPush: z.boolean().default(false),
  emailNewsletter: z.boolean().default(false),
});

export type AccountSettingsFormData = z.infer<typeof accountSettingsSchema>;

// Password Change Schema
export const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain an uppercase letter')
      .regex(/[0-9]/, 'Password must contain a number'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'New password must be different from current password',
    path: ['newPassword'],
  });

export type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>;

// Avatar Upload Schema
export const avatarUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      'File size must be less than 5MB',
    )
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      'Only JPEG, PNG, and WebP images are allowed',
    ),
});

export type AvatarUploadFormData = z.infer<typeof avatarUploadSchema>;
