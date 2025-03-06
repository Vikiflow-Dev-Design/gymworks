import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { classId, className, day, time, trainer } = await request.json();
    const supabase = createRouteHandlerClient({ cookies });
    
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in to book a class" },
        { status: 401 }
      );
    }
    
    // Insert the booking into the database
    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          user_id: user.id,
          class_id: classId,
          class_name: className,
          day,
          time,
          trainer,
          status: "confirmed",
          booked_at: new Date().toISOString(),
        },
      ])
      .select();
    
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: "Class booked successfully", booking: data[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in to view your bookings" },
        { status: 401 }
      );
    }
    
    // Get all bookings for the current user
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", user.id)
      .order("booked_at", { ascending: false });
    
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { bookings: data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get bookings error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get("id");
    
    if (!bookingId) {
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 }
      );
    }
    
    const supabase = createRouteHandlerClient({ cookies });
    
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in to cancel a booking" },
        { status: 401 }
      );
    }
    
    // First check if the booking belongs to the user
    const { data: bookingData } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", bookingId)
      .eq("user_id", user.id)
      .single();
    
    if (!bookingData) {
      return NextResponse.json(
        { error: "Booking not found or you don't have permission to cancel it" },
        { status: 404 }
      );
    }
    
    // Delete the booking
    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", bookingId)
      .eq("user_id", user.id);
    
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: "Booking cancelled successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Cancel booking error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
