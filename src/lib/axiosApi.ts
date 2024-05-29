/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import axios, { AxiosError, isAxiosError, type Axios } from 'axios';
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

const baseURL = process.env.EXPO_PUBLIC_API_URL || "http://192.168.1.108:3000";

interface Result<D> {
  mutate: UseMutationResult<D>;
  query: UseQueryResult<D>;
}

export type UseOptions<T, D, E, V> = (T extends "mutate"
  ? UseMutationOptions<D, E, V>
  : UseQueryOptions<D, E, V>) & { notlogoutIfNotAuthorized?: boolean };

/**
 * Hook personalizado para realizar chamadas à API.
 *
 * @param type Escolha se vai usar 'mutate' ou 'query' do React Query.
 * @param cbConfig Uma função que recebe uma instância do Axios e retorna as configurações do React Query.
 * @returns O retorno do React Query.
 */
export function useApi<
  D,
  T extends 'mutate' | 'query' = 'query',
  E = unknown,
  V = unknown,
>(type: T, cbConfig: (axios: Axios) => UseOptions<T, D, E, V>) {
  const loggout = storeAuth((s) => s.logout);
  const config = {
    onError,
    ...cbConfig(
      axios.create({
        baseURL,
        headers: {
          Authorization: `Bearer ${storeAuth((s) => s.token)}`,
        },
      })
    ),
  };

  const result = (
    type === 'mutate'
      ? useMutation(config as UseOptions<'mutate', D, E, V>)
      : useQuery(config as UseOptions<'query', D, E, V>)
  ) as Result<D>[T];

  const isUnauthorized =
    isAxiosError(result.error) && result.error.response?.status === 401;

  useEffect(() => {
    if (!config.notlogoutIfNotAuthorized && isUnauthorized) {
      function sair() {
        loggout();

        router.replace('/(auth)');
      }

      Alert.alert('Sessão expirada', 'Faça login novamente', [{ onPress: sair }], {
        cancelable: true,
        onDismiss: sair,
      });
    }
  }, [isUnauthorized]);

  return result;
}

function onError(error: unknown) {
  if (!(error instanceof AxiosError)) throw error;

  const data =
    (error.response?.data as {
      error: string;
      message: string | string[];
    }) || {};

  if (Array.isArray(data.message)) data.message = data.message.join(';\n \n');

  Alert.alert(data.error || error.message, data.message || 'Erro desconhecido');
}

export const baseApi = axios.create({ baseURL });
