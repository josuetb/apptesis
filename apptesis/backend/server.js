const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./db');
const fs = require('fs');
const path = require('path');

const authRoutes = require('./controllers/authControllers');
const usuariosRoutes = require('./controllers/usuariosController');
const denunciasRoutes = require('./controllers/denunciasController');

dotenv.config();

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(express.json());

app.use('/', authRoutes);
app.use('/', usuariosRoutes);
app.use('/', denunciasRoutes);
app.use(express.json({ limit: '50mb' })); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});