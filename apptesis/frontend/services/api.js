import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.100.15:3000';

export async function sendVerificationCode(email) {
  const response = await fetch(`${API_URL}/send-code`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error('Error enviando código');
  }
}

export async function verifyCode(email, code) {
  const response = await fetch(`${API_URL}/verify-code`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, code }),
  });

  if (!response.ok) {
    throw new Error('Error verificando código');
  }

  const data = await response.json();

  if (data.valid) {
    await AsyncStorage.setItem('token', data.token);
    await AsyncStorage.setItem('usuario_id', data.userId.toString());
  }

  return data.valid;
}

export async function enviarDenuncia(payload) {
  const token = await AsyncStorage.getItem('token');

  const res = await fetch(`${API_URL}/denuncias`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error('Error al enviar denuncia');
  return await res.json();
}