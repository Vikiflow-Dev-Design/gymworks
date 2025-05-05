import { getAllMemberships } from "@/app/actions/membership";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  
  const result = await getAllMemberships(page, limit);
  return NextResponse.json(result);
}
