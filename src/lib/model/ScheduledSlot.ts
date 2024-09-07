import mongoose, { Schema, Document, Model } from "mongoose";

// Define an interface for Attendees
export interface IAttendee {
  name: string;
  email: string;
}

// Define an interface for the Scheduled Slot document
export interface IScheduledSlot extends Document {
  session: mongoose.Types.ObjectId; // Reference to Session
  start: Date;
  end: Date;
  attendees: IAttendee[];
}

// Define the schema for Attendees
const attendeeSchema: Schema<IAttendee> = new Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    lowercase: true, 
    trim: true 
  },
});

// Define the schema for the Scheduled Slot model
const scheduledSlotSchema: Schema<IScheduledSlot> = new Schema({
  session: { type: mongoose.Schema.Types.ObjectId, ref: "Session", required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  attendees: { type: [attendeeSchema], default: [] },
}, {
  timestamps: true,
});

// Prevent model recompilation in development
const ScheduledSlot: Model<IScheduledSlot> = mongoose.models.ScheduledSlot || mongoose.model<IScheduledSlot>("ScheduledSlot", scheduledSlotSchema);

export default ScheduledSlot;
