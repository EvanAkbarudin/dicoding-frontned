import { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Check login status on mount
  useEffect(() => {
    async function checkAuth() {
      const token = localStorage.getItem('smishing_token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/api/v1/auth/me');
        if (response.data?.status === 'success') {
          setUser(response.data.data.user);
        }
      } catch (err) {
        console.error('Session expired or invalid token:', err);
        localStorage.removeItem('smishing_token');
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/api/v1/auth/login', { email, password });
      if (response.data?.status === 'success') {
        const { user: userData, token } = response.data.data;
        localStorage.setItem('smishing_token', token);
        setUser(userData);
        setIsAuthModalOpen(false);
        return { success: true };
      }
    } catch (err) {
      const message = err.response?.data?.error || 'Gagal login. Silakan cek kembali email & password Anda.';
      throw new Error(message);
    }
  };

  const registerUser = async (name, email, password) => {
    try {
      const response = await api.post('/api/v1/auth/register', { name, email, password });
      if (response.data?.status === 'success') {
        const { user: userData, token } = response.data.data;
        localStorage.setItem('smishing_token', token);
        setUser(userData);
        setIsAuthModalOpen(false);
        return { success: true };
      }
    } catch (err) {
      const message = err.response?.data?.error || 'Gagal registrasi. Silakan coba lagi.';
      throw new Error(message);
    }
  };

  const logout = () => {
    localStorage.removeItem('smishing_token');
    setUser(null);
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading,
      login, 
      registerUser, 
      logout, 
      isAuthModalOpen, 
      openAuthModal, 
      closeAuthModal 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
