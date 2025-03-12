import mongoose, { Schema, Document } from "mongoose";

type cityType = 'Madrid'|"Barcelona"|"Bilbao"|"Málaga";
type postalCode = '48012'|"9876"|"1234"|"22333";

interface iuser extends Document {
  nombre: string;
  apellido: string;
  email: string;
  ciudad: cityType;
}

interface place extends Document {
  nombre: string;
  estado: string;
  ciudad: string;
  codigoPostal: cityType;
}

// Esquema de Usuario
const userSchema: Schema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true },
  ciudad: { type: String, required: true },
});

const placeSchema: Schema = new Schema({
  nombre: { type: String, required: true },
  estado: { type: String, required: true },
  ciudad: { type: String, required: true },
  codigoPostal: { type: String, required: true },
});

// Modelo de Usuario
  export const UserModel = mongoose.model<iuser>("users", userSchema);
  export const placeModel = mongoose.model<place>("users", placeSchema);

//_v1 para asegurarse de que una operación de actualización no sobrescriba cambios recientes hechos por otra operación.