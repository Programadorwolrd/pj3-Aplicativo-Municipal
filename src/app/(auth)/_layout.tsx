import { ArrowLeftCircle } from '@tamagui/lucide-icons';
import { router, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          header: () => (
            <ArrowLeftCircle
              onPress={() => router.back()}
              m={15}
              position='absolute'
              size={30}
              color={'white'}
            />
          ),
          contentStyle: { backgroundColor: 'transparent' },
        }}
      >
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='login'  />
        <Stack.Screen name='cadastrar'  />
      </Stack>
    </SafeAreaView>
  );
}
