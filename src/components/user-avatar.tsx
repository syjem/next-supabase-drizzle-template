'use client';

import { signOut } from '#/actions/sign-out';
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu';
import { cn } from '#/lib/utils';
import { JwtPayload } from '@supabase/supabase-js';
import { LogOut, User, UserCog } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

export function UserAvatar({ user }: { user: JwtPayload | null }) {
  const formRef = useRef<HTMLFormElement>(null);

  const userName = user?.user_metadata?.full_name as string;
  const email = user?.email;
  const avatarUrl = user?.user_metadata?.avatar_url;

  const initials = userName
    ?.split(' ')
    ?.map((part) => part[0])
    ?.join('')
    ?.toUpperCase()
    .slice(0, 2);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer',
          !avatarUrl && 'bg-muted p-1 border border-muted-foreground',
        )}
      >
        {avatarUrl ? (
          <Avatar>
            <AvatarImage src={avatarUrl} alt={initials} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        ) : (
          <User className="p-1" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="center">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <span className="doc-subtitle text-sm">{userName}</span>
            <address className="doc-caption truncate italic" title={email}>
              {email}
            </address>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <UserCog />
            Profile
          </Link>
        </DropdownMenuItem>
        <form action={signOut} ref={formRef}>
          <DropdownMenuItem onSelect={() => formRef.current?.requestSubmit()}>
            <LogOut />
            Sign out
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
