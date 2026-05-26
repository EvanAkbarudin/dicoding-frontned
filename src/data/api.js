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
      const message = error.response.data?.error || error.response.data?.detail || "Unknown error";

      console.log("STATUS:", status);
      console.log("MESSAGE:", message);
      console.log("FULL RESPONSE:", error.response.data);

      throw new Error(`Server error: ${status} — ${message}`);
    }
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
