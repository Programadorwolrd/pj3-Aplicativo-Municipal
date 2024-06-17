import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import MedalIcon from "@/assets/medal-1.svg";
import { useGetUserRank } from "@/lib/querys";

interface User {
  id: string;
  apelido: string;
  foto: string;
  ranking: number;
}

function Itens({ item, index }: { item: User; index: number }) {
  return (
    <View>
      <View style={styles.hr} />
      <View style={styles.itemContainer}>
        <View style={styles.userInfoContainer}>
          <Image source={{ uri: item.foto }} style={styles.userImage} />
          <View style={styles.textContainer}>
            <Text style={styles.userName}>{item.apelido}</Text>
            <Text>{`Ranking: ${item.ranking}`}</Text>
          </View>
        </View>
        <View style={styles.rankContainer}>
          {index < 3 && (
            <View style={styles.medalContainer}>
              <Text style={styles.rankTextAbove}>{index + 1}</Text>
              <MedalIcon width={30} height={30} />
            </View>
          )}
          {index >= 3 && <Text style={styles.rankText}>{index + 1}</Text>}
        </View>
      </View>
    </View>
  );
}

export default function Lista() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const { data, isLoading, error } = useGetUserRank();

  if (isLoading) {
    return <Text>Carregando...</Text>;
  }

  if (error) {
    return <Text>Erro ao carregar dados</Text>;
  }

  // Acessa a propriedade correta da resposta da API e garante o tipo User[]
  const usuarios = Array.isArray(data?.data.rank) ? (data.data.rank as User[]) : [];

  return (
    <View style={{ flex: 1 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <TouchableWithoutFeedback>
              <View
                style={{
                  backgroundColor: "white",
                  padding: 20,
                  margin: 20,
                  borderRadius: 10,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontSize: 18,
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                >
                  Como funciona o ranking?
                </Text>
                <Text style={{ color: "black", fontSize: 16, marginBottom: 10 }}>
                  A posição no ranking é definida pela velocidade levada para
                  ler todos os QrCodes espalhados pelo parque
                </Text>

                <TouchableHighlight
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                  style={{
                    backgroundColor: "#329F60",
                    padding: 10,
                    marginTop: 30,
                    borderRadius: 10,
                    position: "absolute",
                    bottom: -20,
                    width: "30%",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 18 }}>Fechar</Text>
                </TouchableHighlight>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <View style={styles.header}>
        <Image
          source={require("../../../assets/medalha-prata.png")}
          style={styles.medalhas}
        />
        <Image
          source={require("../../../assets/medalha-ouro.png")}
          style={styles.medalha}
        />
        <Image
          source={require("../../../assets/medalha-bronze.png")}
          style={styles.medalhas}
        />
      </View>

      <FlatList
        data={usuarios}
        renderItem={({ item, index }) => <Itens item={item} index={index} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    marginLeft: 10,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 20,
  },
  rankContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  medalContainer: {
    alignItems: "center",
  },
  rankTextAbove: {
    position: "absolute",
    top: -17,
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
  rankText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  header: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 10,
  },
  hr: {
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: 1,
    width: 310,
    alignSelf: "center",
  },
  medalha: {
    marginTop: -20,
    width: 130,
    height: 160,
  },
  medalhas: {
    marginTop: 25,
    marginBottom: 30,
    width: 120,
    height: 120,
  },
  list: {
    paddingBottom: 20, // Adiciona um espaço no final da lista
  },
});
