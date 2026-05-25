import { useEffect } from "react";
import { useHistory } from "../context/HistoryContext";
import { useTheme } from "../context/ThemeContext";

function drawDonut(safe, phishing, isDark) {
  const canvas = document.getElementById("sm-donut");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const total = safe + phishing;
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const r = 90;
  const innerR = 55;
  const safeAngle = (safe / total) * Math.PI * 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const segments = [
    { start: -Math.PI / 2, end: -Math.PI / 2 + safeAngle, color: "#2ecc71" },
    { start: -Math.PI / 2 + safeAngle, end: -Math.PI / 2 + Math.PI * 2, color: "#e74c3c" },
  ];

  segments.forEach((seg) => {
    if (Math.abs(seg.end - seg.start) < 0.001) return;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, seg.start, seg.end);
    ctx.closePath();
    ctx.fillStyle = seg.color;
    ctx.fill();
  });

  // Inner hole
  ctx.beginPath();
  ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
  ctx.fillStyle = isDark ? "#12121a" : "#ffffff";
  ctx.fill();

  // Center text
  ctx.fillStyle = isDark ? "#f0f0f8" : "#0f172a";
  ctx.font = "bold 24px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(total, cx, cy - 8);

  ctx.font = "12px sans-serif";
  ctx.fillStyle = isDark ? "#6b6b80" : "#64748b";
  ctx.fillText("total dicek", cx, cy + 14);
}

export default function Statistics() {
  const { totalCount, safeCount, phishingCount, safePercent } = useHistory();
  const { isDark } = useTheme();

  useEffect(() => {
    if (totalCount > 0) drawDonut(safeCount, phishingCount, isDark);
  }, [safeCount, phishingCount, totalCount, isDark]);

  const summaryRows = [
    { label: "Total SMS dicek", value: totalCount, color: "text-[#e8ff47]" },
    { label: "Pesan aman", value: safeCount, color: "text-[#2ecc71]" },
    { label: "Pesan phishing", value: phishingCount, color: "text-[#e74c3c]" },
    { label: "Tingkat keamanan", value: totalCount ? `${safePercent}%` : "—", color: "text-[#47c8ff]" },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10 mb-20 px-10">
      <h2 data-aos="fade-up" className="font-display font-bold text-xl text-slate-900 dark:text-white mb-8 transition-colors duration-300">Statistik Pengecekan</h2>

      {totalCount === 0 ? (
        <p className="text-center py-16 text-slate-500 dark:text-white/30 text-sm font-sans transition-colors duration-300">Belum ada data statistik. Cek beberapa SMS terlebih dahulu!</p>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {/* ── Donut chart ── */}
          <div data-aos="fade-up" data-aos-delay="100" className="bg-white dark:bg-[#12121a] border border-gray-200 dark:border-white/10 rounded-2xl p-8 flex flex-col items-center shadow-sm dark:shadow-none transition-colors duration-300">
            <p className="text-[10px] font-semibold tracking-widest uppercase text-slate-400 dark:text-white/40 font-sans mb-6 transition-colors duration-300">Distribusi Hasil</p>
            <canvas id="sm-donut" width="200" height="200" />
            <div className="flex gap-6 mt-5">
              {[
                { label: "Aman", color: "bg-[#2ecc71]", count: safeCount },
                { label: "Phishing", color: "bg-[#e74c3c]", count: phishingCount },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
                  <span className="text-xs text-slate-500 dark:text-white/40 font-sans transition-colors duration-300">
                    {l.label}: <strong className="text-slate-900 dark:text-white font-medium transition-colors duration-300">{l.count}</strong>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Summary table ── */}
          <div data-aos="fade-up" data-aos-delay="200" className="bg-white dark:bg-[#12121a] border border-gray-200 dark:border-white/10 rounded-2xl p-8 shadow-sm dark:shadow-none transition-colors duration-300">
            <p className="text-[10px] font-semibold tracking-widest uppercase text-slate-400 dark:text-white/40 font-sans mb-6 transition-colors duration-300">Ringkasan</p>
            {summaryRows.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-center justify-between py-3.5 transition-colors duration-300
                  ${i < summaryRows.length - 1 ? "border-b border-gray-200 dark:border-white/10" : ""}`}
              >
                <span className="text-sm text-slate-500 dark:text-white/40 font-sans transition-colors duration-300">{row.label}</span>
                <span className={`font-display font-bold text-2xl ${row.color}`}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
