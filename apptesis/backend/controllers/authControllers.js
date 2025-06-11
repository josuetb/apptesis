const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { sendCodeToEmail, verifyUserCode } = require('../services/mailServices');
const pool = require('../db');
require('dotenv').config();

router.post('/send-code', async (req, res) => {
  const { email } = req.body;

  if (!email.endsWith('@puce.edu.ec')) {
    return res.status(400).json({ error: 'Correo inválido' });
  }

  try {
    await sendCodeToEmail(email);
    res.status(200).json({ message: 'Código enviado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudo enviar el código' });
  }
});


router.post('/verify-code', async (req, res) => {
  const { email, code } = req.body;

  const isValid = verifyUserCode(email, code);
  if (!isValid) return res.json({ valid: false });

  try {
    // Verificar si el usuario ya existe
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    let user;

    if (result.rows.length === 0) {
      const insert = await pool.query(
        'INSERT INTO usuarios (email, rol, nombres, apellidos, cedula, carrera, facultad) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
        [email, '', '', '', '', '', '']
      );
      user = insert.rows[0];
    } else {
      user = result.rows[0];
    }

    // Generar token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ valid: true, token, userId: user.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al verificar código' });
  }
});


module.exports = router;
