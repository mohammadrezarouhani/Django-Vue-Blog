import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Replace with your API base URL
//   headers: {
//     'Content-Type': 'application/json',
//     // Add any default headers you need
//   },
});

export default axiosInstance;