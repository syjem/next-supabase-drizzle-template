import { getClaims } from '#/app/auth';
import { ForgotPasswordForm } from '#/components/forgot-password';
import { redirect } from 'next/navigation';

export default async function Page() {
  const user = await getClaims();

  if (user) {
    redirect('/');
  }

  return <ForgotPasswordForm />;
}
