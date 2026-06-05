import { GET } from '#/app/api/employees/route';
import { columns } from '#/components/columns';
import { DataTable } from '#/components/data-table';
import { Header } from '#/components/header';
import { HeaderLoader } from '#/components/header-loader';

import React, { Suspense } from 'react';

export default async function Home() {
  const data = await GET().then((res) => res.json());

  return (
    <React.Fragment>
      <Suspense fallback={<HeaderLoader />}>
        <Header />
      </Suspense>
      <main className="w-full max-w-2xl mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </main>
    </React.Fragment>
  );
}
