import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  baseURL: "http://192.168.0.103:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token").then(result => {
      return result
    });

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);


export default axiosInstance;
