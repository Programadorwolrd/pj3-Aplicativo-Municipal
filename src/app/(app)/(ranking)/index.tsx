import React, { useState, useEffect } from "react";
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
import useApi from "@/lib/useApi"; // Importe seu hook personalizado

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
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [modalVisible, setModalVisible] = useState(false); // Declaração do estado modalVisible
  const { data, isLoading, error, refetch } = useApi("query", (axios) => ({
    queryKey: ["getRanking"],
    queryFn: () => axios.get("/rank"),
  }));

  useEffect(() => {
    if (data) {
      setUsuarios(data.rank);
    }
  }, [data]);

  if (isLoading) {
    return <Text>Carregando...</Text>;
  }

  if (error) {
    return <Text>Erro ao carregar dados</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, marginBottom: 25 }}>
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
                  <Text
                    style={{ color: "black", fontSize: 16, marginBottom: 10 }}
                  >
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

        <View style={{ position: "absolute", top: 10, right: 10 }}>
          <TouchableHighlight
            onPress={() => {
              setModalVisible(true);
            }}
            style={{
              backgroundColor: "#329F60",
              padding: 5,
              borderRadius: 50,
              width: 35,
              height: 35,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>?</Text>
          </TouchableHighlight>
        </View>
      </View>

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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
