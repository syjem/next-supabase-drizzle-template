'use client';

import { updateProfileInfo } from '#/actions/update-profile-info';
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
import { Textarea } from '#/components/ui/textarea';
import { PersonalInfoFormData, personalInfoSchema } from '#/lib/zod/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface PersonalInfoTabProps {
  initialData: PersonalInfoFormData;
}

export function PersonalInfoTab({ initialData }: PersonalInfoTabProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: initialData,
  });

  async function onSubmit(data: PersonalInfoFormData) {
    try {
      setIsLoading(true);

      const dirtyFields = form.formState.dirtyFields;
      const changedData = Object.fromEntries(
        Object.entries(data).filter(
          ([key]) => dirtyFields[key as keyof PersonalInfoFormData],
        ),
      ) as Partial<PersonalInfoFormData>;

      if (Object.keys(changedData).length === 0) {
        toast.info('No changes to save');
        return;
      }

      await updateProfileInfo(changedData);

      form.reset(data);
      toast.success('Personal information updated successfully');
    } catch (error) {
      console.error('Failed to update personal information:', error);
      toast.error('Failed to update personal information');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Personal Information</h3>
        <p className="text-sm text-muted-foreground">
          Update your profile information and preferences.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FieldGroup>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field>
              <FieldLabel>Full Name</FieldLabel>
              <FieldContent>
                <Input {...form.register('name')} />
                <FieldError
                  errors={
                    form.formState.errors.name
                      ? [form.formState.errors.name]
                      : undefined
                  }
                />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Email</FieldLabel>
              <FieldContent>
                <Input
                  type="email"
                  {...form.register('email')}
                  readOnly
                  disabled
                />
                <FieldError
                  errors={
                    form.formState.errors.email
                      ? [form.formState.errors.email]
                      : undefined
                  }
                />
              </FieldContent>
            </Field>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field>
              <FieldLabel>Phone (Optional)</FieldLabel>
              <FieldContent>
                <Input {...form.register('phone')} />
                <FieldDescription>
                  Include country code for international numbers
                </FieldDescription>
                <FieldError
                  errors={
                    form.formState.errors.phone
                      ? [form.formState.errors.phone]
                      : undefined
                  }
                />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Location (Optional)</FieldLabel>
              <FieldContent>
                <Input {...form.register('location')} />
                <FieldError
                  errors={
                    form.formState.errors.location
                      ? [form.formState.errors.location]
                      : undefined
                  }
                />
              </FieldContent>
            </Field>
          </div>

          <Field>
            <FieldLabel>Website (Optional)</FieldLabel>
            <FieldContent>
              <Input
                placeholder="https://example.com"
                type="url"
                {...form.register('website')}
              />
              <FieldDescription>Must be a valid URL</FieldDescription>
              <FieldError
                errors={
                  form.formState.errors.website
                    ? [form.formState.errors.website]
                    : undefined
                }
              />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel>Bio (Optional)</FieldLabel>
            <FieldContent>
              <Textarea
                placeholder="Tell us about yourself..."
                className="resize-none"
                rows={4}
                {...form.register('bio')}
              />
              <FieldDescription>
                {form.watch('bio')?.length || 0}/500 characters
              </FieldDescription>
              <FieldError
                errors={
                  form.formState.errors.bio
                    ? [form.formState.errors.bio]
                    : undefined
                }
              />
            </FieldContent>
          </Field>
        </FieldGroup>

        <Button type="submit" disabled={isLoading} className="rounded-full p-5">
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </div>
  );
}
