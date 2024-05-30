/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import axios, { Axios, AxiosError, type AxiosInstance, isAxiosError } from 'axios';
import {
  useMutation,
  useQuery,
  type UseMutationOptions,
  type UseMutationResult,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import { storeAuth } from './logicAuth';

const baseURL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.108:3000';

/**
 * Hook personalizado para realizar chamadas à API.
 *
 * @param type Escolha se vai usar 'mutate' ou 'query' do React Query.
 * @param cbConfig Uma função que recebe uma instância do Axios e retorna as configurações do React Query.
 * @returns O retorno do React Query.
 */
export function useApi<T, D = unknown>(type: T & ReqType, cb: CbConfig<T, D>) {
  const { logout, token } = storeAuth();

  const axiosInstance = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token || ''}`,
    },
  });

  const configReactQuery = {
    onError: alertErrorAxios,
    throwOnError: alertErrorAxios,
    ...cb(axiosInstance),
  };

  const result =
    type === 'query'
      ? useQuery(configReactQuery as Options<'query', D>)
      : useMutation(configReactQuery as Options<'mutate', D>);

  const isNotAuthorized =
    isAxiosError(result?.error) && result.error.response?.status === 401;

  if (isNotAuthorized && !configReactQuery.notlogoutIfNotAuthorized)
    useEffect(() => {
      function sair() {
        logout();

        router.replace('/(auth)');
        console.log('a');
      }

      Alert.alert('Sessão expirada', 'Faça login novamente', [{ onPress: sair }], {
        cancelable: true,
        onDismiss: sair,
      });
    }, []);

  return result as Result<T, D>;
}

export function alertErrorAxios(error: unknown) {
  if (!(error instanceof AxiosError)) throw error;

  if (error.response?.status === 401) return; // useAPI já vai tratar esse

  const data =
    (error.response?.data as {
      error: string;
      message: string | string[];
    }) || {};

  if (Array.isArray(data.message)) data.message = data.message.join(';\n \n');

  Alert.alert(data.error || error.message, data.message || 'Erro desconhecido');
}

type ReqType = 'query' | 'mutate';
type CbConfig<T, D> = (axios: AxiosInstance) => Options<T, D>;
type Result<T, D> = T extends 'query' ? UseQueryResult<D> : UseMutationResult<D>;
type Options<T, D> = (T extends 'query' ? UseQueryOptions<D> : UseMutationOptions<D>) & {
  notlogoutIfNotAuthorized?: boolean;
};
