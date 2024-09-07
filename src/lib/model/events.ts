import mongoose, { Schema, Document, Model } from "mongoose";

interface IEventDetail {
  eventName: string;
  description: string;
  eventDate: Date;
  eventTime: string;
  eventType: string;
  duration: string;
  timeStamp: Date;
}

interface IEvent extends Document {
  userId: mongoose.Types.ObjectId;
  email: string;
  eventsDetails: IEventDetail[];
}

const eventDetailSchema: Schema<IEventDetail> = new Schema({
  eventName: { type: String, required: true },
  description: { type: String },
  eventDate: { type: Date, required: true },
  eventTime: { type: String, required: true },
  eventType: { type: String },
  duration: { type: String },
  timeStamp: { type: Date, default: Date.now },
});

const eventSchema: Schema<IEvent> = new Schema({
  userId: { type: Schema.Types.ObjectId as typeof Schema.Types.ObjectId, ref: "users", required: true },
  email: { type: String, required: true },
  eventsDetails: [eventDetailSchema],
});

let Event: Model<IEvent>;
try {
  Event = mongoose.model<IEvent>("Event");
} catch (error) {
  Event = mongoose.model<IEvent>("Event", eventSchema);
}

export type { IEvent };
export default Event;
