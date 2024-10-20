import { NextResponse } from 'next/server';
import { initialTasks } from '../../../utils/tasks';

export async function GET() {
  return NextResponse.json(initialTasks);
}
