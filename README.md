# 🛡️ Safe Massage

> Sistem Deteksi Phishing SMS berbasis AI untuk melindungi masyarakat Indonesia dari penipuan digital

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📖 Tentang Project

Safe Massage adalah aplikasi web untuk mendeteksi pesan SMS phishing menggunakan AI. Dirancang khusus untuk user usia 40+ tahun dengan fokus pada **readability**, **simplicity**, dan **accessibility**.

### ✨ Fitur Utama

- 🔍 **Cek SMS** - Analisis pesan dengan AI real-time
- 📋 **Riwayat** - Lihat & kelola history pengecekan
- 📊 **Statistik** - Visualisasi data dengan donut chart
- 📚 **Edukasi** - Panduan melindungi diri dari phishing
- 💬 **Feedback** - Kirim saran dan laporan
- 📄 **Export PDF** - Download laporan analisis
- 🌓 **Dark/Light Mode** - Theme switching
- 📱 **Responsive** - Mobile, tablet, desktop friendly

---

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- npm atau yarn

### Installation

```bash
# Clone repository
git clone <repository-url>
cd dicoding

# Install dependencies
npm install

# Run development server
npm run dev
```

Buka browser ke `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🏗️ Tech Stack

### Frontend
- **React 18** - UI Library
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP Client
- **jsPDF** - PDF Generation
- **Lucide React** - Icons

### Backend API
- **Endpoint**: `https://hafi1-smishing-detection-api.hf.space/api/v1/predictions`
- **Method**: POST
- **Body**: `{ teks: "isi pesan SMS" }`

---

## 📁 Project Structure

```
dicoding/
├── src/
│   ├── components/      # Reusable components
│   ├── pages/          # Page components
│   ├── context/        # React Context
│   ├── data/           # API & utilities
│   └── lib/            # Config & helpers
├── public/             # Static assets
└── DOCUMENTATION.md    # Full documentation
```

---

## 🎨 Design Principles

### User-Friendly untuk Usia 40+

1. **Font Size**: 14-18px (mudah dibaca)
2. **High Contrast**: Black on white, white on dark
3. **Touch Targets**: 44x44px minimum
4. **Simple Layout**: Tidak ramai, fokus konten
5. **Clear Navigation**: Hamburger menu di mobile
6. **Consistent Spacing**: Padding & margin generous

---

## 📚 Documentation

Dokumentasi lengkap tersedia di [DOCUMENTATION.md](./DOCUMENTATION.md)

Termasuk:
- Setup & Installation
- API Integration
- Troubleshooting
- Development Guide
- Deployment Guide

---

## 🐛 Troubleshooting

### Issue: "Tingkat Keamanan" shows undefined%

```javascript
// Buka Console (F12) dan jalankan:
localStorage.removeItem('safe_massage_history');
location.reload();
```

### Issue: Changes tidak muncul

```bash
# Hard refresh browser
Cmd + Shift + R (Mac)
Ctrl + Shift + R (Windows)

# Restart dev server
npm run dev
```

Lihat [DOCUMENTATION.md](./DOCUMENTATION.md#troubleshooting) untuk troubleshooting lengkap.

---

## 🤝 Contributing

Contributions are welcome! Please read [DOCUMENTATION.md](./DOCUMENTATION.md#contributing) for details.

---

## 📄 License

© 2026 Safe Massage. All rights reserved.

---

## 📞 Contact

- **Email**: support@safemassage.id
- **Website**: https://safemassage.id

---

## 🎯 Roadmap

- [ ] Multi-language support (EN, ID)
- [ ] SMS forwarding integration
- [ ] Browser extension
- [ ] Mobile app (React Native)
- [ ] Real-time notifications
- [ ] Community reporting

---

**Made with ❤️ for Indonesia**
