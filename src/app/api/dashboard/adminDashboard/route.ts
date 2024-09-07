// pages/api/getUserInfo.ts or another API route
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.headers.get("x-user-id");
  const userRole = req.headers.get("x-user-role");
  
    if (!userId || !userRole) {
        return NextResponse.redirect("/login");
    }

  return NextResponse.json({
    message: "Data fetched successfully",
    userId,
    userRole,
  });
}
