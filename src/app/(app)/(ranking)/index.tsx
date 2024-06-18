import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Modal,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import MedalIcon from "@/assets/medal-1.svg";
import { useGetUserRank } from "@/lib/querys";
import { Avatar, Spinner, Text, View } from "tamagui";

interface ItemProps {
  item: Rank;
  index: number;
}
function Itens({ item, index }: ItemProps) {
  return (
    <View>
      <View style={styles.hr} />
      <View style={styles.itemContainer}>
        <View style={styles.userInfoContainer}>
          <Avatar circular size={"$4.5"}>
            <Avatar.Image
              accessibilityLabel="avatar"
              src={item.foto || require("@/assets/fotoPadrao.jpg")}
            />
            <Avatar.Fallback backgroundColor="$blue10" />
          </Avatar>
          <View style={styles.textContainer}>
            <Text style={styles.userName}>{item.apelido}</Text>
            <Text
              fontSize={"$2"}
              mt={"$1.5"}
              fontWeight={"$4"}
            >{`LIDOS: ${item.qrCodeUnicosLidos}`}</Text>
          </View>
        </View>
        <View style={styles.rankContainer}>
          <Text fontFamily={"$outfitBold"} fontSize={20} marginEnd={10}>
            {index + 1}
          </Text>
          {index < 3 && (
            <MedalIcon width={30} height={30} style={{ alignSelf: "center" }} />
          )}
        </View>
      </View>
    </View>
  );
}

export default function Lista() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const { data, isLoading, error } = useGetUserRank();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Spinner size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return <Text>Erro ao carregar dados</Text>;
  }

  if (!data) return <Text>Erro ao carregar dados</Text>;

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

      <View style={styles.header}>
        <View>
          <Image
            source={require("../../../assets/medalha-prata.png")}
            style={styles.medalhas}
          />
          <Text style={{ textAlign: "center" }}>
            {data.data.rank[1]?.apelido}
          </Text>
        </View>

        <View>
          <Image
            source={require("../../../assets/medalha-ouro.png")}
            style={styles.medalha}
          />
          <Text style={{ textAlign: "center" }}>
            {data.data.rank[0]?.apelido}
          </Text>
        </View>
        <View>
          <Image
            source={require("../../../assets/medalha-bronze.png")}
            style={styles.medalhas}
          />
          <Text style={{ textAlign: "center" }}>
            {data.data.rank[2]?.apelido}
          </Text>
        </View>
      </View>

      <FlatList
        data={data.data.rank}
        renderItem={({ item, index }) => <Itens item={item} index={index} />}
        keyExtractor={(item) => item.id.toString()}
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
    width: "100%",
    alignSelf: "center",
  },
  medalha: {
    marginTop: -30,
    width: 120,
    height: 150,
  },
  medalhas: {
    marginTop: 40,
    width: 100,
    height: 100,
  },
  list: {
    paddingBottom: 20, // Adiciona um espaço no final da lista
  },
});
