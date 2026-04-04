import { createClient } from '#/lib/supabase/server';

export async function getEmployee(id: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .eq('employee_id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
