import express, { request, Request, Response } from 'express';
import mongoose, { Schema, Document } from "mongoose";
import usersRoutes from './routes/route.js';
import placeRoutes from './routes/placeRoutes.js';
import fs from "fs";

const app = express();
const port = 3000;

mongoose.connect('mongodb://admin:3Lc9wDlaBdYJtcdZQ8WPpBpWs@yellowdino.mooo.com:27017/')
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch((error) => console.error('Error al conectar con MongoDB:', error));

app.use(express.json());
app.use('/users', usersRoutes); // Usa el router
app.use('/places', placeRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
