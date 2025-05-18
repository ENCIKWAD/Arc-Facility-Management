// src/services/api.js
import axios from 'axios';
import router from '@/router'; // Import your Vue router

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  withCredentials: true // If you're using session cookies
});

// Add response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Handle 401 Unauthorized
      if (error.response.status === 401) {
        console.log('Not authenticated, redirecting to login');
        router.push('/');
      }
      
      // Handle 403 Forbidden
      if (error.response.status === 403) {
        console.log('Forbidden access, redirecting to unauthorized page');
        router.push('/unauthorized');
      }
    }
    return Promise.reject(error);
  }
);

export default api;