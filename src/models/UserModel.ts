import { Schema, model } from "mongoose";

interface User {
  nome: string;
  email: string;
  idade: number;
  sexo: string;
  dataCadastro: Date;
}

const UserSchema = new Schema<User>({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  idade: { type: Number, required: true },
  sexo: { type: String, required: true },
  dataCadastro: { type: Date },
});

export default model<User>("User", UserSchema);
