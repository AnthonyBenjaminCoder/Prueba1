import mongoose, { Schema } from "mongoose";
// Esquema de Usuario
const userSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true },
    ciudad: { type: String, required: true },
});
const placeSchema = new Schema({
    nombre: { type: String, required: true },
    estado: { type: String, required: true },
    ciudad: { type: String, required: true },
    codigoPostal: { type: String, required: true },
});
// Modelo de Usuario
export const UserModel = mongoose.model("users", userSchema);
export const placeModel = mongoose.model("places", placeSchema);
//_v1 para asegurarse de que una operación de actualización no sobrescriba cambios recientes hechos por otra operación.
//# sourceMappingURL=model.js.map