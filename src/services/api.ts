// src/services/api.ts
import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = 'https://pontuei-back-end.vercel.app/'; 

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken'); 
    console.log('Token encontrado:', token ? 'Sim' : 'Não');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Header Authorization definido:', config.headers.Authorization);
    }
    console.log('Fazendo requisição para:', config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    console.log('Resposta recebida:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('Erro na resposta:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

export default api;