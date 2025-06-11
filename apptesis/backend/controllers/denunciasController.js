const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const pool = require('../db');
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');

router.post('/denuncias', async (req, res) => {
  try {
    const {
      usuario_id,
      titulo,
      descripcion,
      fecha,
      ubicacion,
      ubicacionExacta,
      tipoViolencia,
      tipoViolenciaOtro,
      agresorPuce,
      nombreAgresor,
      correoAgresor,
      descripcionFisica,
      periodoAcademico,
      evidencias, // [{ name, base64, mime }]
    } = req.body;

    // 1. Insertar denuncia
    const result = await pool.query(`
      INSERT INTO denuncias (
        usuario_id, titulo, descripcion, fecha_incidente,
        ubicacion, ubicacion_exacta, tipo_violencia, tipo_violencia_otro,
        agresor_miembro_puce, nombre_agresor, correo_agresor,
        descripcion_fisica, periodo_academico
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
      RETURNING id
    `, [
      usuario_id, titulo, descripcion, fecha,
      ubicacion, ubicacionExacta, tipoViolencia, tipoViolenciaOtro,
      agresorPuce === 'si', nombreAgresor, correoAgresor,
      descripcionFisica, periodoAcademico
    ]);

    const denunciaId = result.rows[0].id;

    // 2. Guardar evidencias en disco y en DB
    for (const [i, file] of evidencias.entries()) {
      const extension = file.mime.split('/')[1];
      const fileName = `evidencia_${denunciaId}_${i}.${extension}`;
      const filePath = path.join(__dirname, '..', 'uploads', fileName);

      fs.writeFileSync(filePath, Buffer.from(file.base64, 'base64'));

      await pool.query(`INSERT INTO evidencias (denuncia_id, archivo) VALUES ($1, $2)`, [
        denunciaId, `/uploads/${fileName}`
      ]);
    }

    // 3. Generar PDF
    const pdfPath = path.join(__dirname, '..', 'uploads', `denuncia_${denunciaId}.pdf`);
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(pdfPath));
    doc.fontSize(20).text('Denuncia recibida', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Título: ${titulo}`);
    doc.text(`Descripción: ${descripcion}`);
    doc.text(`Fecha: ${fecha}`);
    doc.text(`Ubicación: ${ubicacion}`);
    doc.text(`Tipo de violencia: ${tipoViolencia}`);
    doc.end();

    // 4. Enviar email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Sistema de Denuncias PUCE" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: 'Nueva denuncia registrada',
      text: `Se ha registrado una nueva denuncia: ${titulo}`,
      attachments: [
        {
          filename: `denuncia_${denunciaId}.pdf`,
          path: pdfPath,
        }
      ]
    });

    res.status(201).json({ message: 'Denuncia enviada correctamente' });
  } catch (err) {
    console.error('Error al procesar denuncia:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;
