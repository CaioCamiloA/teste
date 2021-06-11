import { Schema, model } from "mongoose";

interface Destination {
  city: string;
  airportCode: string;
  state: string;
  country: string;
}

const DestinationSchema = new Schema<Destination>({
  city: { type: String, required: true },
  airportCode: { type: String, required: true, unique: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
});

export default model<Destination>("Destination", DestinationSchema);
