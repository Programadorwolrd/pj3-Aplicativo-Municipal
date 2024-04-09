import { View, Text } from 'react-native';
import { useEffect, type PropsWithChildren, type ReactNode } from 'react';
import { router } from 'expo-router';

export default function ProviderAuth({ children }: PropsWithChildren): ReactNode {
  const logado = true;

  useEffect(() => {
    if (!logado) router.replace('/(auth)');
  }, []);

  return children;
}
