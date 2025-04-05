import { getAllExpiredMemberships } from "@/app/actions/membership";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await getAllExpiredMemberships();
  return NextResponse.json(result);
}
