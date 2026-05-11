/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Syne", "sans-serif"],
      },
      colors: {
        accent: "#e8ff47",
        accent2: "#ff4757",
        accent3: "#47c8ff",
        safe: "#2ecc71",
        danger: "#e74c3c",
        warn: "#f39c12",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease both",
        "fade-up-1": "fadeUp 0.6s 0.10s ease both",
        "fade-up-2": "fadeUp 0.6s 0.20s ease both",
        "fade-up-3": "fadeUp 0.6s 0.30s ease both",
        "fade-up-4": "fadeUp 0.6s 0.35s ease both",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.8)" },
        },
      },
    },
  },
  plugins: [],
};
