import { NextResponse } from "next/server";
import { mockLogs } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json(mockLogs);
}

export async function POST(request: Request) {
  const body = await request.json();

  // TODO: Validate and save to Supabase
  const newLog = {
    id: `log-${Date.now()}`,
    ...body,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    comment_count: 0,
  };

  return NextResponse.json(newLog, { status: 201 });
}
