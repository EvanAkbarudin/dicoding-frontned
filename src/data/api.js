import api from '../lib/axios';

export const ENDPOINT = "/api/v1/predictions";

// Format response backend:
// {
//   "prediction": "smishing" | "ham",
//   "confidence": 0.95,
//   "message": "Pesan terdeteksi sebagai smishing dengan confidence 95%"
// }

export async function checkMessage(messageText) {
  try {
    const response = await api.post(ENDPOINT, { text: messageText });
    return normalizeResponse(response.data);
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.detail || error.response.data?.message || 'Unknown error';
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

  const prediction = (raw.prediction ?? "").toLowerCase();
  const confidence = raw.confidence ?? 0;
  const persen = Math.round(confidence * 100);
  const isPhishing = prediction === "smishing";

  return {
    status: isPhishing ? "phishing" : "safe",
    reason: isPhishing
      ? `Pesan ini terdeteksi sebagai SMISHING (penipuan via SMS) oleh model AI dengan tingkat keyakinan ${persen}%. Pesan ini kemungkinan besar merupakan upaya penipuan. Jangan klik link atau ikuti instruksi apapun di dalamnya.`
      : `Pesan ini terdeteksi sebagai AMAN (bukan smishing) oleh model AI dengan tingkat keyakinan ${persen}%. Tidak ditemukan pola penipuan yang signifikan pada pesan ini.`,
  };
}
