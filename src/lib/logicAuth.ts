import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { router } from "expo-router";

export const clientQuery = new QueryClient();

export function useGetToken() {
  return useQuery({
    queryKey: ["authToken"],
    staleTime: Number.POSITIVE_INFINITY,
    async queryFn() {
      return await AsyncStorage.getItem("authToken");
    },
  });
}

export function useLogout() {
  return useMutation({
    async mutationFn() {
      await AsyncStorage.removeItem("authToken");

      clientQuery.refetchQueries({ queryKey: ["authToken"] });
    },
  });
}

export function useLoggin() {
  return useMutation({
    async mutationFn(credentials: { email: string; senha: string }) {
      const token = "paiosa";

      await AsyncStorage.setItem("authToken", token);
    },
    async onSuccess() {
      await clientQuery.refetchQueries({ queryKey: ["authToken"] });
      router.replace("/(app)/(home)");
    },
  });
}
