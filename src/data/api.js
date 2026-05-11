
export const BASE_URL = 'https://hafi1-smishing-backend.hf.space'


export const ENDPOINT = '/predict'

export const FULL_URL = `${BASE_URL}${ENDPOINT}`

// ─────────────────────────────────────────────────────────────
// Fungsi utama: kirim SMS ke backend, kembalikan { status, reason }
//
// Backend kamu mungkin return format berbeda, misalnya:
//   { label: 'smishing', confidence: 0.95 }
//   { result: 'phishing', message: '...' }
//   { status: 'safe', reason: '...' }
//
// Sesuaikan fungsi normalizeResponse() di bawah ini
// ─────────────────────────────────────────────────────────────

export async function checkMessage(messageText) {
    const response = await fetch(FULL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText }),
    })

    if (!response.ok) {
        throw new Error(`Server error: ${response.status}`)
    }

    const raw = await response.json()
    return normalizeResponse(raw)
}


function normalizeResponse(raw) {

    if (raw.status && raw.reason) {
        return { status: raw.status, reason: raw.reason }
    }

    // Format 2: { label: 'smishing'|'ham', confidence: 0.95 }
    if (raw.label !== undefined) {
        const isPhishing = raw.label === 'smishing' || raw.label === 'phishing'
        return {
            status: isPhishing ? 'phishing' : 'safe',
            reason: isPhishing
                ? `Pesan terdeteksi sebagai penipuan (smishing) dengan tingkat keyakinan ${Math.round((raw.confidence ?? 0) * 100)}%.`
                : `Pesan terlihat aman dengan tingkat keyakinan ${Math.round((raw.confidence ?? 0) * 100)}%.`,
        }
    }

    // Format 3: { result: 'phishing'|'safe', message: '...' }
    if (raw.result !== undefined) {
        const isPhishing = raw.result === 'phishing' || raw.result === 'smishing'
        return {
            status: isPhishing ? 'phishing' : 'safe',
            reason: raw.message ?? (isPhishing ? 'Pesan ini mencurigakan.' : 'Pesan ini aman.'),
        }
    }

    // Format 4: { prediction: 0|1 }  (0=safe, 1=phishing)
    if (raw.prediction !== undefined) {
        const isPhishing = raw.prediction === 1 || raw.prediction === '1'
        return {
            status: isPhishing ? 'phishing' : 'safe',
            reason: isPhishing
                ? 'Pesan terdeteksi sebagai smishing/phishing oleh model AI.'
                : 'Pesan tidak terdeteksi sebagai phishing.',
        }
    }

    // Fallback: kembalikan raw apa adanya
    console.warn('Format response tidak dikenali:', raw)
    return {
        status: 'safe',
        reason: JSON.stringify(raw),
    }
}