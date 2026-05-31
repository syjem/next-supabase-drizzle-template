import { getClaims } from '#/app/auth';
import { SignUpForm } from '#/components/sign-up-form';
import { redirect } from 'next/navigation';

export default async function Page() {
  const user = await getClaims();

  if (user) {
    redirect('/');
  }

  return <SignUpForm />;
}
