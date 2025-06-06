const nodemailer = require('nodemailer');
const codes = require('../data/codes');

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendCodeToEmail(email) {
  const code = generateCode();
  codes[email] = code;
  console.log(`Código para ${email}: ${code}`);

  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_PORT ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS
  ) {
    console.error('Faltan variables de entorno SMTP');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: false, // Usa true solo si usas SSL en el puerto 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"SOS PUCE" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Código de verificación',
    text: `Tu código de verificación es: ${code}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado:', info.response);
  } catch (err) {
    console.error(' Error al enviar correo:', err.message);
    console.error(err);
  }
}

function verifyUserCode(email, code) {
  return codes[email] === code;
}

module.exports = { sendCodeToEmail, verifyUserCode };
