'use server';

import { db } from '#/lib/drizzle';
import { employees } from '#/lib/drizzle/schema/employees';

export async function getEmployees() {
  const data = await db
    .select({
      id: employees.employee_id,
      name: employees.name,
    })
    .from(employees);

  return data;
}
