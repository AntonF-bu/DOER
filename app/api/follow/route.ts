import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  // TODO: Toggle follow via Supabase
  return NextResponse.json({ success: true, following: true });
}
