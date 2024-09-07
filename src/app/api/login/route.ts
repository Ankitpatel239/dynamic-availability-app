import { connectToDatabase } from "@/lib/db";
import User, { IUser } from "@/lib/model/users";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { email, password } = await req.json();

    const userData: IUser | null = await User.findOne({ email }).exec();
    if (!userData || userData.password !== password) {
      return new Response(JSON.stringify({ error: "Invalid Credentials" }), {
        status: 404,
      });
    }

    const token = sign({ 
      userId: userData._id, 
      role: userData.role 
    }, process.env.SECRET_KEY as string, { expiresIn: "1h" });

    const cookie = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600, 
      path: "/", 
    });

    const redirectUrl = userData.role === 'admin' 
      ? `/dashboard/adminDashboard?userId=${userData._id}` 
      : `/dashboard?userId=${userData._id}`;

    return new Response(JSON.stringify({ message: "Login Successful", redirectUrl }), {
      status: 200,
      headers: {
        "Set-Cookie": cookie,
        "Content-Type": "application/json", 
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
