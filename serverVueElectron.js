require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

const app = express();
app.use(cors());
app.use(express.json());
//npm install mongodb@4.1
//mongodb+srv://alvarod_db_user:ChangeMe@clustervending.o3ch2ve.mongodb.net/?appName=ClusterVending
//alvarod_db_user ChangeMe

//CREAR SERVIDOR
const server = http.createServer(app);

/*
//WEBSOCKET PARA ADMINSITRACIÓN
const WebSocket = require('ws');
const wss = new WebSocket.Server({
  server: server,
});

//ALMACENAR CONEXIONES
const wsConnections = {
  android: new Map(),
  admin: new Set()
};*/
//CONEXION MONGO
//CREAR .env PARA PROTEGER LOS CREDENCIALES DE MONGODB========================================
mongoose
  .connect(
    "mongodb+srv://alvarod_db_user:ChangeMe@clustervending.o3ch2ve.mongodb.net/?appName=ClusterVending",
  )
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch((err) => console.error("Error de conexión:", err));

const userSchema = new mongoose.Schema({
  nombreCorreo: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});
const User = mongoose.model("User", userSchema);
//ACTIVIDADES
const actividadSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: String,
  duracion: { type: Number, required: true },
  plazasMaximas: { type: Number, required: true },

  usuarios: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Actividad = mongoose.model("Actividad", actividadSchema);
//Crear actividad
app.post("/actividades", async (req, res) => {
  try {
    if (duracion <= 0 || plazasMaximas <= 0) {
      return res.status(400).json({ 
        error: "Error! Duracion negativa" 
      });
    }

    const actividad = new Actividad(req.body);
    await actividad.save();
    res.status(201).json(actividad);
  } catch (err) {
    res.status(500).json({ error: "Error creando actividad" });
//Test comprobacion de duplicados, 11000 es el codigo de duplicado
if (err.code === 11000) {
      return res.status(400).json({ error: "Ya existe una actividad con ese nombre" });
    }
  }
});
//Obtener actividades
app.get("/actividades", async (req, res) => {
  try {
    const actividades = await Actividad.find().populate(
      "usuarios",
      "nombreCorreo",
    );

    res.json(actividades);
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo actividades" });
  }
});
//Obtener actividad
app.get("/actividades/:id", async (req, res) => {
  try {
    const actividad = await Actividad.findById(req.params.id).populate(
      "usuarios",
    );

    if (!actividad) return res.status(404).json({ error: "No encontrada" });

    res.json(actividad);
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo actividad" });
  }
});
//Editar actividad
app.put("/actividades/:id", async (req, res) => {
  try {
    const actividad = await Actividad.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    res.json(actividad);
  } catch (err) {
    res.status(500).json({ error: "Error actualizando actividad" });
  }
});
//Eliminar
app.delete("/actividades/:id", async (req, res) => {
  try {
    await Actividad.findByIdAndDelete(req.params.id);

    res.json({ mensaje: "Actividad eliminada" });
  } catch (err) {
    res.status(500).json({ error: "Error eliminando actividad" });
  }
});
//Añadir usuario
app.post("/actividades/:id/inscribir", async (req, res) => {
  try {
    const { userId } = req.body;

    const actividad = await Actividad.findById(req.params.id);

    if (!actividad)
      return res.status(404).json({ error: "Actividad no encontrada" });

    if (actividad.usuarios.length >= actividad.plazasMaximas)
      return res.status(400).json({ error: "Actividad llena" });

    actividad.usuarios.push(userId);
    await actividad.save();

    res.json(actividad);
  } catch (err) {
    res.status(500).json({ error: "Error añadiendo usuario" });
  }
});
//Eliminar usuario
app.post("/actividades/:id/desinscribir", async (req, res) => {
  try {
    const { userId } = req.body;

    const actividad = await Actividad.findById(req.params.id);

    actividad.usuarios = actividad.usuarios.filter(
      (u) => u.toString() !== userId,
    );

    await actividad.save();

    res.json(actividad);
  } catch (err) {
    res.status(500).json({ error: "Error eliminando usuario" });
  }
});
//crear usuario
app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: "Error creando usuario" });
  }
});
//TEST LOGIN
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ nombreCorreo: username });

  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Credenciales incorrectas" });
  }
  res.json({
    id: user._id,
    nombreCorreo: user.nombreCorreo,
    admin: user.admin,
  });
});

/*
wss.clients.forEach(client => {
  client.send(JSON.stringify({
    tipo: 'ACTIVIDAD_CREADA',
    data: actividad
  }));
});
 */

//INICAR SERVIDOR ==================== IP ADECUADA??
const PORT = 5000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
  console.log(`Servidor WebSocket corriendo en ws://localhost:${PORT}`);
});

//ERROES
process.on("unhandledRejection", (err) => {
  console.error("Error no manejado:", err);
});

process.on("uncaughtException", (err) => {
  console.error("Excepción no capturada:", err);
});
