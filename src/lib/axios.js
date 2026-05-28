import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request interceptor to automatically attach the JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('smishing_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for generic error handling if needed
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If unauthorized (401), we can optionally clear token
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('smishing_token');
    }
    return Promise.reject(error);
  }
);

export default api;

