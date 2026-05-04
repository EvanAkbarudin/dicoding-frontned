# 🛡️ Safe Message

Aplikasi web untuk mengecek apakah pesan SMS yang diterima merupakan phishing (penipuan) atau aman. Dibangun dengan React + Tailwind CSS, terintegrasi dengan backend Express JS melalui REST API.

## Fitur

- 🔍 Cek SMS — analisis pesan dengan AI
- 📋 Riwayat — lihat & hapus riwayat pengecekan (tersimpan di localStorage)
- 📊 Statistik — chart perbandingan aman vs berbahaya
- 📱 Responsive — tampilan mobile-friendly
- 🔔 Toast notification — feedback langsung setelah analisis

## Struktur Project

```
src/
  components/
    Navbar.jsx         → navigasi utama (responsive)
    Footer.jsx         → footer halaman
    TextInput.jsx      → textarea input SMS + validasi
    ResultCard.jsx     → hasil analisis
    LoadingSkeleton.jsx → placeholder saat loading
  pages/
    Home.jsx           → halaman utama
    History.jsx        → riwayat pengecekan
    Statistics.jsx     → chart statistik
    NotFound.jsx       → halaman 404
  App.jsx
  main.jsx
```

## Setup & Jalankan

### 1. Install dependencies
```bash
npm install
```

### 2. Konfigurasi API
Buat file `.env` di root project:
```
VITE_API_URL=http://localhost:3000
```

### 3. Jalankan dev server
```bash
npm run dev
```

Buka browser ke `http://localhost:5173`

> Pastikan backend Express JS sudah berjalan di port 3000.

## API yang Digunakan

**POST** `/api/check-message`

Request:
```json
{ "message": "Isi pesan SMS" }
```

Response:
```json
{ "status": "safe" | "phishing", "reason": "Penjelasan dari AI" }
```

## Tech Stack

- React 19
- Tailwind CSS v4
- React Router DOM
- Axios
- Chart.js + react-chartjs-2
- react-hot-toast
