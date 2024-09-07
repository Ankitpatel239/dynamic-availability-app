// src/app/api/change-password/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/lib/model/users";
import { JwtPayload, verify } from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const { currentPassword, newPassword } = await req.json();
    const token = req.cookies.get("token");
const userId = token ? (verify(token.value, process.env.SECRET_KEY as string) as JwtPayload).userId as string : '';
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const secret = process.env.SECRET_KEY as string;
    
    const user = await User.findById(userId).exec();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Directly compare passwords (not secure in production, consider using hashing)
    if (user.password !== currentPassword) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
    }

    user.password = newPassword; // Ensure you implement proper hashing in production
    await user.save();

    return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error:", error); // Debugging any errors
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
