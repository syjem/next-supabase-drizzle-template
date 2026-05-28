import { getUser } from '#/app/auth';
import SignInForm from '#/components/sign-in-form';
import { redirect } from 'next/navigation';

export default async function Page() {
  const user = await getUser();

  if (user) {
    redirect('/');
  }

  return <SignInForm />;
}
