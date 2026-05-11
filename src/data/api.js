export const BASE_URL = "https://hafi1-smishing-backend.hf.space";
export const ENDPOINT = "/predict";
export const FULL_URL = `${BASE_URL}${ENDPOINT}`;

// Format response backend:
// {
//   "prediksi"     : "SMISHING" | "HAM",
//   "probabilitas" : 0.79,
//   "status"       : "sukses"
// }

export async function checkMessage(messageText) {
  const response = await fetch(FULL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: messageText }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Server error: ${response.status} — ${errorText}`);
  }

  const raw = await response.json();
  return normalizeResponse(raw);
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
