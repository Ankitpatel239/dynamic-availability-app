import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/lib/model/events";

interface CustomNextRequest extends NextRequest {
  context?: {
    preview: boolean;
  };
}

export async function GET(req: CustomNextRequest) {
  // Check if the request is being made during static rendering
  if (req.context?.preview) {
    // Handle the request during static rendering
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const userId = req.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find events for the specific userId
    const events = await Event.find({ userId }).sort({ eventDate: 1 });

    // If no events are found for the userId
    if (!events || events.length === 0) {
      return NextResponse.json({ message: "No events found" }, { status: 404 });
    }

    // Send back the filtered events
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("Error fetching events: ", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
