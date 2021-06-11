import { Schema, model } from "mongoose";
import mongoose from "mongoose";

interface plane {
  weight: number;
  prefix: string;
  manufacturer: string;
  dateFabrication: Date;
  passengerNumber: number;
  companyId: string;
}

const planeSchema = new Schema<plane>({
  weight: { type: Number, required: true },
  manufacturer: { type: String, required: true },
  prefix: { type: String, required: true, unique: true },
  passengerNumber: { type: Number, required: true },
  dateFabrication: { type: Date, required: true },
  companyId: { type: mongoose.Types.ObjectId, ref: "company" },
});

export default model<plane>("plane", planeSchema);
