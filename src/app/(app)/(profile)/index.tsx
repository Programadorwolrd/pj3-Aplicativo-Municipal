import React, { useState } from "react";
import { Alert, Modal, Pressable } from "react-native";
import { router } from "expo-router";
import { ButtonCustom } from "@/components/buttonCustom";
import { storeAuth } from "@/lib/logicAuth";
import useApi from "@/lib/useApi";
import { YStack, Image, Text, XStack, View } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import AvatarProfile from "./Avatar";
import ProfileData from "./ProfileData";
import Tabs from "./(tabs)";
import { Button } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from "axios";

const backProfile = require("../../../assets/background-perfil.png");

interface PropsUser {
  id: string;
  apelido: string;
  foto: string;
  // lidopelouser: {
  //   catalogo: {
  //     uuid: string,
  //     nomePopular: string
  //   }
  // },
  ranking: number;
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
    // lidopelouser: {
    //   catalogo: {
    //     uuid: user.data?.data?.usuario?.catalogo?.uuid,
    //     nomePopular: user.data?.data?.usuariocatalogo?.nomePopular
    //   }
    // },
    ranking: 3,
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

          <XStack mt={"$3"} ai={"center"} jc={"center"}>
            <Text
              fontSize={"$8"}
              fontWeight={"bold"}
              mt={"$3"}
              color={"$white2"}
            >
              Perfil
            </Text>
            <View style={{ position: "absolute", right: 20, top: 6 }}>
              <Button
                onPress={loggout}
                icon={
                  <Ionicons
                    name="ellipsis-vertical"
                    size={24}
                    color="white"
                  />
                }
                type="clear" // Este tipo remove o fundo padrão do botão
              />
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


