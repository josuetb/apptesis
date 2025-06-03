const API_URL = 'http://192.168.100.6:3000'; 

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
  return data.valid; // true o false
}
