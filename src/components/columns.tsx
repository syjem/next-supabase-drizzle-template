'use client';

import { Employee } from '#/lib/data';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'id',
    header: () => <span className="font-bold">ID</span>,
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground font-medium">
          {row.getValue('id')}
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
