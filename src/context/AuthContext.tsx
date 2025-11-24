// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getMyProfile, ClientProfile, login as apiLogin, register as apiRegister } from '../services/auth';
import { LoginPayload, RegisterPayload } from '../services/auth';
import { checkEstablishmentOwnership } from '../services/store';

// --- Tipos de Contexto ---
interface AuthContextData {
  client: ClientProfile | null;
  loading: boolean;
  signIn: (payload: LoginPayload) => Promise<string>;
  signUp: (payload: RegisterPayload) => Promise<string>;
  signOut: () => void;
  isAuthenticated: boolean;
  hasEstablishment: boolean;
  establishmentName: string | null;
  updateEstablishmentInfo: (name: string) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// --- Componente Provider ---

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [client, setClient] = useState<ClientProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasEstablishment, setHasEstablishment] = useState(false);
  const [establishmentName, setEstablishmentName] = useState<string | null>(null);

  const isAuthenticated = !!client;

  // 1. Lógica de Carregamento Inicial (Mantendo o usuário logado)
  useEffect(() => {
    async function loadUserFromStorage() {
      const token = localStorage.getItem('userToken');
      if (token) {
        try {
          // Se houver token, buscamos o perfil para validar e carregar os dados
          const profile = await getMyProfile();
          setClient(profile);
          
          // Verificar se já tem establishment
          const result = await checkEstablishmentOwnership();
          setHasEstablishment(result.hasEstablishment);
          setEstablishmentName(result.establishmentName || null);
        } catch (error) {
          // Token inválido ou expirado
          console.error("Token inválido, realizando logout.", error);
          localStorage.removeItem('userToken');
        }
      }
      setLoading(false);
    }
    loadUserFromStorage();
  }, []);

  // 2. Função de Login
  const signIn = async (payload: LoginPayload): Promise<string> => {
    const { access_token, client: profileData } = await apiLogin(payload);
    
    localStorage.setItem('userToken', access_token);
    setClient(profileData);
    
    console.log('Verificando se usuário já tem establishment...');
    // Verificar se já tem establishment no backend
    const result = await checkEstablishmentOwnership();
    console.log('Resultado:', result);
    setHasEstablishment(result.hasEstablishment);
    setEstablishmentName(result.establishmentName || null);
    
    if (result.hasEstablishment) {
      return '/store-dashboard';
    } else {
      return '/store-register';
    }
  };

  // 3. Função de Registro
  const signUp = async (payload: RegisterPayload): Promise<string> => {
    const { access_token, client: profileData } = await apiRegister(payload);

    localStorage.setItem('userToken', access_token);
    setClient(profileData);
    
    // Usuário novo nunca tem establishment
    setHasEstablishment(false);
    return '/store-register';
  };

  // 4. Função de Logout
  const signOut = () => {
    localStorage.removeItem('userToken');
    setClient(null);
    setHasEstablishment(false);
    setEstablishmentName(null);
  };

  // 5. Função para atualizar informações do establishment
  const updateEstablishmentInfo = (name: string) => {
    setHasEstablishment(true);
    setEstablishmentName(name);
  };

  return (
    <AuthContext.Provider value={{ client, loading, signIn, signUp, signOut, isAuthenticated, hasEstablishment, establishmentName, updateEstablishmentInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

// --- Hook Customizado ---
export const useAuth = () => useContext(AuthContext);   