import { getMembershipById } from "@/app/actions/membership";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  
  if (!id) {
    return NextResponse.json(
      { success: false, error: "Membership ID is required" },
      { status: 400 }
    );
  }
  
  const result = await getMembershipById(id);
  return NextResponse.json(result);
}
