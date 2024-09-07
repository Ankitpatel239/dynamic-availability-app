import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/lib/model/users";
import { verify } from "jsonwebtoken";

export async function DELETE(req: NextRequest) {
  try {
    await connectToDatabase();

    const token = req.cookies.get('token')?.value;
console.log(token)
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const secret = process.env.SECRET_KEY as string;
    let decoded: any;

    try {
      decoded = verify(token, secret);
    } catch (error) {
      console.error('Token verification error:', error);
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    const user = await User.findByIdAndDelete(decoded.userId).exec();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Account deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error deleting account:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
