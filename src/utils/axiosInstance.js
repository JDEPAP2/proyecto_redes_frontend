import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://backend.tuevento.co:5000',
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
