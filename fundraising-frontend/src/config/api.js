import axios from 'axios';

// Auto-detect environment
const isProduction = window.location.hostname !== 'localhost';

const API_URL = isProduction
  ? 'https://fundraising-backend-ipxy.onrender.com/api'
  : 'http://localhost:5000/api';

console.log('🔗 API URL:', API_URL);
console.log('🌍 Environment:', isProduction ? 'Production (Vercel)' : 'Development (Local)');

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
