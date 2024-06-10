import { View, Text, Image, YStack, XStack, ScrollView, Card } from "tamagui";
import { FlatList, StyleSheet, Pressable, Dimensions } from "react-native";
import bichoIcon from "../../../../assets/macaco.png";
import { useNavigation } from "@react-navigation/native";

import type { CardProps } from "tamagui";

import React, { useRef, useEffect } from "react";
import useApi from "@/lib/useApi";
import axios from "axios";
import { CardDemo } from "../Test";

const data: { nome: string; url: string; id: number }[] = [
  {
    nome: "Capybara",
    url: "https://e7.pngegg.com/pngimages/716/242/png-clipart-monkey-monkey.png",
    id: 1,
  },
  {
    nome: "Sairá-7-Cores",
    url: "https://e7.pngegg.com/pngimages/716/242/png-clipart-monkey-monkey.png",
    id: 2,
  },
  {
    nome: "Esquilo",
    url: "https://e7.pngegg.com/pngimages/716/242/png-clipart-monkey-monkey.png",
    id: 3,
  },
  { nome: "Tucano", url: bichoIcon, id: 4 },
  {
    nome: "Calango",
    url: "https://e7.pngegg.com/pngimages/716/242/png-clipart-monkey-monkey.png",
    id: 5,
  },
  { nome: "Juqueriquerê", url: bichoIcon, id: 6 },
  {
    nome: "Caraguatá",
    url: "https://e7.pngegg.com/pngimages/716/242/png-clipart-monkey-monkey.png",
    id: 7,
  },
  { nome: "Quaresmeira", url: bichoIcon, id: 8 },
  {
    nome: "Aranha",
    url: "https://e7.pngegg.com/pngimages/716/242/png-clipart-monkey-monkey.png",
    id: 9,
  },
  { nome: "Tatu", url: bichoIcon, id: 10 },
  { nome: "Bicho 11", url: "https://picsum.photos/100/100", id: 11 },
  { nome: "Borboleta", url: bichoIcon, id: 12 },
  { nome: "Borboleta", url: bichoIcon, id: 13 },
  { nome: "Borboleta", url: bichoIcon, id: 14 },
  { nome: "Borboleta", url: bichoIcon, id: 15 },
  { nome: "Borboleta", url: bichoIcon, id: 16 },
];

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

const formatData = (data: any, numColumns: number) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);
  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({
      nome: `blank-${numberOfElementsLastRow}`,
      url: "",
      id: -1,
      empty: true,
    });
    numberOfElementsLastRow++;
  }
  return data;
};
const numColumns: number = 3;
export default function SeresVivos() {
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
      catalogo: {
        uuid: user.data?.data?.usuario?.catalogo?.uuid,
        nomePopular: user.data?.data?.usuariocatalogo?.nomePopular
      }
    },
    ranking: 3
  }
  console.log(dataUser, 'data user')

  return (
    <View style={{ flex: 1, marginTop: 20 }}>
      <FlatList
        data={formatData(data, numColumns)}
        numColumns={numColumns}
        columnWrapperStyle={{ gap: 15, paddingHorizontal: 15 }}
        contentContainerStyle={{ gap: 5, paddingBottom: 10 }}
        keyExtractor={(item, index) => item.nome + index}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        renderItem={({ item }) => {
          if (item.empty === true) {
            return <View style={[styles.item, styles.itemInvisible]} />;
          }
          return (
            <Pressable
              style={styles.item}
              onPress={() => navigation.navigate("", { data })}
            >
              <DemoCard

                // style={{
                //   height: Dimensions.get("window").height / 4 - 12,
                //   width: Dimensions.get("window").width / 3 - 12,
                // }}
                animation="bouncy"
                mb={"$3"}
                hoverStyle={{ scale: 0.925 }}
                pressStyle={{ scale: 0.875 }}
              />
            </Pressable>
            // trocar depois para a coisa certa
            // <Pressable style={styles.item} onPress={() => navigation.navigate('aaa', { data })}>
            //   <YStack w={"100%"} h={"100%"} jc={"center"} ai={"center"} >
            //     <XStack w={"100%"} flex={2.5} jc={"center"} ai={"center"}>
            //       <Text fontSize={"$8"} color={"#000"}>
            //         # {item.id}
            //       </Text>
            //     </XStack>
            //     <Image
            //       flex={10}
            //       source={{
            //         width: 100,
            //         height: 100,
            //         uri: item.url,
            //       }}
            //       w={"100%"}
            //       h={"80%"}
            //     />
            //     <XStack w={"100%"}
            //       flex={2.5} borderBottomColor={"#329F60"}
            //       borderBottomStartRadius={"$3"}
            //       borderBottomEndRadius={"$3"}
            //       borderBottomWidth={"$1"} ai={"center"} justifyContent={"center"}>
            //       <ScrollView
            //         horizontal
            //         showsHorizontalScrollIndicator={false}
            //         w={"100%"}

            //       // scrollEnabled={false}
            //       >
            //         <Text fontSize={"$6"} color={"#000"} textAlign={"center"}>
            //           {item.nome}
            //         </Text>
            //       </ScrollView>
            //     </XStack>
            //   </YStack>
            // </Pressable>
          );
        }}
      />
    </View>
  )
}
function DemoCard(props: CardProps) {
  const item = {
    nome: "Capybara",
    url: "https://e7.pngegg.com/pngimages/716/242/png-clipart-monkey-monkey.png",
    id: 1,
  };
  return (
    <Card
      // bordered
      borderBottomColor={"#329F60"}
      borderBottomStartRadius={"$3"}
      borderBottomEndRadius={"$3"}
      borderBottomWidth={"$1"}
      backgroundColor={"$colorTransparent"}
      justifyContent={"center"}
      alignItems={"center"}
      {...props}
    >
      <Card.Header padded justifyContent={"center"} alignItems={"center"}>
        <Text fontSize={"$8"} color={"#000"}>
          # {item.id}
          {/* substituir por uuid do bicho */}
        </Text>
      </Card.Header>
      <View >
        <Image
          resizeMode="contain"
          alignSelf="center"
          source={{
            width: 100,
            height: 100,
            // uri: item.url,
            uri: item.url,
            /* substituir por uri do bicho */
          }}
        />
      </View>
      <Card.Footer p={"$2.5"}>
        <XStack justifyContent={"center"} alignItems={"center"} />
        <Text fontSize={"$6"} color={"#000"} textAlign={"center"}>
          {item.nome}
        </Text>
      </Card.Footer>

    </Card>
  );
}

const styles = StyleSheet.create({
  item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // backgroundColor: "#e6e6e6",
    // height: 150,
    // width: 100,
    height: Dimensions.get("window").height / 4 - 12,
    width: Dimensions.get("window").width / 3,
    flex: 1,
  },
  itemInvisible: {
    backgroundColor: "transparent",
  },
});
