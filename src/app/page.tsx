import { GET } from '#/app/api/employees/route';
import { columns } from '#/components/columns';
import { DataTable } from '#/components/data-table';
import { Header } from '#/components/header';
import React from 'react';

export default async function Home() {
  const response = await GET();
  const data = await response.json();

  return (
    <React.Fragment>
      <Header />
      <main>
        <div className="w-full max-w-2xl mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>
      </main>
    </React.Fragment>
  );
}
