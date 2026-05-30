import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card';
import { TriangleAlertIcon } from 'lucide-react';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="w-full max-w-md mx-auto py-20 px-4">
      <Card className="bg-red-50/30 border-2 border-red-500 px-8 py-10">
        <CardHeader className="items-center space-x-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center">
            <TriangleAlertIcon className="h-10 w-10 text-red-500" />
          </div>
          <CardTitle className="text-2xl">
            Sorry, something went wrong.
          </CardTitle>
        </CardHeader>
        <CardContent>
          {params?.error ? (
            <p className="text-sm text-muted-foreground">
              <span className="underline font-semibold">Code error:</span>{' '}
              {params.error}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              An unspecified error occurred.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
