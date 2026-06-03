'use client';

import { ConfirmationDialog } from '#/components/profile/confirmation-dialog';
import { Button } from '#/components/ui/button';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '#/components/ui/field';
import { Input } from '#/components/ui/input';
import { Separator } from '#/components/ui/separator';
import { Switch } from '#/components/ui/switch';
import {
  AccountSettingsFormData,
  accountSettingsSchema,
  PasswordChangeFormData,
  passwordChangeSchema,
} from '#/lib/zod/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AlertTriangle,
  CircleCheckIcon,
  Loader2,
  OctagonXIcon,
} from 'lucide-react';
import { useState } from 'react';
import { useForm, type Resolver, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

export function AccountTab() {
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [isSettingsLoading, setIsSettingsLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  // Password change form
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const passwordForm = useForm<PasswordChangeFormData>({
    resolver: zodResolver(
      passwordChangeSchema,
    ) as Resolver<PasswordChangeFormData>,
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  // Settings form
  const settingsForm = useForm<AccountSettingsFormData>({
    resolver: zodResolver(
      accountSettingsSchema,
    ) as Resolver<AccountSettingsFormData>,
    defaultValues: {
      notificationsEmail: true,
      notificationsPush: false,
      emailNewsletter: false,
    },
  });

  const onPasswordSubmit: SubmitHandler<PasswordChangeFormData> = async (
    data,
  ) => {
    try {
      console.log('Password change data:', data);
      setIsPasswordLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      passwordForm.reset();
      toast.success('Password changed successfully');
      setShowPasswordForm(false);
    } catch (error) {
      console.error('Failed to change password:', error);
      toast.error('Failed to change password');
    } finally {
      setIsPasswordLoading(false);
    }
  };

  const onSettingsSubmit: SubmitHandler<AccountSettingsFormData> = async (
    data,
  ) => {
    try {
      setIsSettingsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Settings updated:', data);
      toast.success('Notification settings updated');
    } catch (error) {
      console.error('Failed to update settings:', error);
      toast.error('Failed to update settings');
    } finally {
      setIsSettingsLoading(false);
    }
  };

  async function handleDeleteAccount() {
    const toastId = toast.warning('Deleting account...', {
      icon: <Loader2 className="h-4 w-4 animate-spin" />,
    });
    try {
      setIsDeleteLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Account deleted');
      toast.success('Account deleted successfully', {
        id: toastId,
        icon: <CircleCheckIcon className="h-4 w-4" />,
      });
    } catch (error) {
      console.error('Failed to delete account:', error);
      toast.error('Failed to delete account', {
        id: toastId,
        icon: <OctagonXIcon className="h-4 w-4 text-red-600" />,
      });
    } finally {
      setIsDeleteLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Notification Settings */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">Notification Preferences</h3>
        <form
          onSubmit={settingsForm.handleSubmit(onSettingsSubmit)}
          className="space-y-4"
        >
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div className="space-y-0.5">
              <FieldLabel htmlFor="notificationsEmail" className="text-base">
                Email Notifications
              </FieldLabel>
              <FieldDescription>
                Receive email notifications about account activity
              </FieldDescription>
            </div>
            <Switch
              id="notificationsEmail"
              checked={settingsForm.watch('notificationsEmail')}
              onCheckedChange={(value) =>
                settingsForm.setValue('notificationsEmail', value)
              }
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div className="space-y-0.5">
              <FieldLabel htmlFor="notificationsPush" className="text-base">
                Push Notifications
              </FieldLabel>
              <FieldDescription>
                Receive push notifications on your device
              </FieldDescription>
            </div>
            <Switch
              id="notificationsPush"
              checked={settingsForm.watch('notificationsPush')}
              onCheckedChange={(value) =>
                settingsForm.setValue('notificationsPush', value)
              }
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div className="space-y-0.5">
              <FieldLabel htmlFor="emailNewsletter" className="text-base">
                Newsletter
              </FieldLabel>
              <FieldDescription>
                Receive our weekly newsletter with updates and tips
              </FieldDescription>
            </div>
            <Switch
              id="emailNewsletter"
              checked={settingsForm.watch('emailNewsletter')}
              onCheckedChange={(value) =>
                settingsForm.setValue('emailNewsletter', value)
              }
            />
          </div>

          <Button
            type="submit"
            disabled={isSettingsLoading}
            className="mt-2 rounded-full p-5"
          >
            {isSettingsLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isSettingsLoading ? 'Saving...' : 'Save Preferences'}
          </Button>
        </form>
      </div>

      <Separator />

      {/* Password Change */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">Security</h3>
        {!showPasswordForm ? (
          <div className="rounded-lg border border-border p-4">
            <p className="mb-4 text-sm text-muted-foreground">
              Manage your account security settings
            </p>
            <Button
              onClick={() => setShowPasswordForm(true)}
              variant="outline"
              className="rounded-full p-5"
            >
              Change Password
            </Button>
          </div>
        ) : (
          <div className="rounded-lg border border-border p-4">
            <form
              onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
              className="space-y-4"
            >
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="currentPassword">
                    Current Password
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      type="password"
                      id="currentPassword"
                      {...passwordForm.register('currentPassword')}
                    />
                    <FieldError
                      errors={
                        passwordForm.formState.errors.currentPassword
                          ? [passwordForm.formState.errors.currentPassword]
                          : undefined
                      }
                    />
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
                  <FieldContent>
                    <Input
                      type="password"
                      id="newPassword"
                      {...passwordForm.register('newPassword')}
                    />
                    <FieldDescription>
                      At least 8 characters with uppercase and numbers
                    </FieldDescription>
                    <FieldError
                      errors={
                        passwordForm.formState.errors.newPassword
                          ? [passwordForm.formState.errors.newPassword]
                          : undefined
                      }
                    />
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      type="password"
                      id="confirmPassword"
                      {...passwordForm.register('confirmPassword')}
                    />
                    <FieldError
                      errors={
                        passwordForm.formState.errors.confirmPassword
                          ? [passwordForm.formState.errors.confirmPassword]
                          : undefined
                      }
                    />
                  </FieldContent>
                </Field>
              </FieldGroup>

              <div className="flex gap-3 flex-wrap">
                <Button
                  type="submit"
                  disabled={isPasswordLoading}
                  className="w-full sm:w-auto rounded-full p-5"
                >
                  {isPasswordLoading && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}
                  {isPasswordLoading ? 'Changing...' : 'Change Password'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto rounded-full p-5"
                  onClick={() => {
                    setShowPasswordForm(false);
                    passwordForm.reset();
                  }}
                  disabled={isPasswordLoading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>

      <Separator />

      {/* Danger Zone */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
        <div className="mb-4 flex flex-col sm:flex-row items-start gap-3">
          <AlertTriangle className="shrink-0 mt-0.5 h-5 w-5 text-red-600 dark:text-red-400" />
          <div>
            <h3 className="font-semibold text-red-900 dark:text-red-100">
              Danger Zone
            </h3>
            <p className="mt-1 text-sm text-red-800 dark:text-red-200">
              Irreversible and destructive actions
            </p>
          </div>
        </div>

        <Button
          onClick={() => setShowDeleteDialog(true)}
          variant="destructive"
          className="rounded-full p-5"
        >
          Delete Account
        </Button>
      </div>

      {/* Delete Account Confirmation Dialog */}
      <ConfirmationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Delete Account"
        description="This action cannot be undone. All your data will be permanently deleted. This will also sign you out from all devices."
        confirmText="Delete"
        cancelText="Cancel"
        requireConfirmation="DELETE"
        isDestructive={true}
        isLoading={isDeleteLoading}
        onConfirm={handleDeleteAccount}
      />
    </div>
  );
}
