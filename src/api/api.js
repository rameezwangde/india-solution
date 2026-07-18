import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Request interceptor to attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('indiaSolutionsAdminToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error('Network failure: Unable to connect to the server');
      // Could dispatch a custom event here if needed
      return Promise.reject(new Error('Network failure: Unable to connect to the server'));
    }

    const status = error.response.status;

    if (status === 401) {
      localStorage.removeItem('indiaSolutionsAdminToken');
      if (window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    } else if (status === 403) {
      console.error('Permission denied. Access forbidden.');
    } else if (status === 409) {
      console.error('Business conflict:', error.response.data.message);
    } else if (status === 413) {
      console.error('Payload too large. File size limit exceeded.');
    } else if (status === 429) {
      console.error('Rate limit exceeded. Please try again later.');
    } else if (status >= 500) {
      console.error('Generic server error occurred.');
    }

    return Promise.reject(error);
  }
);

export default api;
