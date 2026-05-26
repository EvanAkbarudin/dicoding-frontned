# 🛡️ Safe Massage

> Aplikasi web untuk mendeteksi SMS phishing (smishing) menggunakan kecerdasan buatan.

![Safe Massage](https://img.shields.io/badge/Safe%20Massage-v1.0.0-e8ff47?style=for-the-badge&labelColor=0a0a0f)
![React](https://img.shields.io/badge/React-18.3.1-61dafb?style=for-the-badge&logo=react&labelColor=0a0a0f)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.4-38bdf8?style=for-the-badge&logo=tailwindcss&labelColor=0a0a0f)
![Vite](https://img.shields.io/badge/Vite-5.3.1-646cff?style=for-the-badge&logo=vite&labelColor=0a0a0f)

---

## 📌 Tentang Proyek

**Safe Massage** adalah aplikasi frontend berbasis React yang membantu pengguna — terutama berusia 40 tahun ke atas — untuk memeriksa apakah pesan SMS yang mereka terima merupakan upaya **phishing (smishing)** atau aman.

Aplikasi ini terhubung ke backend berbasis AI yang dihosting di Hugging Face Space untuk melakukan analisis teks secara real-time.

---

## ✨ Fitur

| Fitur | Deskripsi |
|---|---|
| 🔍 **Cek SMS** | Analisis pesan SMS menggunakan model AI |
| 📊 **Hasil Analisis** | Tampilkan status AMAN / BAHAYA beserta alasan dan skor risiko |
| 📋 **Riwayat** | Simpan hasil pengecekan sebelumnya menggunakan localStorage |
| 📈 **Statistik** | Visualisasi data riwayat dengan donut chart |
| 📚 **Edukasi** | Panduan lengkap mengenali dan menghindari SMS phishing |
| 📄 **Unduh PDF** | Export hasil analisis ke file PDF |
| 🚫 **404 Page** | Halaman not found yang sesuai tema |

---

## 🛠️ Tech Stack

### Frontend
- **React** 18.3.1 — UI library
- **Tailwind CSS** 3.4.4 — utility-first CSS framework
- **Vite** 5.3.1 — build tool
- **Axios** 1.7.2 — HTTP client
- **jsPDF** — generate PDF di browser
- **React Router DOM** — client-side routing

### Backend (External)
- **Hugging Face Space** — hosting model AI
- **Python / Flask** — REST API
- **Machine Learning Model** — deteksi smishing

---

## 📁 Struktur Project

```
safe-massage/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── App.jsx                   # Root component + routing
    ├── main.jsx                  # Entry point
    ├── index.css                 # Global styles + Tailwind directives
    │
    ├── components/
    │   ├── Navbar.jsx            # Sticky navbar dengan 4 menu
    │   ├── TextInput.jsx         # Input SMS + tombol cek
    │   ├── ResultCard.jsx        # Tampilan hasil analisis
    │   ├── LoadingSkeleton.jsx   # Loading state skeleton
    │   └── Footer.jsx            # Footer aplikasi
    │
    ├── pages/
    │   ├── Home.jsx              # Halaman utama (hero + input)
    │   ├── History.jsx           # Riwayat pengecekan + unduh PDF
    │   ├── Statistics.jsx        # Statistik + donut chart
    │   ├── Education.jsx         # Halaman edukasi phishing
    │   └── NotFound.jsx          # Halaman 404
    │
    ├── context/
    │   └── HistoryContext.jsx    # Global state untuk riwayat
    │
    └── data/
        ├── api.js                # Konfigurasi & koneksi API backend
        ├── storage.js            # localStorage helpers
        └── generatePDF.js        # Generator PDF hasil analisis
```

---

## 🚀 Cara Menjalankan

### Prasyarat
- Node.js >= 18
- npm >= 9

### Instalasi

```bash
# 1. Clone repository
git clone https://github.com/EvanAkbarudin/dicoding.git
cd dicoding

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

### Build Production

```bash
npm run build
npm run preview
```

---

## 🔌 Konfigurasi API

Endpoint backend dikonfigurasi di `src/data/api.js`:

```javascript
export const BASE_URL = 'https://hafi1-smishing-detection-api.hf.space'
export const ENDPOINT = '/predict'
```

### Format Request
```json
POST /predict
{
  "message": "Isi SMS yang ingin dicek"
}
```

### Format Response
```json
{
  "prediksi": "SMISHING" | "HAM",
  "probabilitas": 0.79,
  "status": "sukses"
}
```

---

## 🎨 Design System

| Token | Nilai |
|---|---|
| Background | `#0a0a0f` |
| Surface | `#12121a` |
| Surface 2 | `#1a1a26` |
| Accent (kuning) | `#e8ff47` |
| Safe (hijau) | `#2ecc71` |
| Danger (merah) | `#e74c3c` |
| Cyan | `#47c8ff` |
| Font Display | Syne 700/800 |
| Font Body | DM Sans 300/400/500 |

---

## 📸 Halaman Aplikasi

| Halaman | Path | Deskripsi |
|---|---|---|
| Cek SMS | `/` | Hero section + input analisis |
| Riwayat | `/history` | Daftar hasil pengecekan + unduh PDF |
| Statistik | `/statistics` | Donut chart + ringkasan data |
| Edukasi | `/education` | Panduan keamanan digital |
| 404 | `*` | Halaman tidak ditemukan |

---

## 👤 Author

**Evan Akbarudin**
- GitHub: [@EvanAkbarudin](https://github.com/EvanAkbarudin)

---

## 📝 Lisensi

Project ini dibuat untuk keperluan **Coding Camp / Dicoding**.

---

<div align="center">
  <p>Dibuat dengan ❤️ menggunakan React + Tailwind CSS</p>
  <p><strong>Safe Massage</strong> — Melindungi masyarakat Indonesia dari phishing SMS</p>
</div>
