import express, { request, Request, Response } from 'express';
import mongoose, { Schema, Document } from "mongoose";
import usersRoutes from './routes/route.js';
import placeRoutes from './routes/placeRoutes.js';

const app = express();
const port = 3000;

app.get('/id',(req:Request, res:Response)=>{
  const {id} = req.query;
  const hola2 = s.find(u=>u.id==Number(id));
  res.send(hola2);
});

mongoose.connect('mongodb://admin:3Lc9wDlaBdYJtcdZQ8WPpBpWs@yellowdino.mooo.com:27017/')
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch((error) => console.error('Error al conectar con MongoDB:', error));

app.use(express.json());
app.use('/users', usersRoutes); // Usa el router
app.use('/places', placeRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

type a = 'asdad' | 'asdasddas' | 'asdsadad'

interface mundo{
  user1:String
  random:String
  id:Number 
}

const s=[
{
  user1:'asdasdasd',
  random:'saddsa',
  id:448,
},
{
  user1:'asdasdasd',
  random:'saddsa',
  id:48,
},{
  user1:'asdasdasd',
  random:'saddsa',
  id:44,
}
];
