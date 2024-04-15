import {
  Outfit_100Thin,
  Outfit_700Bold,
  Outfit_800ExtraBold,
} from "@expo-google-fonts/outfit";

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
export const fontsCustom = {
  paiaTriste: Outfit_100Thin,
  paiagrosso: Outfit_800ExtraBold,
  outfitBold: Outfit_700Bold,
} as const;
