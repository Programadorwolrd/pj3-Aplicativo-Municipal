import React, { useState } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";
import { Text } from "tamagui";

const NomeCompletoScreen: React.FC = () => {
  const [nome, setNome] = useState<string>("");

  const handleNomeChange = (text: string) => {
    setNome(text);
  };

  const handleConfirmar = () => {
    console.log("Nome completo:", nome);
  };

  return (
    <View style={styles.container}>
      <Text fontSize={"$2"} color="green" marginLeft="2%" mb="$1.5" fontFamily={"$outfitBold"}>
        DIGITE O SEU NOME COMPLETO
      </Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          value={nome}
          onChangeText={handleNomeChange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  inputWrapper: {
    flexDirection: "row",
    backgroundColor: "#e8f5e9",
    borderWidth: 1.7,
    borderColor: "#43a047",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  input: {
    fontSize: 16,
    color: "#333",
  },
});

export default NomeCompletoScreen;
