import mongoose, { Schema } from "mongoose";
// Esquema de Usuario
const userSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true },
    ciudad: { type: String, required: true },
});
// Modelo de Usuario
export const UserModel = mongoose.model("users", userSchema);
//# sourceMappingURL=model.js.map