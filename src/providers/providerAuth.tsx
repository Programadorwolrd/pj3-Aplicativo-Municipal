import { View, Text } from 'react-native';
import { useEffect, type PropsWithChildren, type ReactNode } from 'react';
import { Redirect, router } from 'expo-router';
import { create } from 'zustand';

interface AuthState {
  token: string | null;
  entrar: (token: string) => void;
  sair: () => void;
}

const userStoreAuth = create<AuthState>((set) => ({
  token: null,

  entrar: (tokenNovo: string) => {
    set(({ token: tokenAtual }) => {
      if (tokenAtual) throw new Error('Você já está logado');

      return { token: tokenNovo };
    });
  },
  sair: () => {
    set({ token: null });
  },
}));

export default function ProviderAuth({ children }: PropsWithChildren): ReactNode {
  const { token } = userStoreAuth();

  if (!token) {
    useEffect(() => {
      router.replace('/(auth)/');
    }, [token]);
  }

  
  return children;
}
