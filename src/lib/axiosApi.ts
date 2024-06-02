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
import { Alert, Platform } from 'react-native';
import { storeAuth } from './logicAuth';

const baseURL = process.env.EXPO_PUBLIC_API_URL;

if (!baseURL) throw new Error('forneça o ip do backend no env');

/**
 * Hook personalizado para realizar chamadas à API.
 *
 * @param type Escolha se vai usar 'mutate' ou 'query' do React Query.
 * @param cbConfig Uma função que recebe uma instância do Axios e retorna as configurações do React Query.
 * @returns O retorno do React Query.
 */
export function useApi<T, D = unknown>(type: T & ReqType, cb: CbConfig<T, D>) {
  const { logout, token, login } = storeAuth();

  const axiosInstance = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token || ''}`,
    },
    timeout: 5000,
    timeoutErrorMessage: 'tempo limite excedido',
  });

  axiosInstance.interceptors.response.use((res) => {
    const urlDeRefreshToken = res.request?.responseURL === `${baseURL}/token/refresh`;

    if (urlDeRefreshToken && res.status !== 401) {
      const tokenNovo = res.data.token;

      // atualiza o token sem disparar a renderização
      storeAuth.setState({ token: tokenNovo });

      // refaz a chamada com o novo token
      return axiosInstance({
        ...res.config,
        headers: { Authorization: `Bearer ${tokenNovo}` },
      });
    }

    return res;
  });

  const configReactQuery = {
    onError: alertErrorAxios,
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

  const data =
    (error.response?.data as {
      error: string;
      message: string | string[];
    }) || {};

  if (Array.isArray(data.message)) data.message = data.message.join(';\n \n');

  Platform.OS === 'web'
    ? alert(data.error || error.message || data.message || 'Erro desconhecido')
    : Alert.alert(data.error || error.message, data.message || 'Erro desconhecido');
}

type ReqType = 'query' | 'mutate';
type CbConfig<T, D> = (axios: AxiosInstance) => Options<T, D>;
type Result<T, D> = T extends 'query' ? UseQueryResult<D> : UseMutationResult<D>;
type Options<T, D> = (T extends 'query'
  ? UseQueryOptions<D>
  : UseMutationOptions<unknown, unknown, D>) & {
  notlogoutIfNotAuthorized?: boolean;
};
