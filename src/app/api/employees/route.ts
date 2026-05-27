import { employees } from '#/lib/data';
import { NextResponse } from 'next/server';

export async function GET() {
  const data = employees;
  return NextResponse.json(data);
}
