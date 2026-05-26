// generatePDF.js — Safe Message | Simple & Professional Report Design
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
  safe: [46, 204, 113],
  danger: [231, 76, 60],
  safeBg: [240, 255, 245],
  dangerBg: [255, 245, 245],
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

function wrapText(doc, text, x, y, maxWidth, lineHeight = 7) {
  const lines = doc.splitTextToSize(String(text || ''), maxWidth);

  lines.forEach((line) => {
    doc.text(line, x, y);
    y += lineHeight;
  });

  return y;
}

// Auto page break helper
function ensurePageSpace(doc, currentY, neededSpace, margin = 20) {
  const pageHeight = doc.internal.pageSize.getHeight();

  if (currentY + neededSpace > pageHeight - 30) {
    doc.addPage();
    return margin;
  }

  return currentY;
}

// ── Main Export Function ──────────────────────────────────────────────────────

export function generateSinglePDF(item) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  const W = 210;
  const H = 297;
  const M = 20;
  const CW = W - M * 2;

  const isSafe = item.status === 'safe';

  const statusColor = isSafe ? COLORS.safe : COLORS.danger;

  const statusText = isSafe
    ? 'PESAN AMAN'
    : 'PESAN BERBAHAYA';

  const statusIcon = isSafe ? '✓' : '✗';

  const riskLevel = isSafe ? 'RENDAH' : 'TINGGI';

  let y = M;

  // ── HEADER ────────────────────────────────────────────────────────────────

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  setColor(doc, COLORS.black);

  doc.text('Safe Message', M, y);

  y += 7;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);

  setColor(doc, COLORS.mediumGray);

  doc.text('Laporan Analisis Deteksi Phishing SMS', M, y);

  y += 12;

  drawLine(doc, M, y, W - M, y, COLORS.lightGray, 1);

  y += 12;

  // ── STATUS SECTION ────────────────────────────────────────────────────────

  const statusBoxH = 26;

  drawBox(
    doc,
    M,
    y,
    CW,
    statusBoxH,
    COLORS.veryLightGray,
    statusColor
  );

  // Status circle
  setColor(doc, statusColor, 'fill');

  const iconCircleX = M + 12;
  const iconCircleY = y + statusBoxH / 2;

  doc.circle(iconCircleX, iconCircleY, 8, 'F');

  // Icon centered
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);

  setColor(doc, COLORS.white);

  doc.text(statusIcon, iconCircleX, iconCircleY + 3, {
    align: 'center',
  });

  // Status text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);

  setColor(doc, statusColor);

  doc.text(statusText, M + 28, y + statusBoxH / 2 + 2);

  y += statusBoxH + 14;

  // ── INFORMATION SECTION ───────────────────────────────────────────────────

  y = ensurePageSpace(doc, y, 50);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);

  setColor(doc, COLORS.black);

  doc.text('INFORMASI LAPORAN', M, y);

  y += 9;

  const infoData = [
    ['Tanggal Pemeriksaan', formatDate(item.timestamp)],
    ['Nomor ID Laporan', `SM-${item.id}`],
    ['Status Hasil', statusText],
    ['Tingkat Risiko', riskLevel],
  ];

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);

  infoData.forEach(([label, value]) => {
    setColor(doc, COLORS.mediumGray);

    doc.text(label, M, y);

    if (label === 'Tingkat Risiko') {
      setColor(
        doc,
        riskLevel === 'RENDAH'
          ? COLORS.safe
          : COLORS.danger
      );
    } else {
      setColor(doc, COLORS.black);
    }

    doc.text(': ' + value, M + 55, y);

    y += 8;
  });

  y += 8;

  // ── MESSAGE SECTION ───────────────────────────────────────────────────────

  y = ensurePageSpace(doc, y, 80);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);

  setColor(doc, COLORS.black);

  doc.text('ISI PESAN SMS', M, y);

  y += 9;

  const messagePadding = 8;

  const messageStartY = y;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);

  setColor(doc, COLORS.black);

  const messageEndY = wrapText(
    doc,
    item.message,
    M + messagePadding,
    y + messagePadding,
    CW - messagePadding * 2,
    7
  );

  const messageBoxHeight =
    messageEndY - messageStartY + messagePadding;

  drawBox(
    doc,
    M,
    messageStartY,
    CW,
    messageBoxHeight,
    isSafe ? COLORS.safeBg : COLORS.dangerBg,
    statusColor
  );

  // redraw text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);

  setColor(doc, COLORS.black);

  wrapText(
    doc,
    item.message,
    M + messagePadding,
    messageStartY + messagePadding,
    CW - messagePadding * 2,
    7
  );

  y = messageEndY + messagePadding + 12;

  // ── ANALYSIS SECTION ──────────────────────────────────────────────────────

  y = ensurePageSpace(doc, y, 70);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);

  setColor(doc, COLORS.black);

  doc.text('HASIL ANALISIS', M, y);

  y += 9;

  const analysisPadding = 8;

  const analysisStartY = y;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);

  setColor(doc, COLORS.darkGray);

  const analysisEndY = wrapText(
    doc,
    item.reason,
    M + analysisPadding,
    y + analysisPadding,
    CW - analysisPadding * 2,
    7
  );

  const analysisBoxHeight =
    analysisEndY - analysisStartY + analysisPadding;

  drawBox(
    doc,
    M,
    analysisStartY,
    CW,
    analysisBoxHeight,
    COLORS.white,
    COLORS.lightGray
  );

  // redraw text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);

  setColor(doc, COLORS.darkGray);

  wrapText(
    doc,
    item.reason,
    M + analysisPadding,
    analysisStartY + analysisPadding,
    CW - analysisPadding * 2,
    7
  );

  y = analysisEndY + analysisPadding + 14;


  // ── FOOTER ────────────────────────────────────────────────────────────────

  const footerY = H - 25;

  drawLine(doc, M, footerY, W - M, footerY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);

  setColor(doc, COLORS.mediumGray);

  doc.text(
    'Safe Message — Sistem Deteksi Phishing SMS',
    M,
    footerY + 6
  );

  doc.text(
    'Laporan ini dibuat secara otomatis dan bersifat informatif.',
    M,
    footerY + 11
  );

  doc.text(
    'Jangan gunakan laporan ini sebagai satu-satunya dasar keputusan keamanan.',
    M,
    footerY + 16
  );

  doc.text(
    `Halaman 1 dari 1 | Dicetak: ${new Date().toLocaleDateString(
      'id-ID'
    )}`,
    W - M,
    footerY + 6,
    {
      align: 'right',
    }
  );

  // ── SAVE ──────────────────────────────────────────────────────────────────

  const filename = `laporan-smishing-${item.id}.pdf`;

  doc.save(filename);
}