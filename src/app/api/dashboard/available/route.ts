import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Availability, { IAvailabilityDocument } from "@/lib/model/Availability";
import users from "@/lib/model/users";

// POST: Add new slot
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const userId = req.headers.get("x-user-id");
   
     if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userData = await users.findOne({_id:userId}) as IAvailabilityDocument;

    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const {  day, timeSlots } = await req.json();

    const newSlot = new Availability({
      user: userData.email,
      day,
      timeSlots, 
    });

    await newSlot.save();
    return NextResponse.json(newSlot, { status: 201 });
  } catch (e: any) {
    console.log(e.message);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// GET: Fetch all slots
export async function GET() {
  try {
    await connectToDatabase();
    const slots = await Availability.find();

    return NextResponse.json(slots, { status: 200 });
  } catch (error) {
   
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a specific slot
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "Missing ID parameter" }, { status: 400 });
    }

    await connectToDatabase();
    const res = await Availability.findByIdAndDelete(id);

    if (!res) {
      return NextResponse.json({ error: "Slot not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Slot deleted" }, { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PUT: Update an existing slot
export async function PUT(req: NextRequest) {
  try {
    await connectToDatabase();
    const { id, day, timeSlots } = await req.json();
    console.log('id', id);

    if (!id || !day || !timeSlots) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updatedSlot = await Availability.findByIdAndUpdate(
      id,
      { day, timeSlots },
      { new: true } // Return the updated document
    );

    if (!updatedSlot) {
      return NextResponse.json({ error: "Slot not found" }, { status: 404 });
    }

    return NextResponse.json(updatedSlot, { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

