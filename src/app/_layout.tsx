import { Slot } from 'expo-router';
import { TamaguiProvider, Theme } from 'tamagui';
import appConfig from 'tamagui.config';

import { loadFonts } from '@/lib/loadFonts';

//O  Slot indica onde o grupo "(app)" será renderizado
export default function RootLayout() {
  const isLoadFont = loadFonts();

  if (isLoadFont) return null;

  return (
    <TamaguiProvider config={appConfig} defaultTheme='light'>
        <Slot />
    </TamaguiProvider>
  );
}
