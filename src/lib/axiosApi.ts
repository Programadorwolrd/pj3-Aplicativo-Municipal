import axios, { isAxiosError, type Axios } from "axios";
import { storeAuth } from "./logicAuth";
import {
  useMutation,
  useQuery,
  type UseMutationOptions,
  type UseMutationResult,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { router, useRouter } from "expo-router";
import { useEffect } from "react";
import { Alert } from "react-native";

const baseURL = process.env.EXPO_PUBLIC_API_URL || "http://192.168.1.108:3000";

interface Result {
  mutate: UseMutationResult;
  query: UseQueryResult;
}

export type UseOptions<T, D, E, V> = (T extends "mutate"
  ? UseMutationOptions<D, E, V>
  : UseQueryOptions<D, E, V>) & { notlogoutIfNotAuthorized?: boolean };

export function useApi<T extends "mutate" | "query", D, E, V>(
  type: T,
  cbConfig: (axios: Axios) => UseOptions<T, D, E, V>
) {
  const loggout = storeAuth((s) => s.logout);
  const config = cbConfig(
    axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${storeAuth((s) => s.token || '')}`,
      },
    })
  );

  const result = (
    type == "mutate"
      ? useMutation(config as UseOptions<"mutate", D, E, V>)
      : useQuery(config as UseOptions<"query", D, E, V>)
  ) as Result[T];

  const isUnauthorized =
    isAxiosError(result.error) && result.error.response?.status === 401;

  useEffect(() => {
    if (!config.notlogoutIfNotAuthorized && isUnauthorized) {
      loggout();

      router.replace("/(auth)");
    }
  }, [isUnauthorized]);

  return result;
}

export const baseApi = axios.create({ baseURL });
