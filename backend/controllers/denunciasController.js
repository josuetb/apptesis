const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/denuncias', async (req, res) => {
  const {
    usuario_id,
    titulo,
    descripcion,
    fecha_incidente,
    ubicacion_tipo,
    ubicacion_especifica,
    tipo_violencia,
    agresor_miembro_puce,
    nombre_agresor,
    correo_agresor,
    descripcion_agresor
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO denuncias (
        usuario_id, titulo, descripcion, fecha_incidente, 
        ubicacion_tipo, ubicacion_especifica, tipo_violencia, 
        agresor_miembro_puce, nombre_agresor, correo_agresor, descripcion_agresor
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
      [
        usuario_id, titulo, descripcion, fecha_incidente,
        ubicacion_tipo, ubicacion_especifica, tipo_violencia,
        agresor_miembro_puce, nombre_agresor, correo_agresor, descripcion_agresor
      ]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error al registrar denuncia');
  }
});

module.exports = router;
