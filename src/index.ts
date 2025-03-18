import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import route from './routes/route.js'
const app = express();
const port = 3000;

// Middleware para procesar JSON
app.use(express.json());

app.use('/',route);

// **Conexión a MongoDB**
mongoose.connect('mongodb://admin:3Lc9wDlaBdYJtcdZQ8WPpBpWs@yellowdino.mooo.com:27017/')
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch((error) => console.error('Error al conectar con MongoDB:', error));

// **Inicia el servidor**
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
