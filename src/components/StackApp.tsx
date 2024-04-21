import { Stack } from 'expo-router';
import type { PropsWithChildren, ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, Text, View } from 'tamagui';

interface Props {
  titulo: string;
  background?: JSX.Element;
}
export default function StackApp({ titulo, background }: Props) {
  const headerBackground = () => {
    return <SafeAreaView>
      {background || <View width={'100%'} height={'100%'} />}
    </SafeAreaView>;
  };

  return (
    <Stack
      screenOptions={{
        title: titulo,
        headerTitleAlign: 'center',
        headerBackground,
        headerTitle({ children }) {
          return (
            <Text fontSize={23} fontWeight={'bold'} margin='auto'>
              {children}
            </Text>
          );
        },
      }}
    />
  );
}
