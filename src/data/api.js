import api from '../lib/axios';

export const ENDPOINT = "/api/v1/predictions";

// Format response backend:
// {
//   "is_phishing": true,
//   "label": "PHISHING" | "NORMAL",
//   "confidence": 100.0,
//   "phishing_score": 100.0,
//   "normal_score": 0.0,
//   "rekomendasi": "...",
//   "teks": "..."
// }

export async function checkMessage(messageText) {
  try {
    const response = await api.post(ENDPOINT, { teks: messageText });
    return normalizeResponse(response.data);
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.error || error.response.data?.detail || 'Unknown error';
      throw new Error(`Server error: ${status} — ${message}`);
    }
    if (error.request) {
      throw new Error('Network error: Tidak dapat terhubung ke server. Periksa koneksi internet Anda.');
    }
    throw new Error(`Error: ${error.message}`);
  }
}

function normalizeResponse(raw) {
  if (!raw || typeof raw !== 'object') {
    throw new Error("Response backend tidak valid.");
  }

  const isPhishing = raw.is_phishing ?? false;
  const confidence = raw.confidence ?? 0;
  const persen = Math.round(confidence);

  return {
    status: isPhishing ? "phishing" : "safe",
    reason: isPhishing
      ? `Pesan ini terdeteksi sebagai SMISHING (penipuan via SMS) oleh model AI dengan tingkat keyakinan ${persen}%. Pesan ini kemungkinan besar merupakan upaya penipuan. Jangan klik link atau ikuti instruksi apapun di dalamnya.`
      : `Pesan ini terdeteksi sebagai AMAN (bukan smishing) oleh model AI dengan tingkat keyakinan ${persen}%. Tidak ditemukan pola penipuan yang signifikan pada pesan ini.`,
  };
}
