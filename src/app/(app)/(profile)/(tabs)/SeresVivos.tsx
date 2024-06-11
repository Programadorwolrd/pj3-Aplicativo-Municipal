import { View, Text, Image, YStack, XStack, ScrollView, Card } from "tamagui";
import { FlatList, StyleSheet, Pressable, Dimensions } from "react-native";
import bichoIcon from "../../../../assets/macaco.png";
import { useNavigation } from "@react-navigation/native";
import { Link, router } from "expo-router";
import type { CardProps } from "tamagui";

import React, { useRef, useEffect } from "react";
import useApi from "@/lib/useApi";
import { getFiles } from "@/lib/useAxios";
import axios from "axios";
import { CardDemo } from "../Test";

// Interfaces
interface Catalogo {
  uuid: string;
  id: number;
  nomePopular: string;
  nomeCientifico: string;
  foto: string;
}

interface LidoPeloUser extends Catalogo {
  empty?: boolean;
}

interface PropsUser {
  id: string;
  apelido: string;
  foto: string;
  lidoPeloUser: LidoPeloUser[];
  ranking: number;
}

// Função para formatar os dados e entregar um quadrado vazio caso não tenha um bicho

const formatData = (data: LidoPeloUser[], numColumns: number = 3) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);
  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({
      uuid: `blank-${numberOfElementsLastRow}`,
      id: -1,
      nomePopular: "",
      nomeCientifico: "",
      foto: "",
      empty: true,
    });
    numberOfElementsLastRow++;
  }
  return data;
};

export default function SeresVivos() {
  const navigation = useNavigation();

  // Retorno de dados do user
  const user = useApi("query", (axios) => {
    return {
      queryKey: ["user"],
      queryFn: () => {
        return axios.get("/usuario");
      },
    };
  });

  console.log(user.data?.data.usuario, "user");

  const data: PropsUser = {
    id: user.data?.data.usuario.id || "",
    apelido: user.data?.data.usuario.apelido || "",
    foto: user.data?.data.usuario.foto || "",
    lidoPeloUser:
      user.data?.data.usuario.lidoPeloUser.map((item: any) => ({
        uuid: item.catalogo_uuid || "",
        id: item.catalogo.uuid || "",
        nomePopular: item.catalogo.nomePopular || "",
        nomeCientifico: item.catalogo.nomeCientifico || "",
        foto: item.catalogo.ftModel || "",
      })) || [],
    ranking: 3,
  };

  console.log(data, "data user");
  const numColumns: number = 3;
  return (
    <View style={{ flex: 1, marginTop: 20 }}>
      <FlatList
        data={formatData(data.lidoPeloUser, numColumns)}
        numColumns={numColumns}
        columnWrapperStyle={{ gap: 30, paddingHorizontal: 30 }}
        contentContainerStyle={{ gap: 10, paddingBottom: 20 }}
        keyExtractor={(item, index) => item.uuid + index}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        renderItem={({ item }) => {
          if (item.empty) {
            return <View style={[styles.item, styles.itemInvisible]} />;
          }
          return (
            <Pressable
              style={styles.item}
              onPress={() => router.navigate(`(app)/(home)/${item.id}`)}
            >
              <DemoCard
                animation="bouncy"
                mb={"$3"}
                hoverStyle={{ scale: 0.925 }}
                pressStyle={{ scale: 0.875 }}
                item={item}
              />
            </Pressable>
          );
        }}
      />
    </View>
  );
}

function DemoCard(props: CardProps & { item: LidoPeloUser }) {
  const { item } = props;
  return (
    <Card
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
        {/* 
        ///
         Solução provisoria de exibição de nome
        ///
        */}
        <Text
          fontSize={"$8"}
          color={"#000"}
          maxWidth={100}
          maxHeight={25}
          overflow="scroll"
        >
          {item.nomeCientifico}
        </Text>
      </Card.Header>
      <View>
        <Image
          resizeMode="contain"
          alignSelf="center"
          source={{
            width: 100,
            height: 100,
            uri: getFiles(item.foto),
          }}
        />
      </View>
      <Card.Footer p={"$2.5"}>
        {/* <XStack justifyContent={"center"} alignItems={"center"} > */}
        {/* 
        ///
         Solução provisoria de exibição de nome
        ///
        */}
        <Text
          fontSize={"$6"}
          color={"#000"}
          textAlign={"center"}
          maxWidth={100}
          maxHeight={25}
          overflow="scroll"
        >
          {item.nomePopular}
        </Text>
        {/* </XStack> */}
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
    height: Dimensions.get("window").height / 4 - 6,
    width: Dimensions.get("window").width / 3,
    flex: 1,
  },
  itemInvisible: {
    backgroundColor: "transparent",
  },
});
