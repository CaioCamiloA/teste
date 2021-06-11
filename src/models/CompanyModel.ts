import { Schema, model } from "mongoose";
import mongoose from "mongoose";

interface Company {
  company: string;
  cnpj: number;
  planes: [];
}

const CompanySchema = new Schema<Company>({
  company: { type: String, required: true },
  cnpj: { type: Number, required: true, unique: true },
  planes: [{ type: mongoose.Types.ObjectId, ref: "plane" }],
});

export default model<Company>("Company", CompanySchema);
