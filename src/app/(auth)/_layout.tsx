import { ArrowLeftCircle } from '@tamagui/lucide-icons';
import { router, Stack } from 'expo-router';

export default function AuthLayout() {
  return (
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
      </Stack>
  );
}
