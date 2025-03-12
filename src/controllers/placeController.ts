import { Request, Response } from "express";
import { placeModel } from "../models/model.js";

export const getPLaces = async (req: Request, res: Response) => {
  try {
    const users = await placeModel.find();
    res.status(200).json(users);         
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};


export const createPlace = async (req: Request, res: Response) => {
  const { nombre, apellido, email, ciudad } = req.body;

  try {
    const newUser = new placeModel({ nombre, apellido, email, ciudad }); 
    const savedUser = await newUser.save(); 
    res.status(201).json(savedUser);       
  } catch (error) {
    res.status(400).json({ error: "Error al crear el usuario" });
  }
};


export const updatePlaceName = async (req: Request, res: Response,): Promise<void> => {
  const { name } = req.params;
  const { nombre, apellido, ciudad } = req.body;

  try {
    const updatedPlace = await placeModel.findOneAndUpdate(
      { name },
      { nombre, apellido, ciudad },
      { new: true }//Devuelve el documento actualizado
    );

    if (!updatedPlace) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return
    }
    res.status(200).json(updatedPlace);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};


export const deletePlaceName = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.params;

  try {
    const deletedPlace = await placeModel.findOneAndDelete({ name });
    if (!deletedPlace) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return
    }
    res.status(200).json({ mensaje: "Usuario eliminado exitosamente", usuario: deletedPlace });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};
