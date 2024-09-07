import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase(); 
  return NextResponse.json(true);

//     const data = {
//         "name": "Ankit Patel",
//         "address": "jabalpur",
//     };

//    const responce= await mongoose.connection.collection('test').insertOne(data)
//     return NextResponse.json(responce);

// const find= await mongoose.connection.collection('test').find({name:"Ankit Patel"}).toArray();
//     return NextResponse.json(find);

// const update = await mongoose.connection.collection('test').updateOne({name:"Ankit Patel"},{$set:{address:"Bhopal"}});
//     return NextResponse.json(update);


// const deleteData = await mongoose.connection.collection('test').deleteOne({name:"Ankit Patel"});
//     return NextResponse.json(deleteData);
}