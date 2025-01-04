import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://hotel-onbarding-system-server.onrender.com', 
  timeout: 10000, 
});

export default axiosInstance;
