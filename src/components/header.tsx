import { getOptionalUser } from '#/app/auth';
import { Button } from '#/components/ui/button';
import { UserAvatar } from '#/components/user-avatar';
import Link from 'next/link';

export async function Header() {
  const user = await getOptionalUser();

  return (
    <nav className="w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between border-b">
      <span className="font-bold text-gray-900">
        <Link href="/">Supabase Auth</Link>
      </span>
      {user ? (
        <UserAvatar user={user} />
      ) : (
        <Button asChild className="rounded-sm px-4 py-3.5">
          <Link href="/auth/sign-in">Sign In</Link>
        </Button>
      )}
    </nav>
  );
}
