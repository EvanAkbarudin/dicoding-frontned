import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import History from "./pages/History";
import Statistics from "./pages/Statistics";
import NotFound from "./pages/NotFound";
import Education from "./pages/Education";
import Feedback from "./pages/Feedback";
import AuthModal from "./components/AuthModal";

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0a0a0f] text-[#0a0a0f] dark:text-white font-sans transition-colors duration-300">
      <Navbar />
      <AuthModal />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/education" element={<Education />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
