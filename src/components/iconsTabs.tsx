import { View, Text, ImageSourcePropType } from "react-native";
import React, { PropsWithoutRef } from "react";
import { Avatar, Image } from "tamagui";

export default function IconsTabs({ foto }: { foto: ImageSourcePropType }) {
  return <Image source={foto} height={35} width={35} />;
}
