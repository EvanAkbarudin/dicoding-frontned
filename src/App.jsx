import { useState } from 'react';
import axios from 'axios';
import heroImg from './assets/hero_ai.png';
import './App.css';

function App() {
  const [pesan, setPesan] = useState('');
  const [hasil, setHasil] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cekSmishing = async () => {
    if (!pesan.trim()) return;
    
    setLoading(true);
    setError(null);
    setHasil(null);
    
    try {
      const response = await axios.post('https://hafii-smishing-backend.hf.space/predict', {
        teks: pesan,
        angka: [0, 0, 0, 0, 0, 0, 0] // Default 7 parameter sesuai info.md
      });
      
      // Memberikan sedikit delay agar animasi loading terasa lebih smooth
      setTimeout(() => {
        setHasil(response.data);
        setLoading(false);
      }, 800);
      
    } catch (err) {
      console.error(err);
      setError("Gagal terhubung ke AI Backend. Pastikan koneksi internet aktif.");
      setLoading(false);
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

      {hasil && (
        <div className="result-card">
          <div className="status-badge-container" style={{ textAlign: 'center' }}>
            <div className={`status-badge ${hasil.prediksi === 'SMISHING' ? 'status-smishing' : 'status-normal'}`}>
              Hasil Analisis: {hasil.prediksi}
            </div>
          </div>
          
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '1.5rem', color: hasil.prediksi === 'SMISHING' ? 'var(--accent-danger)' : 'var(--accent-success)' }}>
            {hasil.prediksi === 'SMISHING' ? 'High Risk Detected' : 'No Threat Detected'}
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
                  background: hasil.prediksi === 'SMISHING' 
                    ? 'linear-gradient(90deg, #ff4d4d, #f87171)' 
                    : 'linear-gradient(90deg, #10b981, #34d399)'
                }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
