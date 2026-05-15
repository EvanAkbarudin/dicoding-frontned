import { useState } from 'react';
import axios from 'axios';
import heroImg from './assets/hero_ai.png';
import './App.css';

function App() {
  const [pesan, setPesan] = useState('');
  const [hasil, setHasil] = useState(null);
  const [aiHasil, setAiHasil] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState(null);

  const cekSmishing = async () => {
    if (!pesan.trim()) return;
    
    setLoading(true);
    setError(null);
    setHasil(null);
    setAiHasil(null);
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/predict`, {
        teks: pesan,
        angka: [0, 0, 0, 0, 0, 0, 0] // Default parameters for fast predict
      });
      
      setHasil(response.data);
      setLoading(false);
      
    } catch (err) {
      console.error(err);
      setError("Gagal terhubung ke AI Backend. Pastikan koneksi internet aktif.");
      setLoading(false);
    }
  };

  const cekDeepAnalysis = async () => {
    setAiLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/predict_ai`, {
        teks: pesan,
        probabilitas: hasil.probabilitas,
        label: hasil.prediksi
      });
      
      setAiHasil(response.data);
      setAiLoading(false);
      
    } catch (err) {
      console.error(err);
      setError("Gagal mendapatkan analisis AI. Silakan coba lagi.");
      setAiLoading(false);
    }
  };

  return (
    <div className="premium-card">
      <img src={heroImg} alt="AI Security Hero" className="hero-img" />
      
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'white' }}>
          Smishing Detector <span style={{ color: 'var(--primary)' }}>AI</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          Analisis pesan Anda dengan kekuatan Artificial Intelligence.
        </p>
      </div>

      <div className="input-group">
        <textarea 
          placeholder="Tempelkan pesan SMS atau chat mencurigakan di sini..."
          value={pesan}
          onChange={(e) => setPesan(e.target.value)}
        />
      </div>

      <button 
        className="btn-premium" 
        onClick={cekSmishing} 
        disabled={loading || !pesan.trim()}
      >
        {loading ? (
          <>
            <div className="spinner"></div>
            <span>Sedang Menganalisis...</span>
          </>
        ) : (
          <>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span>Periksa Pesan</span>
          </>
        )}
      </button>

      {error && <div className="error-msg">{error}</div>}

      {loading && !hasil && (
        <div className="skeleton-container">
          <div className="skeleton-title"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line short"></div>
        </div>
      )}

      {hasil && (
        <div className="result-card">
          <div className="status-badge-container" style={{ textAlign: 'center' }}>
            <div className={`status-badge ${!['NORMAL', 'AMAN', 'SAFE'].some(s => hasil.prediksi?.toUpperCase().includes(s)) ? 'status-smishing' : 'status-normal'}`}>
              Hasil Analisis: {hasil.prediksi}
            </div>
          </div>
          
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '1.5rem', color: !['NORMAL', 'AMAN', 'SAFE'].some(s => hasil.prediksi?.toUpperCase().includes(s)) ? 'var(--accent-danger)' : 'var(--accent-success)' }}>
            {!['NORMAL', 'AMAN', 'SAFE'].some(s => hasil.prediksi?.toUpperCase().includes(s)) ? 'High Risk Detected' : 'No Threat Detected'}
          </h2>

          <div className="confidence-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: '500' }}>AI Confidence Score</span>
              <span style={{ fontWeight: '700', color: 'var(--text-main)', fontSize: '1.2rem' }}>
                {(hasil.probabilitas * 100).toFixed(2)}%
              </span>
            </div>
            <div className="gauge-bg">
              <div 
                className="gauge-fill" 
                style={{ 
                  width: `${hasil.probabilitas * 100}%`,
                  background: !['NORMAL', 'AMAN', 'SAFE'].some(s => hasil.prediksi?.toUpperCase().includes(s)) 
                    ? 'linear-gradient(90deg, #ff4d4d, #f87171)' 
                    : 'linear-gradient(90deg, #10b981, #34d399)'
                }}
              ></div>
            </div>
          </div>

          {!aiHasil && !aiLoading && (
            <div className="ai-prompt-container" style={{ marginTop: '2rem', textAlign: 'center', padding: '1.5rem', background: 'var(--glass)', borderRadius: '16px', border: '1px dashed var(--card-border)' }}>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Ingin penjelasan lebih mendalam dari AI?</p>
              <button className="btn-ai-deep" onClick={cekDeepAnalysis} style={{ background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '0.75rem 1.5rem', borderRadius: '12px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.3s ease' }}>
                ✨ Analisis dengan Gemini AI
              </button>
            </div>
          )}

          {aiLoading && (
            <div className="skeleton-container" style={{ marginTop: '2rem' }}>
              <div className="skeleton-title"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-line short"></div>
            </div>
          )}

          {aiHasil && (
            <div className={`ai-analysis-container ${!['NORMAL', 'AMAN', 'SAFE'].some(s => aiHasil.model_prediction.label.toUpperCase().includes(s)) ? 'analysis-danger' : 'analysis-safe'}`} style={{ marginTop: '2rem' }}>
              <div className="ai-analysis-header">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
                <span>AI Deep Analysis (Gemini)</span>
              </div>
              <div className="ai-analysis-content">
                {aiHasil.ai_analysis}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
