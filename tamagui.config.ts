import { fontePadrao } from "@/constants/fonts";
import { addFontsTamagui } from "@/lib/loadFonts";
import { config, themes } from "@tamagui/config/v3";
import { createTamagui } from "tamagui";

const appConfig = createTamagui({
  ...config,
  fonts: addFontsTamagui(),
  defaultFont: fontePadrao,
  themes: { ...themes },
});

export type AppConfig = typeof appConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig;
