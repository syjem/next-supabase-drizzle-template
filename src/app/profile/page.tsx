import { getUserForProtectedRoutes } from '#/app/auth';
import { AccountTab } from '#/components/profile/account-tab';
import BackButton from '#/components/profile/back-button';
import { PersonalInfoTab } from '#/components/profile/personal-info-tab';
import { ProfileHeader } from '#/components/profile/profile-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#/components/ui/tabs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile Settings',
  description: 'Manage your profile information and account settings',
};

export default async function ProfilePage() {
  const user = await getUserForProtectedRoutes();

  const userData = {
    name: user.user_metadata?.full_name ?? 'Jemuel Repoylo',
    email: user.email as string,
    avatarUrl: user.user_metadata?.avatar_url as string,
    phone: user.phone as string,
    location: 'San Francisco, CA',
    website: 'https://example.com',
    bio: 'Next.js enjoyer, Supabase fanboy.',
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <BackButton />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your profile information and account preferences
          </p>
        </div>

        {/* Profile Header with Avatar */}
        <div className="mb-8">
          <ProfileHeader
            name={userData.name}
            email={userData.email}
            avatarUrl={userData.avatarUrl}
            bio={userData.bio}
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="account">Account Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="mt-2 space-y-6">
            <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
              <PersonalInfoTab
                initialData={{
                  name: userData.name,
                  email: userData.email,
                  phone: userData.phone,
                  location: userData.location,
                  website: userData.website,
                  bio: userData.bio,
                }}
              />
            </div>
          </TabsContent>

          <TabsContent value="account" className="mt-2 space-y-6">
            <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
              <AccountTab />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
