import { Stack } from 'expo-router';
import { ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'tamagui';

export default function AuthLayout() {
  const image = require('@/assets/background-login.png');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={image} resizeMode='cover' style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: 'transparent' },
          }}
        >
          <Stack.Screen name='index' />
        </Stack>
      </ImageBackground>
    </SafeAreaView>
  );
}
