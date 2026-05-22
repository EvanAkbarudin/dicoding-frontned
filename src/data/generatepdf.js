// generatePDF.js — Safe Massage | Premium Report Design v2
// Pastikan sudah install: npm install jspdf

import jsPDF from 'jspdf'

// ── Color Palette ─────────────────────────────────────────────────────────────
const COLORS = {
    bg: [8, 9, 20],   // #08091400 — near-black navy
    surface: [16, 18, 38],  // #101226
    surfaceAlt: [22, 24, 50],  // #161832
    border: [38, 40, 72],  // #262848
    textPrimary: [230, 232, 255], // #E6E8FF
    textSecondary: [140, 142, 175], // #8C8EAF
    textMuted: [70, 72, 110],  // #46486E
    accent: [232, 255, 71], // #E8FF47 — electric lime
    safe: [52, 211, 153], // #34D399 — emerald
    danger: [248, 113, 113],// #F87171 — rose
    dangerDark: [127, 29, 29], // for bg
    safeDark: [6, 78, 59],
    blue: [99, 179, 237], // #63B3ED
    purple: [167, 139, 250], // #A78BFA
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function rgba(r, g, b, a = 1) { return [r, g, b, a] }

function formatDate(iso) {
    return new Date(iso).toLocaleString('id-ID', {
        day: '2-digit', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    })
}

function formatDateShort(iso) {
    return new Date(iso).toLocaleDateString('id-ID', {
        day: '2-digit', month: 'short', year: 'numeric',
    })
}

function setColor(doc, rgb, type = 'text') {
    if (type === 'text') doc.setTextColor(...rgb)
    if (type === 'fill') doc.setFillColor(...rgb)
    if (type === 'draw') doc.setDrawColor(...rgb)
}

function rr(doc, x, y, w, h, r, style = 'F') {
    doc.roundedRect(x, y, w, h, r, r, style)
}

function line(doc, x1, y1, x2, y2, rgb, lw = 0.25) {
    doc.setLineWidth(lw)
    setColor(doc, rgb, 'draw')
    doc.line(x1, y1, x2, y2)
}

function wrapText(doc, text, x, y, maxWidth, lineHeight) {
    const lines = doc.splitTextToSize(String(text || ''), maxWidth)
    lines.forEach(l => { doc.text(l, x, y); y += lineHeight })
    return y
}

function label(doc, text, x, y, color = COLORS.textMuted, size = 6.5) {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(size)
    setColor(doc, color, 'text')
    doc.text(text.toUpperCase(), x, y)
}

// ── Main Export ───────────────────────────────────────────────────────────────

export function generateSinglePDF(item) {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' })
    const W = 210
    const H = 297
    const M = 18   // margin
    const CW = W - M * 2  // content width = 174

    const isSafe = item.status === 'safe'
    const statusClr = isSafe ? COLORS.safe : COLORS.danger
    const statusDark = isSafe ? COLORS.safeDark : COLORS.dangerDark
    const statusText = isSafe ? 'PESAN AMAN' : 'PESAN BERBAHAYA'
    const riskScore = isSafe ? 15 : 85
    const riskFill = riskScore / 100

    // ── Page background ───────────────────────────────────────────────────────
    setColor(doc, COLORS.bg, 'fill')
    doc.rect(0, 0, W, H, 'F')

    // Subtle top-left corner gradient simulation (layered translucent rects)
    setColor(doc, [20, 22, 50], 'fill')
    doc.ellipse(0, 0, 80, 60, 'F')
    setColor(doc, [14, 15, 34], 'fill')
    doc.ellipse(0, 0, 50, 36, 'F')

    // ── LEFT ACCENT STRIPE ────────────────────────────────────────────────────
    setColor(doc, statusClr, 'fill')
    doc.rect(0, 0, 3.5, H, 'F')

    // ── HEADER ────────────────────────────────────────────────────────────────
    const headerH = 38
    setColor(doc, COLORS.surface, 'fill')
    doc.rect(0, 0, W, headerH, 'F')
    line(doc, 0, headerH, W, headerH, COLORS.border, 0.3)

    // Logo mark (geometric hexagon approximation using circle + text)
    setColor(doc, COLORS.accent, 'fill')
    doc.circle(M + 5.5, 19, 5.5, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    setColor(doc, COLORS.bg, 'text')
    doc.text('SM', M + 5.5, 21.2, { align: 'center' })

    // App title
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(15)
    setColor(doc, COLORS.textPrimary, 'text')
    doc.text('Safe Massage', M + 14, 17)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    setColor(doc, COLORS.textMuted, 'text')
    doc.text('Laporan Analisis Deteksi Phishing SMS', M + 14, 24)

    // Right: date + ID pill
    const dateStr = formatDateShort(item.timestamp)
    const idStr = `ID #SM-${item.id}`

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    setColor(doc, COLORS.textSecondary, 'text')
    doc.text(dateStr, W - M, 15, { align: 'right' })

    // ID badge
    setColor(doc, COLORS.surfaceAlt, 'fill')
    setColor(doc, COLORS.border, 'draw')
    doc.setLineWidth(0.3)
    rr(doc, W - M - 34, 19.5, 34, 7, 3.5, 'FD')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(6.5)
    setColor(doc, COLORS.textMuted, 'text')
    doc.text(idStr, W - M - 17, 24.5, { align: 'center' })

    // ── STATUS HERO SECTION ───────────────────────────────────────────────────
    let y = headerH + 14

    // Big status pill
    const pillW = 90, pillH = 18
    const pillX = (W - pillW) / 2
    setColor(doc, statusDark, 'fill')
    rr(doc, pillX, y, pillW, pillH, 9, 'F')
    // Glow border
    setColor(doc, statusClr, 'draw')
    doc.setLineWidth(0.6)
    rr(doc, pillX, y, pillW, pillH, 9, 'D')

    // Status icon circle
    setColor(doc, statusClr, 'fill')
    doc.circle(pillX + 12, y + pillH / 2, 5, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    setColor(doc, COLORS.bg, 'text')
    doc.text(isSafe ? '✓' : '✗', pillX + 12, y + pillH / 2 + 3, { align: 'center' })

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    setColor(doc, statusClr, 'text')
    doc.text(statusText, pillX + 22, y + pillH / 2 + 4)

    y += pillH + 8

    // Subtitle
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    setColor(doc, COLORS.textSecondary, 'text')
    const subtitle = isSafe
        ? 'Tidak terdeteksi indikator phishing yang signifikan.'
        : 'Terdeteksi pola smishing/phishing. Harap berhati-hati.'
    doc.text(subtitle, W / 2, y, { align: 'center' })

    y += 14

    // ── RISK SCORE METER ──────────────────────────────────────────────────────
    const meterX = M, meterW = CW, meterH = 7
    setColor(doc, COLORS.surfaceAlt, 'fill')
    rr(doc, meterX, y, meterW, meterH, 3.5, 'F')

    // Gradient fill (layered slices for gradient illusion)
    const steps = 60
    const sliceW = (meterW * riskFill) / steps
    for (let i = 0; i < steps; i++) {
        const t = i / steps
        const r = Math.round(isSafe
            ? COLORS.safe[0] * (0.4 + 0.6 * t)
            : COLORS.danger[0] * (0.4 + 0.6 * t))
        const g = Math.round(isSafe
            ? COLORS.safe[1] * (0.4 + 0.6 * t)
            : COLORS.danger[1] * (0.4 + 0.6 * t))
        const b = Math.round(isSafe
            ? COLORS.safe[2] * (0.4 + 0.6 * t)
            : COLORS.danger[2] * (0.4 + 0.6 * t))
        doc.setFillColor(r, g, b)
        doc.rect(meterX + i * sliceW, y, sliceW + 0.5, meterH, 'F')
    }
    // Round cap
    setColor(doc, statusClr, 'fill')
    doc.circle(meterX + meterW * riskFill, y + meterH / 2, 3.5, 'F')

    // Score labels
    y += meterH + 4
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7)
    setColor(doc, COLORS.textMuted, 'text')
    doc.text('SKOR RISIKO', meterX, y)
    setColor(doc, statusClr, 'text')
    doc.text(`${riskScore}/100`, meterX + meterW, y, { align: 'right' })

    y += 12

    // ── DIVIDER with label ────────────────────────────────────────────────────
    function sectionDivider(dy, txt) {
        line(doc, M, dy, M + 20, dy, COLORS.border, 0.25)
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(6.5)
        setColor(doc, COLORS.textMuted, 'text')
        doc.text(txt, M + 23, dy + 1)
        line(doc, M + 23 + doc.getTextWidth(txt) + 4, dy, W - M, dy, COLORS.border, 0.25)
    }

    // ── SECTION: SMS CONTENT ─────────────────────────────────────────────────
    sectionDivider(y, 'ISI PESAN SMS')
    y += 8

    const msgLines = doc.splitTextToSize(String(item.message || ''), CW - 14)
    const msgBoxH = Math.max(22, msgLines.length * 5.5 + 12)

    setColor(doc, COLORS.surfaceAlt, 'fill')
    setColor(doc, COLORS.border, 'draw')
    doc.setLineWidth(0.25)
    rr(doc, M, y, CW, msgBoxH, 4, 'FD')

    // Quotes decoration
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(28)
    setColor(doc, COLORS.border, 'text')
    doc.text('"', M + 3, y + 14)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    setColor(doc, COLORS.textPrimary, 'text')
    msgLines.forEach((l, i) => {
        doc.text(l, M + 10, y + 10 + i * 5.5)
    })

    y += msgBoxH + 12

    // ── SECTION: AI ANALYSIS ──────────────────────────────────────────────────
    sectionDivider(y, 'ALASAN ANALISIS AI')
    y += 8

    const reasonLines = doc.splitTextToSize(String(item.reason || '-'), CW - 18)
    const reasonBoxH = Math.max(22, reasonLines.length * 5.5 + 12)

    setColor(doc, COLORS.surface, 'fill')
    setColor(doc, COLORS.border, 'draw')
    doc.setLineWidth(0.25)
    rr(doc, M, y, CW, reasonBoxH, 4, 'FD')

    // Left accent bar
    setColor(doc, statusClr, 'fill')
    rr(doc, M, y, 3, reasonBoxH, 1.5, 'F')

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    setColor(doc, COLORS.textPrimary, 'text')
    reasonLines.forEach((l, i) => {
        doc.text(l, M + 8, y + 8 + i * 5.5)
    })

    y += reasonBoxH + 12

    // ── SECTION: TIPS ─────────────────────────────────────────────────────────
    const tips = isSafe
        ? [
            ['Tetap Waspada', 'Pesan tampak aman, namun selalu cermati link dan lampiran.'],
            ['Jaga Kerahasiaan', 'Jangan pernah bagikan PIN, OTP, atau password kepada siapapun.'],
            ['Konfirmasi Ulang', 'Verifikasi kebenaran pesan langsung ke pengirim resmi.'],
        ]
        : [
            ['Jangan Klik Link', 'Hindari mengklik tautan apapun dalam pesan ini.'],
            ['Jaga Data Pribadi', 'Jangan berikan KTP, nomor rekening, atau kode OTP.'],
            ['Laporkan Pesan', 'Lapor ke operator seluler Anda atau Kominfo.'],
            ['Blokir Pengirim', 'Segera blokir nomor pengirim untuk mencegah pesan lanjutan.'],
        ]

    sectionDivider(y, 'SARAN DAN TINDAKAN')
    y += 8

    const tipH = 14
    const tipGap = 4
    const totalTips = tips.length

    tips.forEach(([title, desc], i) => {
        const tx = M
        const ty = y + i * (tipH + tipGap)

        // Card bg
        setColor(doc, COLORS.surface, 'fill')
        setColor(doc, COLORS.border, 'draw')
        doc.setLineWidth(0.2)
        rr(doc, tx, ty, CW, tipH, 3, 'FD')

        // Number badge
        setColor(doc, statusDark, 'fill')
        setColor(doc, statusClr, 'draw')
        doc.setLineWidth(0.3)
        rr(doc, tx + 4, ty + 3, 8, 8, 4, 'FD')
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(7)
        setColor(doc, statusClr, 'text')
        doc.text(String(i + 1), tx + 8, ty + 8.5, { align: 'center' })

        // Tip title
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(8)
        setColor(doc, COLORS.textPrimary, 'text')
        doc.text(title, tx + 16, ty + 6)

        // Tip desc
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(7.5)
        setColor(doc, COLORS.textSecondary, 'text')
        doc.text(desc, tx + 16, ty + 11.5)
    })

    y += totalTips * (tipH + tipGap) + 12

    // ── META INFO ROW ─────────────────────────────────────────────────────────
    line(doc, M, y, W - M, y, COLORS.border, 0.2)
    y += 7

    const metaItems = [
        ['DIPERIKSA PADA', formatDate(item.timestamp)],
        ['NOMOR ID', `SM-${item.id}`],
        ['METODE', 'AI — Claude Sonnet'],
    ]

    const colW = CW / metaItems.length
    metaItems.forEach(([k, v], i) => {
        const mx = M + i * colW
        label(doc, k, mx, y, COLORS.textMuted, 6)
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8)
        setColor(doc, COLORS.textSecondary, 'text')
        doc.text(v, mx, y + 5)
    })

    y += 16

    // ── FOOTER ────────────────────────────────────────────────────────────────
    const footerY = H - 20
    line(doc, 0, footerY, W, footerY, COLORS.border, 0.2)

    setColor(doc, COLORS.surface, 'fill')
    doc.rect(0, footerY, W, 20, 'F')

    // Footer left: branding
    setColor(doc, COLORS.accent, 'fill')
    doc.circle(M + 4, footerY + 10, 3, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7)
    setColor(doc, COLORS.bg, 'text')
    doc.text('SM', M + 4, footerY + 12, { align: 'center' })

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7.5)
    setColor(doc, COLORS.textSecondary, 'text')
    doc.text('Safe Massage', M + 10, footerY + 10)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(6.5)
    setColor(doc, COLORS.textMuted, 'text')
    doc.text('Sistem Deteksi Phishing Otomatis', M + 10, footerY + 15)

    // Footer right: disclaimer
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(6)
    setColor(doc, COLORS.textMuted, 'text')
    doc.text('Laporan ini dibuat secara otomatis. Hasil bersifat informatif,', W - M, footerY + 9, { align: 'right' })
    doc.text('bukan merupakan keputusan hukum atau profesional.', W - M, footerY + 14, { align: 'right' })

    // ── SAVE ──────────────────────────────────────────────────────────────────
    const filename = `SafeMassage_${isSafe ? 'Aman' : 'Bahaya'}_${item.id}.pdf`
    doc.save(filename)
}