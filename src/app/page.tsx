import { getEmployees } from '#/app/actions/get-employees';
import { columns } from '#/components/columns';
import { DataTable } from '#/components/data-table';

export default async function Home() {
  const employees = await getEmployees();

  return (
    <div className="w-full max-w-2xl mx-auto py-10">
      <DataTable columns={columns} data={employees} />
    </div>
  );
}
