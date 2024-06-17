import { View, Text, Image, XStack, Card } from "tamagui";
import {
  FlatList,
  StyleSheet,
  Pressable,
  Dimensions,
  RefreshControl,
  useWindowDimensions,
} from "react-native";

import { router } from "expo-router";
import type { CardProps } from "tamagui";
import React, { useEffect, useState } from "react";
import useApi from "@/lib/useApi";
import { getFiles } from "@/lib/useAxios";
import { useGetUser } from "@/lib/querys";

// Interfaces
interface Catalogo {
  uuid: string;
  id: number;
  nomePopular: string;
  nomeCientifico: string;
  fotoBicho: string;
  medalha: string;
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
      fotoBicho: "",
      medalha: "",
      empty: true,
    });
    numberOfElementsLastRow++;
  }
  return data;
};

export default function SeresVivos() {
  const [atualizar, setAtualizar] = useState(false);
  const [dataUser, setDataUser] = useState<PropsUser>({
    id: "",
    apelido: "",
    foto: "",
    lidoPeloUser: [],
    ranking: 3,
  });

  const userApi = useGetUser();

  useEffect(() => {
    if (userApi.data) {
      const userData = userApi.data.data.usuario;
      const formattedData: PropsUser = {
        id: userData.id || "",
        apelido: userData.apelido || "",
        foto: userData.foto || "",
        lidoPeloUser:
          userData.lidoPeloUser.map((item: any) => ({
            uuid: item.catalogo_uuid || "",
            id: item.catalogo.uuid || "",
            nomePopular: item.catalogo.nomePopular || "",
            nomeCientifico: item.catalogo.nomeCientifico || "",
            fotoBicho: item.catalogo.ftModel || "",
            medalha: item.catalogo.medalha || "",
          })) || [],
        ranking: 3,
      };
      setDataUser(formattedData);
    }
  }, [userApi.data]);

  const onRefresh = () => {
    setAtualizar(true);
    userApi.refetch().finally(() => {
      setAtualizar(false);
    });
  };

  return (
    <View style={{ flex: 1, marginTop: 1 }}>
      <FlatList
        data={formatData(dataUser.lidoPeloUser, 3)}
        numColumns={3}
        columnWrapperStyle={{ gap: 30, paddingHorizontal: 30 }}
        contentContainerStyle={{ gap: 1, paddingBottom: 20 }}
        keyExtractor={(item, index) => item.uuid + index}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        refreshControl={
          <RefreshControl refreshing={atualizar} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => {
          if (item.empty) {
            return <View style={[styles.item, styles.itemInvisible]} />;
          }
          return (
            <Pressable
              style={styles.item}
              onPress={() => {
                router.navigate(`(app)/(home)/${item.id}`);
              }}
            >
              <DemoCard
                animation="bouncy"
                mb={"$1"}
                hoverStyle={{ scale: 0.955 }}
                pressStyle={{ scale: 0.925 }}
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
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 390;
  const isVerySmallScreen = width < 300;
  const { item } = props;

  return (
    <Card
      bordered
      borderBottomColor={"#329F60"}
      borderBottomStartRadius={"$3"}
      borderBottomEndRadius={"$3"}
      borderBottomWidth={"$1"}
      backgroundColor={"$white025"}
      justifyContent={"center"}
      alignItems={"center"}
      paddingTop={"$2.5"}
      mt={"$1"}
      {...props}
    >
      <View>
        <Pressable
          onPress={() => {
            router.navigate(`(app)/(home)/${item.id}`);
          }}
        >
          <Image
            resizeMode="contain"
            alignSelf="center"
            source={{
              width: isVerySmallScreen ? 50 : isSmallScreen ? 70 : 100,
              height: isVerySmallScreen ? 50 : isSmallScreen ? 70 : 100,

              uri: getFiles(item.fotoBicho),
            }}
          />
        </Pressable>
      </View>
      <Card.Footer mt={"$1"} paddingHorizontal={"$2.5"}>
        <Pressable
          onPress={() => {
            router.navigate(`(app)/(home)/${item.id}`);
          }}
        >
          <XStack
            style={{ width: isVerySmallScreen ? 50 : isSmallScreen ? 70 : 100 }}
            justifyContent={"center"}
            alignItems={"center"}
            alignSelf="center"
            h={50}
          >
            <Text
              fontSize={"$5"}
              color={"#000"}
              textAlign={"center"}
              numberOfLines={2}
              overflow="scroll"
            >
              {item.nomePopular}
            </Text>
          </XStack>
        </Pressable>
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
