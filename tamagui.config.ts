import Colors from '@/constants/ColorsSchema';
import { config } from '@tamagui/config/v3';
import { createTamagui } from 'tamagui';

const appConfig = createTamagui({
  ...config,
  themes: Colors,
  defaultFont: undefined,
});

export type AppConfig = typeof appConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig;
