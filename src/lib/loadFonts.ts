import { fontsCustom } from "@/constants/fontsCustom";
import { fonts } from "@tamagui/config/v3";
import { useFonts } from "expo-font";
import { createFont, type GenericFont } from "tamagui";

// funções para setar a fonte
export const loadFonts = () => {
  const [fontsLoaded, fontError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    ...fontsCustom,
  });

  return !fontsLoaded && !fontError ? true : false;
};

export function addFontsTamagui() {
  const fontBase = fonts.heading;

  const fontCustomTamagui: FontCustomTamagui = {};
  for (const key in fontsCustom) {
    fontCustomTamagui[key as KeysFontCustom] = createFont({
      size: fontBase.size,
      family: key,
    });
  }

  return {
    ...fonts,
    ...fontCustomTamagui,
  } as const;
}

type KeysFontCustom = keyof typeof fontsCustom;
type FontCustomTamagui = {
  [key in KeysFontCustom]?: GenericFont<string | number>;
};
