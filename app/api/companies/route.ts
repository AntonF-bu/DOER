import { NextResponse } from "next/server";
import { mockCompanies } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json(mockCompanies);
}

export async function POST(request: Request) {
  const body = await request.json();

  const newCompany = {
    id: `comp-${Date.now()}`,
    ...body,
    execution_score: 0,
    streak_days: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  return NextResponse.json(newCompany, { status: 201 });
}
