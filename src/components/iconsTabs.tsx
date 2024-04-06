import type { ImageSourcePropType } from "react-native";
import { Image } from "tamagui";

export default function IconsTabs({ foto }: { foto: ImageSourcePropType }) {
  return <Image source={foto} height={35} width={35} />;
}
