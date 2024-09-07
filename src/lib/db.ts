import mongoose, { Mongoose } from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();



const mongodbUri = process.env.MONGODB_URI ||'';

if (!mongodbUri) {
  console.error('MongoDB URI is not set.');
  throw new Error('MongoDB URI is not set.');
}


declare global {
  namespace NodeJS {
    interface Global {
      mongoose: {
        conn: Mongoose | null;
        promise: Promise<Mongoose> | null;
      };
    }
  }

  var mongoose: {
    Types: any;
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

global.mongoose = global.mongoose || { conn: null, promise: null };

export async function connectToDatabase(): Promise<Mongoose> {
  if (global.mongoose.conn) {
    return global.mongoose.conn;
  }

  if (!global.mongoose.promise) {
    global.mongoose.promise = mongoose.connect(mongodbUri).then((mongooseInstance) => mongooseInstance as Mongoose);
  }

  global.mongoose.conn = await global.mongoose.promise;
  return global.mongoose.conn;
}
