import { ArrowLeft, ArrowLeftCircle } from '@tamagui/lucide-icons';
import { router, Stack } from 'expo-router';
import { ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'tamagui';

export default function AuthLayout() {
  const image = require('@/assets/background-login.png');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={image} resizeMode='cover' style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            header: () => (
              <ArrowLeftCircle
                onPress={() => router.back()}
                m={15}
                size={30}
                color={'white'}
              />
            ),
            contentStyle: { backgroundColor: 'transparent' },
          }}
        >
          <Stack.Screen name='index' options={{ headerShown: false }} />
        </Stack>
      </ImageBackground>
    </SafeAreaView>
  );
}
