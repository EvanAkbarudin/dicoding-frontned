# 📚 Safe Massage - Documentation

> Dokumentasi lengkap untuk project Safe Massage - Sistem Deteksi Phishing SMS

---

## 📋 Daftar Isi

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Setup & Installation](#setup--installation)
5. [Features](#features)
6. [Refactor Summary](#refactor-summary)
7. [Troubleshooting](#troubleshooting)
8. [Development Guide](#development-guide)

---

## Overview

Safe Massage adalah aplikasi web untuk mendeteksi pesan SMS phishing menggunakan AI. Aplikasi ini dirancang khusus untuk user usia 40+ tahun dengan fokus pada:
- **Readability**: Font besar, contrast tinggi
- **Simplicity**: UI sederhana dan mudah dipahami
- **Accessibility**: Touch-friendly, responsive design

---

## Tech Stack

### Frontend
- **React 18** - UI Library
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP Client
- **jsPDF** - PDF Generation
- **Lucide React** - Icons

### Backend API
- **Base URL**: `https://hafi1-smishing-detection-api.hf.space`
- **Endpoint**: `/api/v1/predictions`
- **Method**: POST
- **Request Body**: `{ teks: "isi pesan SMS" }`

### Storage
- **localStorage** - History & Statistics data
- **Key**: `safe_massage_history`

---

## Project Structure

```
dicoding/
├── public/
│   ├── images/
│   └── icons.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AuthModal.jsx
│   │   ├── Footer.jsx
│   │   ├── LoadingSkeleton.jsx
│   │   ├── Navbar.jsx
│   │   ├── ResultCard.jsx
│   │   └── TextInput.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── HistoryContext.jsx
│   │   └── ThemeContext.jsx
│   ├── data/
│   │   ├── api.js           # API integration
│   │   ├── generatepdf.js   # PDF generator
│   │   └── storage.js       # localStorage utils
│   ├── lib/
│   │   └── axios.js         # Axios config
│   ├── pages/
│   │   ├── Education.jsx
│   │   ├── Feedback.jsx
│   │   ├── History.jsx
│   │   ├── Home.jsx
│   │   ├── NotFound.jsx
│   │   └── Statistics.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── .gitignore
├── DOCUMENTATION.md         # This file
├── eslint.config.js
├── index.html
├── package.json
├── Postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js
```

---

## Setup & Installation

### Prerequisites
- Node.js 16+ 
- npm atau yarn

### Installation Steps

```bash
# 1. Clone repository
git clone <repository-url>
cd dicoding

# 2. Install dependencies
npm install

# 3. Setup environment variables
# Create .env file (optional)
VITE_API_URL=https://hafi1-smishing-detection-api.hf.space

# 4. Run development server
npm run dev

# 5. Build for production
npm run build

# 6. Preview production build
npm run preview
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## Features

### 1. **SMS Checker** (Home)
- Input pesan SMS
- Analisis real-time dengan AI
- Hasil: Aman atau Phishing
- Skor risiko dan rekomendasi

### 2. **History** (Riwayat)
- Daftar semua SMS yang pernah dicek
- Filter by status
- Timestamp dengan format "X menit lalu"
- Clear all history

### 3. **Statistics** (Statistik)
- Total SMS dicek
- Jumlah pesan aman vs phishing
- Tingkat keamanan (persentase)
- Donut chart visualization

### 4. **Education** (Edukasi)
- Apa itu phishing?
- Tanda-tanda pesan berbahaya
- 5 langkah melindungi diri
- FAQ

### 5. **Feedback**
- Form feedback dengan kategori
- Validasi dengan Zod
- Email optional

### 6. **PDF Export**
- Generate laporan PDF
- Design simple & print-friendly
- Informasi lengkap hasil analisis

---

## Refactor Summary

### ✅ Responsive & Mobile Friendly

**Files Changed:**
- All components and pages

**Improvements:**
- ✅ Responsive breakpoints (mobile, tablet, desktop)
- ✅ Font size 14-18px untuk usia 40+
- ✅ Touch targets 44x44px minimum
- ✅ Mobile hamburger menu
- ✅ Adaptive grid layouts
- ✅ Text wrapping & overflow handling

### ✅ PDF Redesign

**File:** `src/data/generatepdf.js`

**Changes:**
- ✅ White background (print-friendly)
- ✅ Black/gray text (high contrast)
- ✅ Simple layout, no gradients
- ✅ Clear typography hierarchy
- ✅ Numbered recommendations
- ✅ Professional & readable

### ✅ Bug Fixes

**Statistics Page:**
- ✅ Fixed "undefined%" issue
- ✅ Defensive data filtering
- ✅ Proper fallback values
- ✅ NaN handling

**API Integration:**
- ✅ Correct endpoint & base URL
- ✅ Proper request body format
- ✅ Better error handling
- ✅ User-friendly error messages

### ✅ Code Quality

- ✅ Removed unused imports
- ✅ Consistent naming conventions
- ✅ Reusable helper functions
- ✅ Clean code structure
- ✅ Better comments

---

## Troubleshooting

### Issue 1: "Tingkat Keamanan" shows undefined%

**Cause:** Data di localStorage tidak punya field `status` yang benar.

**Solution:**
```javascript
// Buka Console (F12) dan jalankan:
localStorage.removeItem('safe_massage_history');
location.reload();

// Kemudian cek SMS baru
```

### Issue 2: API Error "Field 'teks' wajib diisi"

**Cause:** Request body menggunakan field yang salah.

**Solution:** Sudah diperbaiki di `api.js`. Pastikan menggunakan:
```javascript
{ teks: messageText }  // ✅ Correct
// bukan { text: messageText } atau { message: messageText }
```

### Issue 3: Changes tidak muncul setelah edit

**Solution:**
```bash
# 1. Hard refresh browser
Cmd + Shift + R (Mac)
Ctrl + Shift + R (Windows/Linux)

# 2. Restart dev server
Ctrl + C
npm run dev

# 3. Clear browser cache
```

### Issue 4: PDF tidak ter-generate

**Cause:** jsPDF belum terinstall atau import salah.

**Solution:**
```bash
npm install jspdf
```

### Issue 5: Responsive tidak bekerja

**Cause:** Tailwind config atau PostCSS issue.

**Solution:**
```bash
# Restart dev server
npm run dev

# Check tailwind.config.js
# Pastikan content path benar
```

---

## Development Guide

### Adding New Page

1. Create page component di `src/pages/`
2. Add route di `App.jsx` atau router config
3. Add navigation link di `Navbar.jsx`
4. Test responsive di mobile, tablet, desktop

### Adding New API Endpoint

1. Add function di `src/data/api.js`
2. Use axios instance dari `src/lib/axios.js`
3. Handle errors properly
4. Add loading states

### Styling Guidelines

```javascript
// ✅ Good - Responsive
className="px-4 sm:px-6 md:px-10"

// ✅ Good - Mobile first
className="text-sm sm:text-base md:text-lg"

// ❌ Bad - Fixed size
className="px-10 text-lg"

// ✅ Good - Touch friendly
className="py-3 px-6"  // 44x44px minimum

// ❌ Bad - Too small
className="py-1 px-2"
```

### localStorage Data Structure

```javascript
{
  id: 1234567890,              // timestamp
  message: "Isi SMS...",       // max 80 chars
  status: "safe" | "phishing", // REQUIRED
  reason: "Alasan analisis...",
  timestamp: "2026-05-25T..."  // ISO string
}
```

### Testing Checklist

- [ ] Mobile (< 640px) - hamburger menu, vertical layout
- [ ] Tablet (640-1024px) - 2 column grid
- [ ] Desktop (> 1024px) - full navigation, 3 column grid
- [ ] Dark/Light mode
- [ ] API integration
- [ ] localStorage persistence
- [ ] PDF generation
- [ ] Error handling
- [ ] Loading states

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Performance Tips

1. **Lazy Loading**: Use React.lazy() for pages
2. **Code Splitting**: Separate vendor bundles
3. **Image Optimization**: Use WebP format
4. **Caching**: Leverage browser cache
5. **Minification**: Build with production mode

---

## Security Considerations

1. **API Keys**: Never commit `.env` file
2. **Input Validation**: Sanitize user input
3. **XSS Prevention**: Use React's built-in escaping
4. **HTTPS**: Always use HTTPS in production
5. **localStorage**: Don't store sensitive data

---

## Deployment

### Vercel (Recommended)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Production deployment
vercel --prod
```

### Netlify

```bash
# 1. Build
npm run build

# 2. Deploy dist/ folder to Netlify
```

### Manual

```bash
# 1. Build
npm run build

# 2. Upload dist/ folder to hosting
```

---

## Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## License

© 2026 Safe Massage. All rights reserved.

---

## Contact & Support

- **Email**: support@safemassage.id
- **Website**: https://safemassage.id
- **GitHub**: [repository-url]

---

## Changelog

### v1.1.0 (2026-05-25)
- ✅ Responsive design untuk mobile & tablet
- ✅ PDF redesign (simple & print-friendly)
- ✅ Bug fix: Statistics "undefined%"
- ✅ API integration fix
- ✅ Code cleanup & optimization

### v1.0.0 (2026-05-01)
- 🎉 Initial release
- ✨ SMS phishing detection
- 📊 Statistics & history
- 📚 Education content
- 💬 Feedback system

---

**Last Updated**: 25 Mei 2026  
**Version**: 1.1.0  
**Status**: ✅ Production Ready
