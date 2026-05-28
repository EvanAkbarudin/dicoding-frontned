import api from "../lib/axios";

export const ENDPOINT = "/api/v1/predictions/check";

export async function checkMessage(messageText) {
  try {
    const response = await api.post(ENDPOINT, {
      message: messageText,
    });

    console.log("Backend API response:", response.data);

    if (response.data?.status === "success") {
      // Returns normalized { status: 'safe'|'phishing', reason: '...' }
      return response.data.data;
    }
    
    throw new Error("Gagal memproses analisis SMS.");
  } catch (error) {
    console.error("Prediction Error:", error);
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.error || "Gagal menghubungi server.";
      throw new Error(`Server error: ${status} — ${message}`, { cause: error });
    }

    if (error.request) {
      throw new Error("Network error: Tidak dapat terhubung ke server.", { cause: error });
    }

    throw new Error(error.message || "Terjadi kesalahan.", { cause: error });
  }
}
