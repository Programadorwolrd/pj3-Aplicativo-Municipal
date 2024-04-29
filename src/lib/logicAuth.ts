import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Credentials {
  email: string;
  senha: string;
}

interface Auth {
  token: null | string;

  login: (credentials: Credentials) => void;
  logout: () => void;
}
export const storeAuth = create<Auth>()(
  persist(
    (set, get) => ({
      token: null,

      login({ email, senha }: Credentials) {
        const token = email + senha;

        set(() => ({ token }));
        router.replace("/(app)/(home)");
      },

      logout() {
        set(() => ({ token: null }));
      },
    }),
    {
      name: "authPaia",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
