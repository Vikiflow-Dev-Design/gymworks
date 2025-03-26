import { Webhook, WebhookRequiredHeaders } from "svix";
import { headers } from "next/headers";
import {
  createOrUpdateUser,
  deleteUser,
} from "@/lib/mongodb/controllers/userController";
import { NextResponse } from "next/server";

interface WebhookEvent {
  data: {
    id: string;
    first_name?: string;
    last_name?: string;
    image_url?: string;
    email_addresses?: Array<{ email: string }>;
    username?: string;
  };
  type: string;
}

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new NextResponse("Error occurred", {
      status: 400,
    });
  }

  const { id } = evt?.data;
  const eventType = evt?.type;

  console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", body);

  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, first_name, last_name, image_url, email_addresses, username } =
      evt?.data;

    console.log("User data:", {
      id,
      first_name,
      last_name,
      image_url,
      email_addresses,
      username,
    });
    try {
      await createOrUpdateUser(
        id,
        first_name || "",
        last_name || "",
        image_url || "",
        email_addresses || [],
        username || ""
      );
      return new NextResponse("User is created or updated", {
        status: 200,
      });
    } catch (error) {
      console.log("Error creating or updating user:", error);
      return new NextResponse("Error occurred", {
        status: 400,
      });
    }
  }

  if (eventType === "user.deleted") {
    try {
      await deleteUser(id);
      return new NextResponse("User is deleted", {
        status: 200,
      });
    } catch (error) {
      console.log("Error deleting user:", error);
      return new NextResponse("Error occurred", {
        status: 400,
      });
    }
  }

  return new NextResponse("", { status: 200 });
}
