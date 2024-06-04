import { ArrowLeftCircle } from '@tamagui/lucide-icons';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, View } from 'tamagui';

export default function AuthLayout() {
  const hover = {
    backgroundColor: '$colorTransparent',
    borderColor: '$colorTransparent',
  };
  return (
    <>
      <StatusBar style='light' translucent />

      <Stack
        screenOptions={{
          header: () => (
            <Button
              m={15}
              marginTop={40}
              position='absolute'
              color={'white'}
              padding={0}
              focusStyle={hover}
              hoverStyle={hover}
              pressStyle={hover}
              backgroundColor={'$colorTransparent'}
              icon={<ArrowLeftCircle size={50} />}
              onPress={() => router.back()}
            />
          ),
          contentStyle: { backgroundColor: 'transparent' },
        }}
      >
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='login' />
        <Stack.Screen name='cadastrar' />
      </Stack>
    </>
  );
}
