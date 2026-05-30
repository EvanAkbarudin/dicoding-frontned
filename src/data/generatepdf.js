import jsPDF from "jspdf";

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

// ── FIX: hanya hitung tinggi, tidak render
function calculateTextHeight(doc, text, maxWidth, lineHeight = 7) {
  const lines = doc.splitTextToSize(String(text || ""), maxWidth);
  return lines.length * lineHeight;
}

// ── FIX: render text sekali saja (NO DUPLICATE)
function drawText(doc, text, x, y, maxWidth, lineHeight = 7) {
  const lines = doc.splitTextToSize(String(text || ""), maxWidth);

  lines.forEach((line) => {
    doc.text(line, x, y);
    y += lineHeight;
  });

  return y;
}

// ── FINAL AUTO BOX (SAFE)
function drawAutoBox(doc, x, y, w, text, padding, fillColor, borderColor) {
  const lineHeight = 7;

  const textHeight = calculateTextHeight(doc, text, w - padding * 2, lineHeight);

  const boxHeight = textHeight + padding * 2;

  // BOX
  doc.setFillColor(...fillColor);
  doc.rect(x, y, w, boxHeight, "F");

  if (borderColor) {
    doc.setDrawColor(...borderColor);
    doc.rect(x, y, w, boxHeight, "S");
  }

  // TEXT (ONLY ONCE)
  doc.setTextColor(0);

  drawText(doc, text, x + padding, y + padding, w - padding * 2, lineHeight);

  return y + boxHeight;
}

export function generateSinglePDF(item) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  const W = 210;
  const M = 20;
  const CW = W - M * 2;

  const isSafe = item.status === "safe";
  const statusColor = isSafe ? COLORS.safe : COLORS.danger;

  let y = M;

  // HEADER
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Safe Message", M, y);

  y += 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.mediumGray);
  doc.text("Laporan Analisis SMS", M, y);

  y += 12;

  // STATUS BOX
  doc.setFillColor(...COLORS.veryLightGray);
  doc.rect(M, y, CW, 22, "F");

  doc.setFillColor(...statusColor);
  doc.circle(M + 10, y + 11, 6, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text(isSafe ? "✓" : "✗", M + 10, y + 13, { align: "center" });

  doc.setTextColor(...statusColor);
  doc.setFontSize(14);
  doc.text(isSafe ? "PESAN AMAN" : "PESAN BERBAHAYA", M + 25, y + 13);

  y += 30;

  // MESSAGE
  doc.setFontSize(11);
  y = drawAutoBox(doc, M, y, CW, item.message, 8, isSafe ? COLORS.safeBg : COLORS.dangerBg, statusColor);

  y += 10;

  // ANALYSIS
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.darkGray);

  y = drawAutoBox(doc, M, y, CW, item.reason, 8, COLORS.white, COLORS.lightGray);

  // FOOTER
  const footerY = 285;

  doc.setDrawColor(...COLORS.lightGray);
  doc.line(M, footerY, W - M, footerY);

  doc.setFontSize(8);
  doc.setTextColor(...COLORS.mediumGray);

  doc.text("Safe Message Report", M, footerY + 6);
  doc.text(`ID: SM-${item.id}`, W - M, footerY + 6, { align: "right" });

  doc.save(`laporan-${item.id}.pdf`);
}
