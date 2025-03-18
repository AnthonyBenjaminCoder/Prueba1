import { UserModel } from "../models/model.js";
export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
};
export const createUser = async (req, res) => {
    const { nombre, apellido, email, ciudad } = req.body;
    try {
        const newUser = new UserModel({ nombre, apellido, email, ciudad });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch (error) {
        res.status(400).json({ error: "Error al crear el usuario" });
    }
};
export const updateUserByEmail = async (req, res) => {
    const { email } = req.params;
    const { nombre, apellido, ciudad } = req.body;
    try {
        const updatedUser = await UserModel.findOneAndUpdate({ email }, { nombre, apellido, ciudad }, { new: true } //Devuelve el documento actualizado
        );
        if (!updatedUser) {
            res.status(404).json({ error: "Usuario no encontrado" });
            return;
        }
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ error: "Error al actualizar el usuario" });
    }
};
export const deleteUserByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const deletedUser = await UserModel.findOneAndDelete({ email });
        if (!deletedUser) {
            res.status(404).json({ error: "Usuario no encontrado" });
            return;
        }
        res.status(200).json({ mensaje: "Usuario eliminado exitosamente", usuario: deletedUser });
    }
    catch (error) {
        res.status(500).json({ error: "Error al eliminar el usuario" });
    }
};
export const createNewUser = async (req, res) => {
    const { nombre, apellido, email, ciudad } = req.body;
    try {
        const newUser = new UserModel({ nombre, apellido, email, ciudad });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch (error) {
        res.status(400).json({ error: "Error al crear el usuario" });
    }
};
//# sourceMappingURL=controller.js.map