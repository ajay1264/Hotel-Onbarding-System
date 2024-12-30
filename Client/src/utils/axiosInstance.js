import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',  // Your backend URL
  timeout: 10000, // Optional timeout
});

export default axiosInstance;
