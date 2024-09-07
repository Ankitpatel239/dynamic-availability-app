import { connectToDatabase } from "@/lib/db";
import User from "@/lib/model/users";

export async function POST(req: Request) {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Parse the request body
    const { name, email, password } = await req.json();

    // Insert user into the database
    const newUser = new User({ name, email, password });
    await newUser.save();

    // Return success response
    return new Response(
      JSON.stringify({ message: "User registered successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
