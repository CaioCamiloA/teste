import { Schema, model } from "mongoose";

interface Ticket {
  passenger: JSON;
  destination: JSON;
  provider: JSON;
  dateBuy: Date;
  number: number;
}

const TicketSchema = new Schema<Ticket>({
  passenger: { type: JSON, required: true },
  destination: { type: JSON, required: true },
  provider: { type: JSON, required: true },
  dateBuy: { type: String, required: true },
  number: { type: Number, required: true, unique: true },
});

export default model<Ticket>("Ticket", TicketSchema);
