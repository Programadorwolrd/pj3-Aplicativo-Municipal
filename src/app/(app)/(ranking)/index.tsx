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
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Como funciona o ranking?</Text>
                <Text style={styles.modalText}>
                A posição no ranking é definida pela quantidade de QrCodes escaneados. Escaneie o maior número possível para alcançar uma boa colocação!
                </Text>
                <TouchableHighlight
                  onPress={() => setModalVisible(!modalVisible)}
                  style={styles.modalCloseButton}
                >
                  <Text style={styles.modalCloseButtonText}>Fechar</Text>
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
        <TouchableHighlight
          onPress={() => setModalVisible(true)}
          style={styles.infoButton}
        >
          <Text style={styles.infoButtonText}>?</Text>
        </TouchableHighlight>
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
    position: "relative",
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
  infoButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#329F60",
    padding: 10,
    borderRadius: 20,
  },
  infoButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    color: "black",
    fontSize: 16,
    marginBottom: 10,
  },
  modalCloseButton: {
    backgroundColor: "#329F60",
    padding: 10,
    marginTop: 30,
    borderRadius: 10,
    width: "30%",
    alignItems: "center",
  },
  modalCloseButtonText: {
    color: "white",
    fontSize: 18,
  },
});
