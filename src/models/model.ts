import mongoose, { Schema, Document } from "mongoose";

type cityType = 'Madrid'|"Barcelona"|"Bilbao"|"Málaga";

interface iuser extends Document {
  nombre: string;
  apellido: string;
  email: string;
  ciudad: cityType;
}

// Esquema de Usuario
const userSchema: Schema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true },
  ciudad: { type: String, required: true },
});

// Modelo de Usuario
  export const UserModel = mongoose.model<iuser>("users", userSchema);

//_v1 para asegurarse de que una operación de actualización no sobrescriba cambios recientes hechos por otra operación.