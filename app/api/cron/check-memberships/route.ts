import { checkExpiredMemberships } from "@/app/actions/membership";

export async function GET() {
  try {
    const result = await checkExpiredMemberships();
    return Response.json(result);
  } catch (error) {
    console.error("Error in cron job:", error);
    return Response.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to check memberships",
      },
      { status: 500 }
    );
  }
}
