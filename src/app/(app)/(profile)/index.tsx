import React from "react";
import { storeAuth } from "@/lib/logicAuth";
import useApi from "@/lib/useApi";
import { YStack, Image, Text, XStack, View } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import AvatarProfile from "./Avatar";
import ProfileData from "./ProfileData";
import Tabs from "./(tabs)";
import { useGetUser, useGetUserRank } from "@/lib/querys";
import DropdownMenu from "./DropdownMenu";
import Loading from "@/components/loading";

import backProfile from "../../../assets/background-perfil.png";

export default function Profile() {
  const { mutate } = useApi("mutate", (axios) => ({
    mutationFn() {
      return axios.delete("/usuario");
    },
  }));

  const rank = useGetUserRank();

  const user = useGetUser();

  if (user.isLoading || rank.isLoading) return <Loading />;

  if (!user.data || !rank.data) {
    return <Text>Erro ao carregar dados</Text>;
  }

  let currentUserRankIndex = rank.data.data.rank.findIndex(
    (item) => item.isCurrentUser
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <YStack backgroundColor={"#F6FFF7"} fullscreen>
        <YStack mb={"$5"}>
          <Image
            source={backProfile}
            width={"100%"}
            height={280}
            resizeMode="stretch"
            position="absolute"
            zi={"$0"}
          />

          <XStack mt={"$4"} ai={"center"} jc={"center"}>
            <Text
              fontSize={"$8"}
              fontWeight={"bold"}
              mt={"$3"}
              color={"$white2"}
            >
              Perfil
            </Text>
            <View
              style={{ position: "absolute", backgroundColor: "transparent" }}
              alignSelf="flex-end"
              right={"$6"}
              top={"$3"}
            >
              <DropdownMenu />
            </View>
          </XStack>
          <ProfileData
            nome={user.data.data.usuario.apelido}
            ranking={currentUserRankIndex}
          />
          <AvatarProfile img={user.data.data.usuario.foto} />
        </YStack>
        <Tabs />

        {/* componente do botão de logout e delete de conta */}
      </YStack>
    </SafeAreaView>
  );
}
