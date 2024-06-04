import { View, Text, Image, YStack, XStack, ScrollView } from "tamagui";
import { FlatList, StyleSheet, Pressable, Dimensions, } from "react-native";
import bichoIcon from "../../../../assets/macaco.png";
import { useNavigation } from '@react-navigation/native'

import React, { useRef, useEffect } from "react";

const data: { nome: string; url: string; id: number }[] = [
  { nome: "Capybara", url: bichoIcon, id: 1 },
  { nome: "Sairá-7-Cores", url: bichoIcon, id: 2 },
  { nome: "Esquilo", url: bichoIcon, id: 3 },
  { nome: "Tucano", url: bichoIcon, id: 4 },
  { nome: "Calango", url: bichoIcon, id: 5 },
  { nome: "Juqueriquerê", url: bichoIcon, id: 6 },
  { nome: "Caraguatá", url: bichoIcon, id: 7 },
  { nome: "Quaresmeira", url: bichoIcon, id: 8 },
  { nome: "Aranha", url: bichoIcon, id: 9 },
  { nome: "Tatu", url: bichoIcon, id: 10 },
  { nome: "Bicho 11", url: bichoIcon, id: 11 },
  { nome: "Borboleta", url: bichoIcon, id: 12 },
  { nome: "Borboleta", url: bichoIcon, id: 12 },
  { nome: "Borboleta", url: bichoIcon, id: 12 },
  { nome: "Borboleta", url: bichoIcon, id: 12 },
  { nome: "Borboleta", url: bichoIcon, id: 12 },
];
const formatData = (data: any, numColumns: number) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);
  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ nome: `blank-${numberOfElementsLastRow}`, url: "", id: -1, empty: true });
    numberOfElementsLastRow++;

  }
  return data;
}
const numColumns: number = 3;
export default function SeresVivos() {
  const navigation = useNavigation()

  return (
    <View style={{ flex: 1, marginTop: 20 }}>
      <FlatList
        data={formatData(data, numColumns)}
        numColumns={numColumns}
        columnWrapperStyle={{ gap: 30, paddingHorizontal: 30 }}
        contentContainerStyle={{ gap: 10, paddingBottom: 20 }}
        keyExtractor={(item, index) => item.nome + index}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        renderItem={({ item }) => {
          if (item.empty === true) {
            return <View style={[styles.item, styles.itemInvisible]} />;
          }
          return (
            // trocar depois para a coisa certa
            <Pressable style={styles.item} onPress={() => navigation.navigate('aaa', { data })}>
              <YStack w={"100%"} h={"100%"} jc={"center"} ai={"center"} >
                <XStack w={"100%"} flex={2.5} jc={"center"} ai={"center"}>
                  <Text fontSize={"$8"} color={"#000"}>
                    # {item.id}
                  </Text>
                </XStack>
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
                    {item.nome}
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
    width: Dimensions.get("window").width / 3,
    flex: 1,
  },
  itemInvisible: {
    backgroundColor: "transparent",
  }
});
