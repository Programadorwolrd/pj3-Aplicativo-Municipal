import { Form, Input, ScrollView, styled, type GetProps } from "tamagui";
import { Image, Text, withStaticProperties, XStack, YStack } from "tamagui";
import { TextCustom } from "./textCustom";
import type { ReactNode } from "react";
import { Keyboard } from "react-native";

interface PropsAuth {
  titulo: string;
  subTitulo: string;
  children: ReactNode[] | ReactNode;
}

export default function Tauth({ subTitulo, titulo, children }: PropsAuth) {
  const headerBackImg = require("@/assets/headerAuth.png");

  return (
    <YStack backgroundColor={"$white2"} fullscreen>
      <Image
        source={headerBackImg}
        width={"100%"}
        resizeMode="stretch"
        position="absolute"
        zi={"$1"}
      />
      <ScrollView>
        <YStack paddingVertical={"$5"} paddingHorizontal={"7%"} marginTop={190}>
          <YStack>
            <TextCustom H1>{titulo}</TextCustom>
            <TextCustom H4>{subTitulo}</TextCustom>
          </YStack>
          <YStack width={"100%"} alignItems="center" mt="$5">
            {children}
          </YStack>
        </YStack>
      </ScrollView>
    </YStack>
  );
}
