import React from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { ButtonCustom } from "@/components/buttonCustom";
import { storeAuth } from "@/lib/logicAuth";
import useApi from "@/lib/useApi";
import { YStack, Text, } from "tamagui";


// botão de logout e delete de conta
export default function LogoutBtn() {


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
    < View >
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
    </View >
  )
}