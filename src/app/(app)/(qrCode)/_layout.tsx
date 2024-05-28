import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function _layout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}
