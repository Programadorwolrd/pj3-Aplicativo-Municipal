import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import useAxios from "./useAxios";
import { AxiosInstance, isAxiosError } from "axios";
import { useEffect } from "react";
import { Alert } from "react-native";

// tipos
export type CallbackAxios<R> = (axios: AxiosInstance) => R;
type QueryType = "mutate" | "query";
type QueryOptions = CallbackAxios<UseMutationOptions | UseQueryOptions>;
type QueryResult = UseMutationResult | UseQueryResult;

// Sobrecarga de função para diferenciar entre Query e Mutation
export default function useApi<T, D = unknown, E = Error, V = void>(
  type: T & QueryType,
  cbConfig: T extends "mutate"
    ? CallbackAxios<UseMutationOptions<D, E, V>>
    : CallbackAxios<UseQueryOptions<D, E, V>>
): T extends "mutate" ? UseMutationResult<D, E, V> : UseQueryResult<D, E>;

// função real
export default function useApi(type: QueryType, cbConfig: QueryOptions) {
  const axiosPaiado = useAxios();
  const config = cbConfig(axiosPaiado);

  const temTratamentoDeErro =
    config.throwOnError || (config as UseMutationOptions).onError;

  const result =
    type === "mutate"
      ? useMutation(config as UseMutationOptions)
      : useQuery(config as UseQueryOptions);

  // se tiver algo para tratar erros o Alert sera desabilitado
  if (!temTratamentoDeErro) {
    useEffect(() => {
      if (result.error) alertErrorQuery(result.error);
    }, [result.error]);
  }

  return result as QueryResult;
}

function alertErrorQuery(error: Error) {
  const responseError = isAxiosError(error) && error?.response;

  if (responseError && responseError.status === 401) return;
  let msgDeErro = error?.message;

  if (responseError) {
    msgDeErro = responseError.data?.message || responseError.statusText;
  }

  Alert.alert("Erro na requisição", msgDeErro);
}
