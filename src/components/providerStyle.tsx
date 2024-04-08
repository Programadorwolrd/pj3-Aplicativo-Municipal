import { TamaguiProvider, Theme } from 'tamagui';
import appConfig from 'tamagui.config';
import { useColorScheme } from 'react-native';
import type { PropsWithChildren } from 'react';

export default function ProviderStyle({ children }: PropsWithChildren) {
  const theme = useColorScheme();

  return (
    <TamaguiProvider config={appConfig} defaultTheme='light'>
      <Theme name={theme}>{children}</Theme>
    </TamaguiProvider>
  );
}
