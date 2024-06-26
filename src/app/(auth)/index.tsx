import { ButtonCustom } from "@/components/buttonCustom";
import { TextCustom } from "@/components/textCustom";
import { router } from "expo-router";
import { ImageBackground } from "react-native";
import { Stack, XStack, YStack } from "tamagui";
import Logo from "@/assets/logo.svg";
import ButtonsOauth from "@/components/ButtonsOauth";

export default function Auth() {
  const image = require("@/assets/background-login.png");

  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={{ width: "100%", height: "100%" }}
    >
      <YStack fullscreen alignItems="center" justifyContent="center">
        <YStack alignItems="center" w="85%">
          <XStack>
            <TextCustom preRegs="h1">Bio</TextCustom>
            <TextCustom preRegs="h1" color="white">
              Dex
            </TextCustom>
          </XStack>
          <TextCustom preRegs="h3">Vamos à Busca!</TextCustom>
          <TextCustom preRegs="p" mt="$3.5">
            Embarque agora na jornada para registrar todos os seres íncriveis e
            fascinantes do nosso parque.
          </TextCustom>
        </YStack>

        <Logo width={"40%"} height={"40%"} />

        <YStack w={"80%"} gap={10} alignItems="center">
          <XStack gap={30}>
            <ButtonsOauth
              padding={7}
              mb={5}
              size={55}
              backgroundColor={"$accentBackground"}
              circular
            />
          </XStack>

          <ButtonCustom onPress={() => router.navigate("/(auth)/cadastrar")}>
            CADASTRAR
          </ButtonCustom>

          <ButtonCustom
            bgOpaco
            onPress={() => router.navigate("/(auth)/login")}
          >
            ENTRAR
          </ButtonCustom>
        </YStack>
      </YStack>
    </ImageBackground>
  );
}
