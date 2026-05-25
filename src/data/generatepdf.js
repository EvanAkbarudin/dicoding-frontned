// generatePDF.js — Safe Massage | Simple & Professional Report Design
// Optimized for users 40+ years old: clean, readable, and print-friendly

import jsPDF from 'jspdf';

// ── Simple Color Palette ──────────────────────────────────────────────────────
const COLORS = {
  white: [255, 255, 255],
  black: [0, 0, 0],
  darkGray: [60, 60, 60],
  mediumGray: [120, 120, 120],
  lightGray: [200, 200, 200],
  veryLightGray: [240, 240, 240],
  safe: [46, 204, 113],      // Green
  danger: [231, 76, 60],     // Red
  accent: [52, 152, 219],    // Blue
};

// ── Helper Functions ──────────────────────────────────────────────────────────

function formatDate(iso) {
  return new Date(iso).toLocaleString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function setColor(doc, rgb, type = 'text') {
  if (type === 'text') doc.setTextColor(...rgb);
  if (type === 'fill') doc.setFillColor(...rgb);
  if (type === 'draw') doc.setDrawColor(...rgb);
}

function drawLine(doc, x1, y1, x2, y2, color = COLORS.lightGray, width = 0.5) {
  doc.setLineWidth(width);
  setColor(doc, color, 'draw');
  doc.line(x1, y1, x2, y2);
}

function drawBox(doc, x, y, w, h, fillColor, borderColor = null) {
  setColor(doc, fillColor, 'fill');
  doc.rect(x, y, w, h, 'F');
  if (borderColor) {
    setColor(doc, borderColor, 'draw');
    doc.setLineWidth(0.5);
    doc.rect(x, y, w, h, 'S');
  }
}

function wrapText(doc, text, x, y, maxWidth, lineHeight) {
  const lines = doc.splitTextToSize(String(text || ''), maxWidth);
  lines.forEach((line) => {
    doc.text(line, x, y);
    y += lineHeight;
  });
  return y;
}

// ── Main Export Function ──────────────────────────────────────────────────────

export function generateSinglePDF(item) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const W = 210;
  const H = 297;
  const M = 20; // margin
  const CW = W - M * 2; // content width

  const isSafe = item.status === 'safe';
  const statusColor = isSafe ? COLORS.safe : COLORS.danger;
  const statusText = isSafe ? 'PESAN AMAN' : 'PESAN BERBAHAYA';
  const statusIcon = isSafe ? '✓' : '✗';

  let y = M;

  // ── HEADER SECTION ────────────────────────────────────────────────────────
  // Logo/Brand
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  setColor(doc, COLORS.black, 'text');
  doc.text('Safe Massage', M, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  setColor(doc, COLORS.mediumGray, 'text');
  doc.text('Laporan Analisis Deteksi Phishing SMS', M, y);
  y += 12;

  // Horizontal line
  drawLine(doc, M, y, W - M, y, COLORS.lightGray, 1);
  y += 10;

  // ── STATUS SECTION ────────────────────────────────────────────────────────
  // Status box with icon
  const statusBoxH = 25;
  drawBox(doc, M, y, CW, statusBoxH, COLORS.veryLightGray, statusColor);

  // Status icon circle
  setColor(doc, statusColor, 'fill');
  doc.circle(M + 12, y + statusBoxH / 2, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  setColor(doc, COLORS.white, 'text');
  doc.text(statusIcon, M + 12, y + statusBoxH / 2 + 5, { align: 'center' });

  // Status text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  setColor(doc, statusColor, 'text');
  doc.text(statusText, M + 28, y + statusBoxH / 2 + 2);

  y += statusBoxH + 12;

  // ── INFORMATION SECTION ───────────────────────────────────────────────────
  // Section title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  setColor(doc, COLORS.black, 'text');
  doc.text('INFORMASI LAPORAN', M, y);
  y += 8;

  // Info table
  const infoData = [
    ['Tanggal Pemeriksaan', formatDate(item.timestamp)],
    ['Nomor ID Laporan', `SM-${item.id}`],
    ['Status Hasil', statusText],
  ];

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);

  infoData.forEach(([label, value]) => {
    setColor(doc, COLORS.mediumGray, 'text');
    doc.text(label, M, y);
    setColor(doc, COLORS.black, 'text');
    doc.text(': ' + value, M + 55, y);
    y += 7;
  });

  y += 8;

  // ── MESSAGE CONTENT SECTION ───────────────────────────────────────────────
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  setColor(doc, COLORS.black, 'text');
  doc.text('ISI PESAN SMS', M, y);
  y += 8;

  // Message box
  const messageBoxPadding = 8;
  const messageStartY = y;
  
  drawBox(doc, M, y, CW, 0, COLORS.veryLightGray); // Will adjust height later
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  setColor(doc, COLORS.black, 'text');
  
  const messageEndY = wrapText(
    doc,
    item.message,
    M + messageBoxPadding,
    y + messageBoxPadding,
    CW - messageBoxPadding * 2,
    6
  );
  
  const messageBoxH = messageEndY - messageStartY + messageBoxPadding;
  drawBox(doc, M, messageStartY, CW, messageBoxH, COLORS.veryLightGray, COLORS.lightGray);
  
  // Re-draw text on top of box
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  setColor(doc, COLORS.black, 'text');
  wrapText(
    doc,
    item.message,
    M + messageBoxPadding,
    messageStartY + messageBoxPadding,
    CW - messageBoxPadding * 2,
    6
  );

  y = messageEndY + messageBoxPadding + 8;

  // ── ANALYSIS RESULT SECTION ───────────────────────────────────────────────
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  setColor(doc, COLORS.black, 'text');
  doc.text('HASIL ANALISIS', M, y);
  y += 8;

  // Analysis box
  const analysisBoxPadding = 8;
  const analysisStartY = y;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  setColor(doc, COLORS.darkGray, 'text');
  
  const analysisEndY = wrapText(
    doc,
    item.reason,
    M + analysisBoxPadding,
    y + analysisBoxPadding,
    CW - analysisBoxPadding * 2,
    6
  );
  
  const analysisBoxH = analysisEndY - analysisStartY + analysisBoxPadding;
  drawBox(doc, M, analysisStartY, CW, analysisBoxH, COLORS.white, COLORS.lightGray);
  
  // Re-draw text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  setColor(doc, COLORS.darkGray, 'text');
  wrapText(
    doc,
    item.reason,
    M + analysisBoxPadding,
    analysisStartY + analysisBoxPadding,
    CW - analysisBoxPadding * 2,
    6
  );

  y = analysisEndY + analysisBoxPadding + 12;

  // ── RECOMMENDATIONS SECTION ───────────────────────────────────────────────
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  setColor(doc, COLORS.black, 'text');
  doc.text('SARAN DAN TINDAKAN', M, y);
  y += 8;

  const recommendations = isSafe
    ? [
        'Tetap waspada terhadap link atau lampiran yang mencurigakan.',
        'Jangan pernah membagikan PIN, OTP, atau password kepada siapapun.',
        'Verifikasi kebenaran pesan langsung ke pengirim resmi jika ragu.',
      ]
    : [
        'JANGAN klik link apapun yang ada di pesan ini.',
        'JANGAN berikan data pribadi seperti KTP, rekening, atau OTP.',
        'Laporkan pesan ini ke operator seluler atau pihak berwenang.',
        'Blokir nomor pengirim untuk mencegah pesan lanjutan.',
      ];

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  setColor(doc, COLORS.darkGray, 'text');

  recommendations.forEach((rec, index) => {
    // Number circle
    setColor(doc, statusColor, 'fill');
    doc.circle(M + 4, y - 2, 3, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    setColor(doc, COLORS.white, 'text');
    doc.text(String(index + 1), M + 4, y + 1, { align: 'center' });

    // Recommendation text
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    setColor(doc, COLORS.darkGray, 'text');
    const recEndY = wrapText(doc, rec, M + 12, y, CW - 12, 6);
    y = recEndY + 4;
  });

  y += 8;

  // ── FOOTER SECTION ────────────────────────────────────────────────────────
  const footerY = H - 25;
  drawLine(doc, M, footerY, W - M, footerY, COLORS.lightGray, 1);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  setColor(doc, COLORS.mediumGray, 'text');
  doc.text('Safe Massage — Sistem Deteksi Phishing SMS', M, footerY + 6);
  doc.text('Laporan ini dibuat secara otomatis dan bersifat informatif.', M, footerY + 11);
  doc.text(
    `Halaman 1 dari 1 | Dicetak: ${new Date().toLocaleDateString('id-ID')}`,
    W - M,
    footerY + 6,
    { align: 'right' }
  );

  // ── SAVE PDF ──────────────────────────────────────────────────────────────
  const filename = `SafeMassage_Laporan_${isSafe ? 'Aman' : 'Bahaya'}_${item.id}.pdf`;
  doc.save(filename);
}
