import React, { useState } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import CardCategoriaSeres from "@/components/cardCategoriaSeres";
import CardSeres from "@/components/CardSeres";
import { useGetUser } from "@/lib/querys";
import Loading from "@/components/loading";

export default function HomePage() {
  const response = useGetUser();
  const [selectedCategory, setSelectedCategory] = useState<null | string>(null);

  if (response.isLoading) return <Loading />;

  if (!response.data) {
    return <Text>Erro ao carregar dados</Text>;
  }

  const data = response.data.data.usuario;

  const especies = ["Todos os Seres"].concat(
    data.catalogoNLido
      .map((item) => item.especie)
      .concat(data.lidoPeloUser.map((item) => item.catalogo.especie))
      .filter((item, index, array) => array.indexOf(item) === index)
  );

  const seres = data.lidoPeloUser
    .map(({ catalogo }) => ({ ...catalogo, isRead: true }))
    .concat(data.catalogoNLido.map((item) => ({ ...item, isRead: false })));

  const filteredSeres = selectedCategory
    ? selectedCategory === "Todos os Seres"
      ? seres
      : seres.filter((ser) => ser.especie === selectedCategory)
    : seres;

  return (
    <View style={{ backgroundColor: "#fff" }}>
      <Text style={styles.headerText}>
        Hello, {data.apelido} 🌿
      </Text>
      <Text style={styles.subHeaderText}>
        Seja Bem Vindo ao Parque
      </Text>

      <View style={styles.bannerContainer}>
        <Image
          style={styles.bannerImage}
          source={require("../../../assets/home-banner1.png")}
        />
      </View>
      <View style={styles.discoverContainer}>
        <Text style={styles.discoverText}>
          Descubra novos seres
        </Text>
        <Image source={require("../../../assets/flecha-verde.png")} />
      </View>
      <FlatList
        style={styles.categoryList}
        ItemSeparatorComponent={() => <View style={{ padding: 3 }} />}
        horizontal={true}
        data={especies}
        renderItem={({ item }) => (
          <CardCategoriaSeres
            title={item}
            onPress={() => setSelectedCategory(item)}
            isSelected={item === selectedCategory}
          />
        )}
        keyExtractor={(item) => item}
      />
      <FlatList
        style={styles.seresList}
        ItemSeparatorComponent={() => <View style={{ padding: 5 }} />}
        horizontal={true}
        data={filteredSeres}
        keyExtractor={(item) => item.uuid}
        renderItem={({ item }) => (
          <CardSeres
            isRead={item.isRead}
            nome={item.nomePopular}
            categoria={item.especie}
            photo={item.ftModel}
            uuid={item.uuid}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontWeight: "bold",
    fontSize: 25,
    marginStart: 30,
    marginTop: 25,
  },
  subHeaderText: {
    fontWeight: "300",
    marginStart: 25,
    marginTop: 10,
    fontSize: 22,
  },
  bannerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginStart: 23,
    marginEnd: 25,
  },
  bannerImage: {
    width: "95%",
  },
  discoverContainer: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    marginStart: 30,
    marginEnd: 40,
    marginTop: 30,
  },
  discoverText: {
    fontWeight: "bold",
    fontSize: 25,
  },
  categoryList: {
    marginStart: 25,
    marginEnd: 30,
    marginTop: 20,
  },
  seresList: {
    marginStart: 25,
    marginEnd: 30,
    gap: 10,
    paddingBottom: 50,
  },
});
