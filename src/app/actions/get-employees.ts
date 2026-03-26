"use server";

import { Employee } from "#/lib/drizzle/schema/employees";
import { createClient } from "#/lib/supabase/server";

export async function getEmployees(): Promise<Employee[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("employees").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
