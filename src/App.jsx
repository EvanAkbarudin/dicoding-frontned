import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import History from './pages/History'
import Statistics from './pages/Statistics'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
