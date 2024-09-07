import mongoose, { Schema, Document, Model } from "mongoose";

// Define the interface for the document
export interface IAvailabilityDocument extends Document {
  email: any;
  user: string;
  day: string;
  timeSlots: ITimeSlot[];
}

export interface ITimeSlot {
  start: String;
  end: String;
}

// Define the time slot schema
const timeSlotSchema: Schema<ITimeSlot> = new Schema({
  start: { type: String, required: true },
  end: { type: String, required: true },
});

// Define the availability schema
const availabilitySchema: Schema<IAvailabilityDocument> = new Schema(
  {
    user: { type: String, required: true },
    day: { type: String, required: true },
    timeSlots: { type: [timeSlotSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

// Prevent model recompilation in development
const Availability: Model<IAvailabilityDocument> =
  mongoose.models.Availability ||
  mongoose.model<IAvailabilityDocument>("Availability", availabilitySchema);

export default Availability;
