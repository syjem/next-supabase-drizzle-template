import { getEmployee } from '#/app/actions/get-employee';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const employeeData = await getEmployee(Number(id));

  return NextResponse.json(employeeData);
}
