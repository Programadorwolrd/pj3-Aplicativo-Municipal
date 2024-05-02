import axios, { type Axios } from "axios";
import { storeAuth } from "./logicAuth";
import {
  useMutation,
  useQuery,
  type UseMutationOptions,
  type UseMutationResult,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";

const baseURL = process.env.EXPO_PUBLIC_API_URL || "http://192.168.1.108:3000";

interface Result {
  mutate: UseMutationResult;
  query: UseQueryResult;
}

export type UseOptions<T, D, E, V> = T extends "mutate"
  ? UseMutationOptions<D, E, V>
  : UseQueryOptions<D, E, V>;

export function useApi<T extends "mutate" | "query", D, E, V>(
  type: T,
  cbConfig: (axios: Axios) => UseOptions<T, D, E, V>
) {
  const axiosApi = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${storeAuth((s) => s.token)}`,
    },
  });

  return (
    type == "mutate"
      ? useMutation(cbConfig(axiosApi) as UseOptions<"mutate", D, E, V>)
      : useQuery(cbConfig(axiosApi) as UseOptions<"query", D, E, V>)
  ) as Result[T];
}

export const baseApi = axios.create({ baseURL });
