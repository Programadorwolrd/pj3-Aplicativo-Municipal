import React, { useEffect, useState } from "react";
import { View, Image, Card, Text } from "tamagui";
import {
  FlatList,
  StyleSheet,
  Pressable,
  Dimensions,
  RefreshControl,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import type { CardProps } from "tamagui";
import { getFiles } from "@/lib/useAxios";
import { useGetUser } from "@/lib/querys";
import Loading from "@/components/loading";
import { router } from "expo-router";

// Interfaces
interface Catalogo {
  uuid: string;
  id: number;
  medalha: string;
}

interface LidoPeloUser extends Catalogo {
  empty?: boolean;
}

interface PropsUser {
  id: string;
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
      medalha: "",
      empty: true,
    });
    numberOfElementsLastRow++;
  }
  return data;
};

export default function Medalhas() {
  const [atualizar, setAtualizar] = useState(false);
  const [dataUser, setDataUser] = useState<PropsUser>({
    id: "",
    lidoPeloUser: [],
    ranking: 3,
  });
  const userApi = useGetUser();
  if (userApi.isLoading) return <Loading />;
  if (userApi.data?.data.usuario.lidoPeloUser.length === 0)
    return (
      <View flex={1} jc={"center"} ai={"center"} margin={"$true"}>
        <Text textAlign="center" fontSize={"$7"}>
          Nenhuma Medalha encontrada, Leia Qr Codes para Ganhar Medalhas
        </Text>
        <TouchableOpacity
          onPress={() => router.navigate("/(app)/(qrCode)")}
          style={{ flexDirection: "row", marginTop: 10 }}
        >
          <Text textAlign="center" fontSize={"$7"} color={"green"}>
            Ler Qr Codes
          </Text>
        </TouchableOpacity>
      </View>
    );
  useEffect(() => {
    if (userApi.data) {
      const userData = userApi.data.data.usuario;
      const formattedData: PropsUser = {
        id: userData.id || "",

        lidoPeloUser:
          userData.lidoPeloUser.map((item: any) => ({
            uuid: item.catalogo_uuid || "",
            id: item.catalogo.uuid || "",
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
            <Pressable style={styles.item}>
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
      borderBottomColor={"$yellow8Light"}
      borderBottomStartRadius={"$3"}
      borderBottomEndRadius={"$3"}
      borderBottomWidth={"$1"}
      backgroundColor={"$white025"}
      justifyContent={"center"}
      alignItems={"center"}
      padding={"$1.5"}
      mt={"$1"}
      {...props}
    >
      <View>
        <Image
          mb={"$1"}
          resizeMode="contain"
          alignSelf="center"
          source={{
            width: isVerySmallScreen ? 50 : isSmallScreen ? 70 : 110,
            height: isVerySmallScreen ? 50 : isSmallScreen ? 70 : 110,
            uri: getFiles(item.medalha),
          }}
        />
      </View>
      <Card.Footer mt={"$1"} paddingHorizontal={"$2.5"}></Card.Footer>
    </Card>
  );
}

const styles = StyleSheet.create({
  item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: Dimensions.get("window").height / 5 - 6,
    width: Dimensions.get("window").width / 3,
    flex: 1,
  },
  itemInvisible: {
    backgroundColor: "transparent",
  },
});
