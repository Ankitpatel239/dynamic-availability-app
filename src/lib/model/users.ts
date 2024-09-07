import mongoose, { Schema, Document, Model } from "mongoose";

// Define an interface for the User document
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  availability: IAvailability[];
}

// Define an interface for Availability
export interface IAvailability {
  day: string; // e.g., 'Monday'
  timeSlots: ITimeSlot[];
}

// Define an interface for Time Slots
export interface ITimeSlot {
  start: Date;
  end: Date;
}

// Define the schema for Time Slots
const timeSlotSchema: Schema<ITimeSlot> = new Schema({
  start: { type: Date, required: true },
  end: { type: Date, required: true },
});

// Define the schema for Availability
const availabilitySchema: Schema<IAvailability> = new Schema({
  day: { type: String, required: true },
  timeSlots: { type: [timeSlotSchema], default: [] },
});

// Define the schema for the User model
const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    unique: true, 
    required: true, 
    lowercase: true, 
    trim: true 
  },
  password: { type: String, required: true }, // Consider hashing passwords
  role: { type: String, enum: ["user", "admin"], default: "user" },
  availability: { type: [availabilitySchema], default: [] },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Prevent model recompilation in development
const User: Model<IUser> = mongoose.models.users || mongoose.model<IUser>("users", userSchema);

export default User; 
