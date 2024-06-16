import React from "react";
import { storeAuth } from "@/lib/logicAuth";
import useApi from "@/lib/useApi";
import { YStack, Image, Text, XStack, View } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import AvatarProfile from "./Avatar";
import ProfileData from "./ProfileData";
import Tabs from "./(tabs)";
import { Button } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Settings } from "@tamagui/lucide-icons";
import { ranksOrdenados } from "@/lib/rankings";
import { useGetUser } from "@/lib/querys";
// import { PopoverDemo } from "./Test";

const backProfile = require("../../../assets/background-perfil.png");

interface PropsUser {
  id: string;
  apelido: string;
  foto: string;
  ranking: number;
}

function rankUser(userId: string): number | undefined {
  try {
    const rankings = ranksOrdenados();
    const index = rankings.findIndex((rank) => rank.id === userId);
    return index !== -1 ? index + 1 : undefined;
  } catch (error) {
    console.error(`Erro ao obter a colocação do usuário ${userId}:`, error);
    return undefined;
  }
}

export default function Profile() {
  // botão de logout e delete de conta

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

  const user = useApi("query", (axios) => {
    return {
      queryKey: ["user"],
      queryFn: () => {
        return axios.get("/usuario");
      },
    };
  });
  console.log(user.data?.data.usuario, "user");

  const dataUser: PropsUser = {
    id: user.data?.data.usuario.id || "",
    apelido: user.data?.data.usuario.apelido || "",
    foto: user.data?.data.usuario.foto || "",
    ranking: rankUser(user.data?.data.usuario.id) || 0,
  };
  console.log(dataUser, "data user profile");

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
              right={"$3"}
              top={"$1.5"}
            >
              {/* <PopoverDemo /> */}
              <Button
                onPress={loggout}
                icon={<Settings size={24} color="white" />}
                type="clear"
              />

              {/* <Button
                onPress={loggout}
                icon={
                  <Ionicons name="ellipsis-vertical" size={24} color="white" />
                }
                type="clear"
              /> */}
            </View>
          </XStack>
          <ProfileData nome={dataUser.apelido} ranking={dataUser.ranking} />
          <AvatarProfile img={dataUser.foto} />
        </YStack>
        <Tabs />

        {/* componente do botão de logout e delete de conta */}
      </YStack>
    </SafeAreaView>
  );
}
