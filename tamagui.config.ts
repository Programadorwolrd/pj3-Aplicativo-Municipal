import Colors from "@/constants/ColorsSchema";
import { addFontsTamagui } from "@/constants/loadFonts";
import { config, themes } from "@tamagui/config/v3";
import { createTamagui } from "tamagui";

const appConfig = createTamagui({
  ...config,
  fonts: addFontsTamagui(),
  themes: { ...themes, ...Colors },
});

export type AppConfig = typeof appConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig;
