import { getClaims } from '#/app/auth';
import { Button } from '#/components/ui/button';
import { UserAvatar } from '#/components/user-avatar';
import Link from 'next/link';

export async function Header() {
  const user = await getClaims();

  return (
    <header className="w-full">
      <nav className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
        <span className="font-bold text-gray-900">
          <Link href="/">Supabase + Next.js</Link>
        </span>
        <div className="flex h-10 min-w-28 items-center justify-end sm:min-w-32">
          {user ? (
            <UserAvatar user={user} />
          ) : (
            <Button asChild className="h-10 rounded-full px-5">
              <Link href="/auth/sign-in">Sign In</Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
