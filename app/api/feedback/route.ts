import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  // TODO: Save feedback vote via Supabase
  return NextResponse.json({ success: true });
}
