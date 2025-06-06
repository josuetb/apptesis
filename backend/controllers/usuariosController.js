const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/usuarios', async (req, res) => {
  const { correo, rol, otro_rol } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO usuarios (correo, rol, otro_rol)
       VALUES ($1, $2, $3)
       ON CONFLICT (correo) DO NOTHING
       RETURNING *`,
      [correo, rol, otro_rol]
    );

    if (result.rows.length > 0) {
      res.status(201).json(result.rows[0]);
    } else {
      const existing = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
      res.status(200).json(existing.rows[0]);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error al registrar usuario');
  }
});

module.exports = router;
