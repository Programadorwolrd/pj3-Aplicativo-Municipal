import { View } from "react-native";
import React from "react";
import { Text } from "tamagui"; //importa tamagui

import { router } from "expo-router";
import { XStack, YStack } from "tamagui";
import { ButtonCustom } from "@/components/buttonCustom";
import { storeAuth } from "@/lib/logicAuth";
import useApi from "@/lib/useApi";

export default function Profile() {
  const loggout = storeAuth((s) => s.logout);

  const { data, refetch } = useApi("query", (axios) => ({
    queryKey: ["getMyProfile"],
    queryFn() {
      return axios.get("/usuario");
    },
  }));

  const { mutate } = useApi("mutate", (axios) => ({
    mutationFn() {
      return axios.delete("/usuario");
    },
  }));

  return (
    <View>
      <Text fontSize={100}>{""}</Text>
      <YStack gap={10}>
        <Text fontSize={60}>{data?.data?.usuario?.apelido || "..."}</Text>
        <ButtonCustom onPress={loggout}>Sair</ButtonCustom>
        <ButtonCustom backgroundColor={"orange"} onPress={refetch}>
          Recarregar
        </ButtonCustom>
        <ButtonCustom backgroundColor={"$red10"} onPress={mutate}>
          delete
        </ButtonCustom>
      </YStack>
    </View>
  );
}
