import api from './api';
import axios from 'axios';

export interface Establishment {
  id: string;
  owner_client_id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  logo_url?: string;
  cover_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateEstablishmentPayload {
  name: string;
  category: string;
  description?: string;
  address: string;
  phone?: string;
  email?: string;
  photos?: string[];
}

export interface Product {
  id: string;
  establishment_id: string;
  name: string;
  description?: string;
  price: number;
  points_price?: number;
  photo_url?: string;
  is_active: boolean;
  created_at: string;
}

export interface CreateProductPayload {
  name: string;
  description?: string;
  price: string;
  points_price?: number;
  photo_url?: string;
}

export const createEstablishment = async (payload: CreateEstablishmentPayload): Promise<Establishment> => {
  try {
    console.log('Criando establishment:', payload);
    const response = await api.post<Establishment>('/establishments', payload);
    console.log('Establishment criado:', response.data);
    
    return response.data;

  } catch (error) {
    console.error('Erro ao criar establishment:', error);
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('Erro da API:', error.response.status, error.response.data);
        const message = error.response.data.message || 'Erro ao criar loja. Verifique os dados.';
        throw new Error(message);
      } else if (error.request) {
        console.error('Erro de rede - sem resposta:', error.request);
        throw new Error('Servidor não está respondendo. Verifique sua conexão.');
      }
    }
    throw new Error('Erro de rede ou servidor indisponível.');
  }
};

export const checkEstablishmentOwnership = async (): Promise<{ hasEstablishment: boolean; establishmentName?: string }> => {
  try {
    const response = await api.get<{ hasEstablishment: boolean; establishmentName?: string }>('/establishments/check-ownership');
    return response.data;
  } catch (error) {
    console.error('Erro ao verificar ownership:', error);
    return { hasEstablishment: false };
  }
};

export const getMyEstablishment = async (): Promise<Establishment> => {
  try {
    const response = await api.get<Establishment>('/establishments/my-store');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401) {
        throw new Error('Sessão expirada. Faça login novamente.');
      }
      throw new Error(error.response.data.message || 'Erro ao buscar loja.');
    }
    throw new Error('Erro de rede ou servidor indisponível.');
  }
};

export const updateEstablishment = async (payload: Partial<Establishment>): Promise<Establishment> => {
  try {
    const response = await api.put<Establishment>('/establishments/my-store', payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Erro ao atualizar loja.');
    }
    throw new Error('Erro ao atualizar loja.');
  }
};

// Funções para produtos
export const getMyProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get<Product[]>('/establishments/my-store/products');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw new Error('Erro ao buscar produtos');
  }
};

export const createProduct = async (payload: CreateProductPayload): Promise<Product> => {
  try {
    const response = await api.post<Product>('/establishments/my-store/products', payload);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Erro ao criar produto');
    }
    throw new Error('Erro ao criar produto');
  }
};

export const updateProduct = async (productId: string, payload: Partial<CreateProductPayload>): Promise<Product> => {
  try {
    const response = await api.put<Product>(`/establishments/my-store/products/${productId}`, payload);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Erro ao atualizar produto');
    }
    throw new Error('Erro ao atualizar produto');
  }
};

// Manter compatibilidade com nomes antigos
export const createStore = createEstablishment;
export const getMyStore = getMyEstablishment;
export type Store = Establishment;
export type CreateStorePayload = CreateEstablishmentPayload;