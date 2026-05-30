import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/components/ui/card';
import { CircleCheckBig } from 'lucide-react';

export default function Page() {
  return (
    <div className="w-full max-w-md mx-auto py-20 px-4">
      <Card className="bg-green-50/10 border-2 border-green-500 px-8 py-10">
        <CardHeader className="items-center space-x-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center">
            <CircleCheckBig className="h-10 w-10 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Thank you for signing up!</CardTitle>
          <CardDescription>
            Check your email to confirm your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-center text-muted-foreground">
            Please check your email to confirm your account before signing in.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
