import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Event from "@/lib/model/events";
import User from "@/lib/model/users";

export async function POST(req: NextRequest) {
  try {
    
    await connectToDatabase();
    const userId = req.headers.get("x-user-id")?.toString();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findById(userId);
  
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { events } = await req.json(); // Expecting an array of events

    if (!events || events.length === 0) {
      return NextResponse.json({ error: "No events provided" }, { status: 400 });
    }

    const formattedEvents = events.map((event :any) => ({
      ...event,
      eventTime: event.eventTime?.value, // Extract the value from the eventTime object
      eventType: event.eventType?.value, // Extract the value from the eventType object
    }));

    const newEvent = new Event({
      userId,
      email: user.email,
      eventsDetails: formattedEvents, // Save the formatted event details
    });

    const savedEvent = await newEvent.save();

    return NextResponse.json(savedEvent, { status: 201 });
  } catch (e:any) {
   
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
