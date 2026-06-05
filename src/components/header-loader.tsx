import { Skeleton } from '#/components/ui/skeleton';

export function HeaderLoader() {
  return (
    <header className="w-full">
      <nav className="max-w-7xl mx-auto flex items-center justify-between border-b py-4 px-4 sm:px-6 lg:px-8">
        <span className="font-bold text-gray-900">Supabase + Next.js</span>
        <div className="flex h-10 min-w-28 items-center justify-end sm:min-w-32">
          <Skeleton className="h-10 w-24 rounded-full" />
        </div>
      </nav>
    </header>
  );
}
