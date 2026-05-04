import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import History from './pages/History'
import Statistics from './pages/Statistics'
import NotFound from './pages/NotFound'

function AppContent() {
  const { isDark } = useTheme()

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontSize: '16px',
            borderRadius: '12px',
            padding: '14px 18px',
            background: isDark ? '#1f2937' : '#ffffff',
            color: isDark ? '#f3f4f6' : '#1f2937',
          },
          duration: 3000,
          success: {
            iconTheme: {
              primary: isDark ? '#4ade80' : '#22c55e',
              secondary: isDark ? '#1f2937' : '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: isDark ? '#f87171' : '#ef4444',
              secondary: isDark ? '#1f2937' : '#ffffff',
            },
          },
        }}
      />
    </BrowserRouter>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
