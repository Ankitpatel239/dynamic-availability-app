// src/app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Extract token from cookies
    const token = req.cookies.get("token")?.value; // Adjust if necessary based on your setup

    // Return JSON response with token status
    return NextResponse.json({ token: token ? true : false });
  } catch (error) {
    // Handle the error here
    console.log((error as Error)?.message);
    return NextResponse.error();
  }
}
export async function POST(req: NextRequest) {
  try {
    const cookies = req.cookies;
    const token = cookies.get("token")?.value;

    if (token) {
      // Clear the cookie by setting its value to an empty string and maxAge to 0
      return NextResponse.json(
        { message: "Cookie cleared" },
        {
          headers: {
            "Set-Cookie": `token=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Strict`,
          },
        }
      );
    }

    return NextResponse.json({ message: "No token to clear" }, { status: 404 });
  } catch (error) {
    console.error((error as Error)?.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
