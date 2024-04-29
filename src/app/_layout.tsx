import { Slot } from 'expo-router';
import { TamaguiProvider } from 'tamagui';
import appConfig from 'tamagui.config';

import { loadFonts } from '@/lib/loadFonts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const clientQuery = new QueryClient();

//O  Slot indica onde o grupo "(app)" será renderizado
export default function RootLayout() {
  const isLoadFont = loadFonts();

  if (isLoadFont) return null;

  return (
    <TamaguiProvider config={appConfig} defaultTheme='light'>
      <QueryClientProvider client={clientQuery}>
        <Slot />
      </QueryClientProvider>
    </TamaguiProvider>
  );
}
