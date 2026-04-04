'use client';

import { Employee } from '#/lib/drizzle/schema';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Pick<Employee, 'name' | 'employee_id'>>[] = [
  {
    accessorKey: 'employee_id',
    header: () => <span className="font-bold">ID</span>,
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground font-medium">
          {row.getValue('employee_id')}
        </div>
      );
    },
  },
  {
    accessorKey: 'name',
    header: () => <span className="font-bold">Name</span>,
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground font-medium">
          {row.getValue('name')}
        </div>
      );
    },
  },
];
