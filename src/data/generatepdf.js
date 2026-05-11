// generatePDF.js
// Menggunakan jsPDF (CDN via import) untuk generate PDF di browser
// Pastikan sudah install: npm install jspdf

import jsPDF from 'jspdf'

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso) {
    return new Date(iso).toLocaleString('id-ID', {
        day: '2-digit', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    })
}

function wrapText(doc, text, x, y, maxWidth, lineHeight) {
    const lines = doc.splitTextToSize(text, maxWidth)
    lines.forEach((line) => {
        doc.text(line, x, y)
        y += lineHeight
    })
    return y
}

// ── Generate PDF untuk SATU item riwayat ─────────────────────────────────────

export function generateSinglePDF(item) {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' })
    const W = doc.internal.pageSize.getWidth()   // 210
    const H = doc.internal.pageSize.getHeight()  // 297
    const isSafe = item.status === 'safe'
    const accent = isSafe ? [46, 204, 113] : [231, 76, 60]   // RGB safe=green danger=red
    const accentHex = isSafe ? '#2ecc71' : '#e74c3c'

    let y = 0  // current Y position

    // ── Background hitam ──────────────────────────────────────────────────────
    doc.setFillColor(10, 10, 15)
    doc.rect(0, 0, W, H, 'F')

    // ── Header bar ───────────────────────────────────────────────────────────
    doc.setFillColor(18, 18, 26)
    doc.rect(0, 0, W, 28, 'F')

    // Dot logo
    doc.setFillColor(232, 255, 71)
    doc.circle(14, 14, 3, 'F')

    // App name
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.setTextColor(240, 240, 248)
    doc.text('Safe Massage', 20, 15.5)

    // Tagline kanan
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.setTextColor(107, 107, 128)
    doc.text('Laporan Analisis SMS Phishing', W - 14, 15.5, { align: 'right' })

    // Garis bawah header
    doc.setDrawColor(232, 255, 71)
    doc.setLineWidth(0.5)
    doc.line(0, 28, W, 28)

    y = 44

    // ── Status badge besar ────────────────────────────────────────────────────
    const badgeW = 60
    const badgeX = (W - badgeW) / 2
    doc.setFillColor(...accent)
    doc.setDrawColor(...accent)
    roundedRect(doc, badgeX, y, badgeW, 14, 7, 'F')

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    doc.setTextColor(10, 10, 15)
    doc.text(isSafe ? '✓  PESAN AMAN' : '✗  PESAN BERBAHAYA', W / 2, y + 9.5, { align: 'center' })

    y += 22

    // ── Sub-status ───────────────────────────────────────────────────────────
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(107, 107, 128)
    doc.text(
        isSafe
            ? 'Tidak terdeteksi pola phishing yang signifikan pada pesan ini.'
            : 'Terdeteksi pola smishing/phishing pada pesan ini. Harap berhati-hati.',
        W / 2, y, { align: 'center' }
    )

    y += 14

    // ── Risk meter ───────────────────────────────────────────────────────────
    const barX = 20
    const barW = W - 40
    const barH = 5
    const fill = isSafe ? 0.15 : 0.85

    // Label
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7.5)
    doc.setTextColor(107, 107, 128)
    doc.text('SKOR RISIKO', barX, y)
    doc.text(isSafe ? 'RENDAH — 15/100' : 'TINGGI — 85/100', W - barX, y, { align: 'right' })

    y += 4

    // Track
    doc.setFillColor(26, 26, 38)
    doc.setDrawColor(255, 255, 255, 0.08)
    roundedRect(doc, barX, y, barW, barH, 2.5, 'F')

    // Fill
    doc.setFillColor(...accent)
    roundedRect(doc, barX, y, barW * fill, barH, 2.5, 'F')

    y += 16

    // ── Divider ──────────────────────────────────────────────────────────────
    doc.setDrawColor(255, 255, 255, 0.08)
    doc.setLineWidth(0.3)
    doc.line(20, y, W - 20, y)
    y += 12

    // ── Isi Pesan SMS ─────────────────────────────────────────────────────────
    sectionLabel(doc, 'ISI PESAN SMS', 20, y)
    y += 7

    const msgBoxH = 28
    doc.setFillColor(26, 26, 38)
    doc.setDrawColor(255, 255, 255, 0.08)
    doc.setLineWidth(0.3)
    roundedRect(doc, 20, y, W - 40, msgBoxH, 4, 'FD')

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    doc.setTextColor(240, 240, 248)
    y = wrapText(doc, item.message, 26, y + 8, W - 52, 5.5)

    y += 6

    // ── Alasan Analisis ───────────────────────────────────────────────────────
    sectionLabel(doc, 'ALASAN ANALISIS AI', 20, y)
    y += 7

    const reasonLines = doc.splitTextToSize(item.reason || '-', W - 52)
    const reasonBoxH = Math.max(24, reasonLines.length * 5.5 + 10)

    doc.setFillColor(26, 26, 38)
    doc.setDrawColor(...accent, 0.3)
    doc.setLineWidth(0.3)
    roundedRect(doc, 20, y, W - 40, reasonBoxH, 4, 'FD')

    // Accent left border
    doc.setFillColor(...accent)
    roundedRect(doc, 20, y, 2.5, reasonBoxH, 1, 'F')

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    doc.setTextColor(240, 240, 248)
    let ry = y + 7
    reasonLines.forEach((line) => {
        doc.text(line, 27, ry)
        ry += 5.5
    })
    y += reasonBoxH + 10

    // ── Saran ─────────────────────────────────────────────────────────────────
    const tips = isSafe
        ? [
            'Pesan tampak aman, namun tetap waspada terhadap link mencurigakan.',
            'Jangan pernah memberikan PIN, OTP, atau password kepada siapapun.',
            'Konfirmasi kebenaran pesan langsung kepada pengirim resmi.',
        ]
        : [
            'Jangan klik link apapun yang ada di pesan ini.',
            'Jangan berikan data pribadi: KTP, rekening, atau OTP.',
            'Laporkan pesan ini ke operator seluler atau pihak berwenang.',
            'Blokir nomor pengirim pesan tersebut segera.',
        ]

    sectionLabel(doc, 'SARAN DARI AI', 20, y)
    y += 7

    const tipsBoxH = tips.length * 9 + 8
    doc.setFillColor(15, 16, 34)
    doc.setDrawColor(71, 200, 255, 0.2)
    doc.setLineWidth(0.3)
    roundedRect(doc, 20, y, W - 40, tipsBoxH, 4, 'FD')

    doc.setFontSize(8)
    tips.forEach((tip, i) => {
        doc.setTextColor(71, 200, 255)
        doc.text('→', 27, y + 8 + i * 9)
        doc.setTextColor(200, 200, 210)
        doc.text(tip, 33, y + 8 + i * 9)
    })

    y += tipsBoxH + 10

    // ── Meta info ─────────────────────────────────────────────────────────────
    doc.setDrawColor(255, 255, 255, 0.06)
    doc.setLineWidth(0.3)
    doc.line(20, y, W - 20, y)
    y += 8

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(107, 107, 128)
    doc.text(`Waktu Pengecekan: ${formatDate(item.timestamp)}`, 20, y)
    doc.text(`ID: SM-${item.id}`, W - 20, y, { align: 'right' })

    // ── Footer ────────────────────────────────────────────────────────────────
    doc.setFillColor(18, 18, 26)
    doc.rect(0, H - 16, W, 16, 'F')
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.setTextColor(107, 107, 128)
    doc.text('© 2026 Safe Massage — Laporan ini dibuat otomatis oleh sistem AI.', W / 2, H - 6, { align: 'center' })

    // ── Save ──────────────────────────────────────────────────────────────────
    const filename = `SafeMassage_${isSafe ? 'Aman' : 'Bahaya'}_${item.id}.pdf`
    doc.save(filename)
}

// ── Helpers internal ─────────────────────────────────────────────────────────

function sectionLabel(doc, text, x, y) {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7.5)
    doc.setTextColor(107, 107, 128)
    doc.text(text, x, y)
}

function roundedRect(doc, x, y, w, h, r, style) {
    doc.roundedRect(x, y, w, h, r, r, style)
}