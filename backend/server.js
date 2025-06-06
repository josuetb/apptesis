const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./db');

const authRoutes = require('./controllers/authControllers');
const usuariosRoutes = require('./controllers/usuariosController');
const denunciasRoutes = require('./controllers/denunciasController');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', authRoutes);
app.use('/', usuariosRoutes);
app.use('/', denunciasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
