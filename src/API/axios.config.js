import axios from 'axios';

const url = 'http://localhost:8080/api'

const axiosInstance = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;