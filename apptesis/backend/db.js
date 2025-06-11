const { Pool } = require('pg');
require('dotenv').config();

// Verificar que las variables de entorno estén definidas
if (!process.env.DB_USER || !process.env.DB_PASS || !process.env.DB_HOST || !process.env.DB_NAME) {
  console.error('Error: Faltan variables de entorno de la base de datos');
  process.exit(1);
}

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT || 5432,
});

// Probar la conexión
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
  release();
});

module.exports = pool;
