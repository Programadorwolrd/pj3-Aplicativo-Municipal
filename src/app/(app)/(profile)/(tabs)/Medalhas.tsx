import { View, Text, Image, YStack, ScrollView, XStack } from "tamagui";
import {
  FlatList,
  StyleSheet,
  Pressable,
  Dimensions,

} from "react-native";

import React, { useRef, useEffect } from "react";

const medalha = require("../../../../assets/medalha.png");
const data: { name: string; url: string; titulo: string }[] = [
  { name: "Master", url: medalha, titulo: "Mestre" },
  { name: "Dectetive", url: medalha, titulo: "Detetive" },
  { name: "Caçador", url: medalha, titulo: "Caçador de Recompensas" },
  { name: "Jogador", url: medalha, titulo: "Jogador Profissional" },
  { name: "Top 1", url: medalha, titulo: "Top 1 do Ranking" },
  { name: "Incrivel", url: medalha, titulo: "Incrível Jogador" },
  { name: "Biologo", url: "https://picsum.photos/100/100", titulo: "Biólogo" },
  { name: "Escolhido", url: "https://picsum.photos/100/100", titulo: "O Escolhido" },
  { name: "Sortudo", url: "https://picsum.photos/100/100", titulo: "Sortudo" },
  { name: "Medalha 10", url: "https://picsum.photos/100/100", titulo: "Medalha de Ouro" },
  { name: "Medalha 11", url: "https://picsum.photos/100/100", titulo: "Medalha de Prata" },
  { name: "Medalha 12", url: "https://picsum.photos/100/100", titulo: "Medalha de Bronze" },
  { name: "Medalha 13", url: "https://picsum.photos/100/100", titulo: "Medalha de Honra" },
];
const formatData = (data: any, numColumns: number) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);
  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ name: `blank-${numberOfElementsLastRow}`, url: "", id: -1, empty: true });
    numberOfElementsLastRow++;

  }
  return data;
}
const numColumns: number = 3;
export default function Medalhas() {

  const scrollViewRef = useRef<ScrollView>(null);
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: 100, animated: true });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <View style={{ flex: 1, marginTop: 20 }}>
      <FlatList
        data={formatData(data, numColumns)}
        numColumns={numColumns}
        columnWrapperStyle={{ gap: 30, paddingHorizontal: 30 }}
        contentContainerStyle={{ gap: 10, paddingBottom: 20 }}
        keyExtractor={(item, index) => item.name + index}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        renderItem={({ item }) => {

          if (item.empty === true) {
            return <View style={[styles.item, styles.itemInvisible]} />;
          }
          return (
            <Pressable style={styles.item}>
              <YStack w={"100%"} h={"100%"} jc={"center"} ai={"center"}>
                <ScrollView horizontal
                  showsHorizontalScrollIndicator={false} w={"100%"} flex={3} jc={"center"} ai={"center"}>
                  <Text fontSize={"$8"} color={"#000"}>
                    {item.name}
                  </Text>
                </ScrollView>
                <Image
                  flex={10}
                  source={{
                    width: 100,
                    height: 100,
                    uri: item.url,
                  }}
                  w={"100%"}
                  h={"80%"}
                />
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  borderBottomColor={"#329F60"}
                  borderBottomStartRadius={"$3"}
                  borderBottomEndRadius={"$3"}
                  borderBottomWidth={"$1"}
                  w={"100%"}
                  jc={"center"}
                  ai={"center"}
                  pb={"$1.5"}
                  flex={2.5}
                // scrollEnabled={false}
                >
                  <Text fontSize={"$6"} color={"#000"}>
                    {item.titulo}
                  </Text>
                </ScrollView>
              </YStack>
            </Pressable>

          );
        }}
      />
    </View>
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
    height: Dimensions.get("window").height / 5 - 12,
    width: Dimensions.get("window").width / 3 - 4,
    flex: 1,
  },
  itemInvisible: {
    backgroundColor: "transparent",
  }
});

