import { Slot } from 'expo-router';
import { TamaguiProvider, Theme } from 'tamagui';
import appConfig from 'tamagui.config';
import { useColorScheme } from 'react-native';
import { loadFonts } from '@/lib/loadFonts';

//O  Slot indica onde o grupo "(app)" será renderizado
export default function RootLayout() {
  const temaAtual = useColorScheme();
  const isLoadFont = loadFonts();

  if (isLoadFont) return null;

  return (
    <TamaguiProvider config={appConfig} defaultTheme='light'>
      <Theme name={temaAtual}>
        <Slot />
      </Theme>
    </TamaguiProvider>
  );
}
