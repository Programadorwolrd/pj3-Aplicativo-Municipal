import { Slot } from 'expo-router';
import { TamaguiProvider, Theme } from 'tamagui';
import appConfig from 'tamagui.config';
import { useColorScheme } from 'react-native';
import { loadFonts } from '@/lib/loadFonts';
import { SafeAreaView } from 'react-native-safe-area-context';

//O  Slot indica onde o grupo "(app)" será renderizado
export default function RootLayout() {
  const isLoadFont = loadFonts();

  if (isLoadFont) return null;

  return (
    <TamaguiProvider config={appConfig} defaultTheme='light'>
      <SafeAreaView style={{ flex: 1 }}>
        <Slot />
      </SafeAreaView>
    </TamaguiProvider>
  );
}
