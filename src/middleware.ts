import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
  const token = cookies().get('token') ;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const secret = process.env.SECRET_KEY as string;
    const tokenValue = token.value;
    const { payload } = await jwtVerify(tokenValue, new TextEncoder().encode(secret));

    const userId = payload.userId as string;
    const role = payload.role as string;

    // Pass user information to the client by setting headers
    const response = NextResponse.next({
      headers: {
        'x-user-id': userId,
        'x-user-role': role,
      },
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Define which paths the middleware applies to
export const config = {
  matcher: ['/dashboard/:path*', '/profile', '/settings','/api/dashboard/:path*'],
};