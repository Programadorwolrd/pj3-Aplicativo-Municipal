import { TamaguiProvider, Theme } from 'tamagui';
import appConfig from 'tamagui.config';
import { useColorScheme } from 'react-native';
import { useEffect, type PropsWithChildren } from 'react';
import { useFonts } from 'expo-font';

export default function ProviderStyle({ children }: PropsWithChildren) {
  const theme = useColorScheme();

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      // can hide splash screen here
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={appConfig} defaultTheme='light'>
      <Theme name={theme}>{children}</Theme>
    </TamaguiProvider>
  );
}
