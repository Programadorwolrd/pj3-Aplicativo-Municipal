import { create } from "zustand";

interface AuthState {
  token: string | null;
  entrar: (token: string) => void;
  sair: () => void;
}

export const userStoreAuth = create<AuthState>((set) => ({
  token: null,

  entrar: (tokenNovo: string) => {
    set(({ token: tokenAtual }) => {
      if (tokenAtual) throw new Error("Você já está logado");

      return { token: tokenNovo };
    });
  },
  sair: () => {
    set({ token: null });
  },
}));
