import type { KeysFonts } from "@/lib/loadFonts";
import {
  Outfit_100Thin,
  Outfit_300Light,
  Outfit_400Regular,
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
  outfitBold: Outfit_700Bold,
  paiaFeliz: Outfit_300Light,
  paiaNormal: Outfit_400Regular,
  paiaFino: Outfit_100Thin,
} as const;

// defina a fonte padrão aqui
export const fontePadrao: KeysFonts = "paiaNormal";
