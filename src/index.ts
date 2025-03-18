import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";

const app = express();
const port = 3000;

// Middleware para procesar JSON
app.use(express.json());

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDg9fBlUvYykvwHA53kWIu4gl-eNjPxR0o",
  authDomain: "pokedex-f0a35.firebaseapp.com",
  projectId: "pokedex-f0a35",
  storageBucket: "pokedex-f0a35.firebasestorage.app",
  messagingSenderId: "195401364032",
  appId: "1:195401364032:web:97f631d3f35e3a9e4c65a5"
};

// Inicializa Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

// Configuración de Nodemailer para enviar correos
const transporter = nodemailer.createTransport({
  service: 'gmail', // Cambia esto según tu proveedor de correo
  auth: {
    user: 'usertechfriendly1@gmail.com', // Reemplaza con tu correo
    pass: 'lvbv djsq znix tvau' // Reemplaza con tu contraseña o token de aplicación
  },
});

// **1. Registro de Usuario**
app.post('/register', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Crear usuario en Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    res.status(201).json({ message: "Usuario registrado correctamente", userId: user.uid });
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      res.status(400).json({ error: "El correo ya está registrado." });
    } else if (error.code === "auth/invalid-email") {
      res.status(400).json({ error: "El correo no es válido." });
    } else if (error.code === "auth/weak-password") {
      res.status(400).json({ error: "La contraseña es demasiado débil." });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// **2. Generar y Enviar OTP para Iniciar Sesión**
app.post('/login', async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    // Genera un código OTP único
    const otp = Math.floor(100000 + Math.random() * 900000); // Código de 6 dígitos

    // Guarda el OTP en Firestore con un timestamp
    await setDoc(doc(db, "otps", email), {
      otp: otp,
      createdAt: new Date()
    });

    // Envía el OTP al correo del usuario
    await transporter.sendMail({
      from: 'usertechfriendly1@gmail.com',
      to: email,
      subject: "Tu código OTP",
      text: `Tu código OTP es: ${otp}. Este código es válido por 5 minutos.`,
    });

    res.status(200).json({ message: "OTP enviado al correo." });
  } catch (error) {
    res.status(500).json({ error: "Error al enviar el OTP." });
  }
});

// **3. Validar el OTP**
app.post('/validate-otp', async (req: Request, res: Response):Promise<void> => {
  const { email, otp } = req.body;

  try {
    // Obtén el OTP almacenado en Firestore
    const otpDoc = await getDoc(doc(db, "otps", email));

    if (!otpDoc.exists()) {
      res.status(404).json({ error: "OTP no encontrado." });
      return
    }

    const { otp: storedOtp, createdAt } = otpDoc.data()!;
    const now = new Date();
    const expirationTime = new Date(createdAt.seconds * 1000 + 5 * 60 * 1000); // Expira en 5 minutos

    if (storedOtp === parseInt(otp) && now <= expirationTime) {
      // Elimina el OTP después de usarlo
      await deleteDoc(doc(db, "otps", email));
      res.status(200).json({ message: "OTP validado correctamente. Acceso concedido." });
    } else {
      res.status(400).json({ error: "OTP inválido o expirado." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al validar el OTP." });
  }
});

// **Conexión a MongoDB**
mongoose.connect('mongodb://admin:3Lc9wDlaBdYJtcdZQ8WPpBpWs@yellowdino.mooo.com:27017/')
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch((error) => console.error('Error al conectar con MongoDB:', error));

// **Inicia el servidor**
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
