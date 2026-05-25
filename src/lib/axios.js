import axios from 'axios';

const api = axios.create({
  baseURL: 'https://hafi1-smishing-detection-api.hf.space',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Response interceptor for generic error handling if needed
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle global errors here
    return Promise.reject(error);
  }
);

export default api;
