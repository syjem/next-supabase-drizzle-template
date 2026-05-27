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
import { JwtPayload } from '@supabase/supabase-js';
import { LogOut } from 'lucide-react';
import { useRef } from 'react';

export function UserAvatar({ user }: { user: JwtPayload | null }) {
  const formRef = useRef<HTMLFormElement>(null);

  const userName = user?.user_metadata?.full_name as string;
  const email = user?.email;
  const avatarUrl = user?.user_metadata?.avatar_url;

  const initials = userName
    ?.split(' ')
    ?.map((word) => word[0])
    ?.join('')
    ?.toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer">
        <Avatar>
          <AvatarImage src={avatarUrl} alt={initials} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="center">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <span className="doc-subtitle text-sm">{userName}</span>
            <address className="doc-caption truncate italic">{email}</address>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <form action={signOut} ref={formRef}>
          <DropdownMenuItem
            onSelect={() => formRef.current?.requestSubmit()}
            className="font-medium"
          >
            <LogOut />
            Sign out
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
