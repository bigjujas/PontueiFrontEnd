// src/services/auth.ts
import api from './api.ts';
import axios from 'axios';

// --- Tipos de Entidade (Client/Profile) ---
export interface ClientProfile {
  id: number;
  name: string;
  email: string;
  cpf: string;
  // A API envia o campo com este nome
  date_of_birth: string; // Enviado como Date, mas geralmente serializado como string ISO
  points_balance: number; 
  created_at: string;
}

// --- Tipos de Resposta (Login/Registro) ---
export interface AuthResponse {
  client: ClientProfile; 
  access_token: string; 
}

// --- Tipos de Payload (O que o frontend envia) ---
export interface LoginPayload {
  email: string;
  password: string;
}

// O Payload de Registro deve enviar 'date_of_birth', não 'birthDate'
export interface RegisterPayload {
  name: string;
  email: string;
  cpf: string;
  date_of_birth: string; // Formato de data (yyyy-mm-dd)
  password: string;
}

// ------------------------------------

/**
 * 1. POST /auth/login - Realiza o login.
 */
export const login = async ({ email, password }: LoginPayload): Promise<AuthResponse> => {
  try {
    console.log('Tentando login para:', email);
    const response = await api.post<AuthResponse>('/auth/login', {
      email,
      password,
    });
    console.log('Login bem-sucedido:', response.data);
    
    return response.data;

  } catch (error) {
    console.error('Erro no login:', error);
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('Erro da API:', error.response.status, error.response.data);
        const message = error.response.data.message === 'Unauthorized' 
          ? 'Credenciais inválidas. Verifique seu e-mail e senha.'
          : error.response.data.message || 'Erro desconhecido ao tentar logar.';
        throw new Error(message);
      } else if (error.request) {
        console.error('Erro de rede - sem resposta:', error.request);
        throw new Error('Servidor não está respondendo. Verifique sua conexão.');
      }
    }
    throw new Error('Erro de rede ou servidor indisponível.');
  }
};

/**
 * 2. POST /auth/register - Registra um novo cliente.
 */
export const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
  try {
    console.log('Enviando dados para registro:', payload);
    const response = await api.post<AuthResponse>('/auth/register', payload);
    console.log('Resposta do registro:', response.data);
    
    return response.data;

  } catch (error) {
    console.error('Erro no registro:', error);
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('Erro da API:', error.response.status, error.response.data);
        const message = error.response.data.message || 'Erro ao tentar registrar. Verifique os dados.';
        throw new Error(message);
      } else if (error.request) {
        console.error('Erro de rede - sem resposta:', error.request);
        throw new Error('Servidor não está respondendo. Verifique sua conexão.');
      }
    }
    throw new Error('Erro de rede ou servidor indisponível.');
  }
};

// ------------------------------------
// Novo Endpoint: GET /clients/me (Preparo para o próximo passo!)

/**
 * 3. GET /clients/me - Busca o perfil do cliente logado. Requer token no header.
 */
export const getMyProfile = async (): Promise<ClientProfile> => {
  try {
    // A rota /clients/me geralmente retorna SÓ o objeto do cliente, não { client: {...} }
    const response = await api.get<ClientProfile>('/clients/me'); 
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401) {
        throw new Error('Sessão expirada. Faça login novamente.');
      }
      throw new Error(error.response.data.message || 'Erro ao buscar perfil.');
    }
    throw new Error('Erro de rede ou servidor indisponível.');
  }
};