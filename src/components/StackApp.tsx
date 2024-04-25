import { Stack } from 'expo-router';
import type { PropsWithChildren, ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, Text, View } from 'tamagui';

type Props = {
  titulo: string;
  backgroundColor?: string;
} & PropsWithChildren;

export default function StackApp({
  children,
  titulo,
  backgroundColor = '#F5F5F5',
}: Props) {
  return (
    <Stack
      screenOptions={{
        title: titulo,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor,
        },
        headerShadowVisible: false,
        headerTitle({ children }) {
          return (
            <Text fontSize={23} fontWeight={'bold'} margin='auto'>
              {children}
            </Text>
          );
        },
      }}
    >
      {children}
    </Stack>
  );
}
