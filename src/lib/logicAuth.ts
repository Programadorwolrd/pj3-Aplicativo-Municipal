import { clientQuery } from "@/app/_layout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Auth {
  token: null | string;

  login: (token: string) => void;
  logout: () => void;
}
export const storeAuth = create<Auth>()(
  persist(
    (set, get) => ({
      token: null,

      async login(token: string) {
        set(() => ({ token: token }));
        clientQuery.invalidateQueries();
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
