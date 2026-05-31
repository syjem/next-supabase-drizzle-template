'use client';

import { Button } from '#/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      size="icon"
      variant="secondary"
      title="Go back"
      className="absolute top-4 left-4 lg:-left-6 rounded-full p-5 hover:ring hover:ring-primary/80 focus-visible:ring-secondary/40 focus-visible:ring-offset-secondary/20"
      onClick={() => router.back()}
    >
      <ArrowLeft />
    </Button>
  );
}
