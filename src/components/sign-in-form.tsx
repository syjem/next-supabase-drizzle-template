'use client';

import { Button } from '#/components/ui/button';
import { Input } from '#/components/ui/input';
import { Label } from '#/components/ui/label';
import { createClient } from '#/lib/supabase/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState(false);

  const handleSocialLogin = async () => {
    const supabase = createClient();
    setIsSocialLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/oauth?next=/`,
        },
      });
      if (error) throw error;
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      setIsSocialLoading(false);
    }
  };

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push('/');

      // Render toast after a short delay to ensure the page has navigated
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success('Signed in successfully!');
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto py-20 px-4">
      <h1 className="text-2xl font-bold mb-6">Sign In</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="grid gap-2">
          <Label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            className="rounded-full p-4 md:p-5"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </Label>
            <Link
              href="/auth/forgot-password"
              className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <Input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            className="rounded-full p-4 md:p-5"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="space-y-2">
          <Button
            type="submit"
            className="w-full rounded-full p-5"
            disabled={isLoading || isSocialLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
          <Button
            onClick={handleSocialLogin}
            variant="outline"
            type="button"
            className="w-full rounded-full p-5"
            disabled={isSocialLoading || isLoading}
          >
            {isSocialLoading ? 'Signing in...' : 'Continue with Google'}
          </Button>
        </div>

        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/auth/sign-up" className="underline underline-offset-4">
            Sign up{' '}
          </Link>{' '}
        </div>
      </form>
    </div>
  );
}
