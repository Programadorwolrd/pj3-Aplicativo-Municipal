import React, { useState } from "react";
import { View, Text, FlatList, Image } from "react-native";
import CardCategoriaSeres from "@/components/cardCategoriaSeres";
import CardSeres from "@/components/CardSeres";
import { useGetUser } from "@/lib/querys";

export default function HomePage() {
  const response = useGetUser();
  const [selectedCategory, setSelectedCategory] = useState(null);

  if (response.isLoading) return <Text>Carregando...</Text>;
  if (response.isError) return <Text>Erro ao carregar</Text>;
  if (!response.data) return null;

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

    console.log(seres);

    

  return (
    <View style={{ backgroundColor: "#fff" }}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 25,
          marginStart: 30,
          marginTop: 25,
        }}
      >
        Hello, {data.apelido} 🌿
      </Text>
      <Text
        style={{
          fontWeight: "300",
          marginStart: 25,
          marginTop: 10,
          fontSize: 22,
        }}
      >
        Seja Bem Vindo ao Parque
      </Text>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 15,
          marginStart: 23,
          marginEnd: 25,
        }}
      >
        <Image
          style={{
            width: "95%",
          }}
          source={require("../../../assets/home-banner1.png")}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",
          marginStart: 30,
          marginEnd: 40,
          marginTop: 30,
        }}
      >
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 25,
            }}
          >
            Descubra novos seres
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image source={require("../../../assets/flecha-verde.png")} />
        </View>
      </View>
      <FlatList
  style={{
    marginStart: 25,
    marginEnd: 30,
    marginTop: 20,
  }}
  ItemSeparatorComponent={() => <View style={{ padding: 3 }} />}
  horizontal={true}
  data={especies}
  renderItem={({ item }) => (
    <CardCategoriaSeres
      title={item}
      onPress={() => setSelectedCategory(item)}
    />
  )}
  keyExtractor={(item) => item}
/>
      <FlatList
        style={{
          marginStart: 25,
          marginEnd: 30,
          gap: 10,
          paddingBottom: 50,
        }}
        ItemSeparatorComponent={() => <View style={{ padding: 5 }} />}
        horizontal={true}
        data={filteredSeres}
        keyExtractor={(item) => item.uuid}
        renderItem={({ item }) => (
          <CardSeres
          isRead= {item.isRead}
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
