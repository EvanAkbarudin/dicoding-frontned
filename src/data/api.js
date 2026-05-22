import api from '../lib/axios';

export const ENDPOINT = "/predict";

// Format response backend:
// {
//   "prediksi"     : "SMISHING" | "HAM",
//   "probabilitas" : 0.79,
//   "status"       : "sukses"
// }

export async function checkMessage(messageText) {
  try {
    const response = await api.post(ENDPOINT, { message: messageText });
    return normalizeResponse(response.data);
  } catch (error) {
    if (error.response) {
      throw new Error(`Server error: ${error.response.status} — ${error.response.data}`);
    }
    throw new Error(`Network error: ${error.message}`);
  }
}

function normalizeResponse(raw) {
  // Validasi: backend harus return status sukses
  if (raw.status !== "sukses") {
    throw new Error("Backend mengembalikan status tidak sukses.");
  }

  const prediksi = (raw.prediksi ?? "").toUpperCase(); // "SMISHING" | "HAM"
  const probabilitas = raw.probabilitas ?? 0;
  const persen = Math.round(probabilitas * 100);
  const isPhishing = prediksi === "SMISHING";

  return {
    status: isPhishing ? "phishing" : "safe",
    reason: isPhishing
      ? `Pesan ini terdeteksi sebagai SMISHING (penipuan via SMS) oleh model AI dengan tingkat keyakinan ${persen}%. Pesan ini kemungkinan besar merupakan upaya penipuan. Jangan klik link atau ikuti instruksi apapun di dalamnya.`
      : `Pesan ini terdeteksi sebagai AMAN (bukan smishing) oleh model AI dengan tingkat keyakinan ${persen}%. Tidak ditemukan pola penipuan yang signifikan pada pesan ini.`,
  };
}
