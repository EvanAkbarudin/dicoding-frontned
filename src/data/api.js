import api from "../lib/axios";

export const ENDPOINT = "/api/v1/predictions";

export async function checkMessage(messageText) {
  try {
    const response = await api.post(ENDPOINT, {
      teks: messageText,
    });

    console.log("API RESPONSE:", response.data);

    return normalizeResponse(response.data);
  } catch (error) {
    console.error("FULL ERROR:", error);
    if (error.response) {
      const status = error.response.status;

      console.log("FULL ERROR RESPONSE:", error.response.data);

      const message = error.response.data?.error || error.response.data?.detail || "Unknown error";

      throw new Error(`Server error: ${status} — ${message}`, { cause: error });
    }

    if (error.request) {
      throw new Error("Network error: Tidak dapat terhubung ke server.", { cause: error });
    }

    throw new Error(`Error: ${error.message}`, {
      cause: error,
    });
  }

  function normalizeResponse(raw) {
    if (!raw || typeof raw !== "object") {
      throw new Error("Response backend tidak valid.");
    }

    const isPhishing = raw.is_phishing ?? false;

    const confidence = raw.confidence ?? 0;

    const persen = confidence <= 1 ? Math.round(confidence * 100) : Math.round(confidence);

    return {
      status: isPhishing ? "phishing" : "safe",
      reason: isPhishing ? `Pesan ini terdeteksi sebagai SMISHING dengan tingkat keyakinan ${persen}%.` : `Pesan ini terdeteksi sebagai AMAN dengan tingkat keyakinan ${persen}%.`,
    };
  }
}
