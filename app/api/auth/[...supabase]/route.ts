import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // TODO: Handle Supabase auth callback
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    // Exchange code for session via Supabase
  }

  return NextResponse.redirect(new URL("/dashboard", request.url));
}
