import { getEmployees } from '#/app/actions/get-employees';
import { NextResponse } from 'next/server';

export async function GET() {
  const employees = await getEmployees();
  return NextResponse.json(employees);
}
