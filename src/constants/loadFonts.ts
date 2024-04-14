import { Outfit_100Thin, Outfit_800ExtraBold } from "@expo-google-fonts/outfit";
import { fonts } from "@tamagui/config/v3";
import { useFonts } from "expo-font";
import { createFont, type GenericFont } from "tamagui";

/**
 * @description
 *
 *Adicione as fontes baixadas do google nesse objeto.
 *
 * Dicas:
 *   - Se der erro tente reinicie o servidor
 *   - O nome da propriedade não pode ter `_`
 *  
 * - comando para baixar a fonte: `npx expo install expo-font @expo-google-fonts/nomeDaFonteEmMinusculo`
 *
 */
const fontsCustom = {
  paiaTriste: Outfit_100Thin,
  paiagrosso: Outfit_800ExtraBold,
} as const;

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
