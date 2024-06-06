import React from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { ButtonCustom } from "@/components/buttonCustom";
import { storeAuth } from "@/lib/logicAuth";
import useApi from "@/lib/useApi";
import { YStack, Image, Text, XStack } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import AvatarProfile from "./Avatar";
import ProfileData from "./ProfileData";
import Tabs from "./(tabs)";
import axios from "axios";

const backProfile = require("../../../assets/background-perfil.png");

interface PropsUser {
  apelido: string;
  foto: string,
  lidopelouser: {
    catalogo: {
      uuid: string,
      nomePopular: string
    }
  },
  ranking: number;
}


export default function Profile() {
  // botão de logout e delete de conta

  // const loggout = storeAuth((s) => s.logout);

  // const { data, refetch } = useApi("query", (axios) => ({
  //   queryKey: ["getMyProfile"],
  //   queryFn() {
  //     return axios.get("/usuario");
  //   },
  // }));

  // const { mutate } = useApi("mutate", (axios) => ({
  //   mutationFn() {
  //     return axios.delete("/usuario");
  //   },
  // }));
  const user = useApi("query", (axios) => {
    return {
      queryKey: ['xabulha'],
      queryFn: () => {
        return axios.get('/usuario')

      }
    }
  })
  console.log(user.data?.data.usuario, 'user');

  const dataUser: PropsUser = {
    apelido: user.data?.data.usuario.apelido,
    foto: user.data?.data.usuario.foto,
    lidopelouser: {
      // catalogo: {
      //   uuid: user.data?.data.usuario.catalogo.uuid,
      //   nomePopular: user.data?.data.usuariocatalogo.nomePopular
      // }
    },
    ranking: 3
  }
  console.log(dataUser, 'data user')

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
              mt={"$5"}
              color={"$white2"}
            >
              Perfil
            </Text>

          </XStack>
          <ProfileData nome={dataUser.apelido} ranking={dataUser.ranking} />
          <AvatarProfile img={dataUser.foto} />
        </YStack>
        <Tabs />

        {/* componente do botão de logout e delete de conta */}

        {/* <View>
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
      </View> */}
      </YStack>
    </SafeAreaView>

  );
}
