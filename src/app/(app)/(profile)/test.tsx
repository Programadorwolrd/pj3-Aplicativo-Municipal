import React, { useEffect, useState } from "react";
import { View,  Button, StyleSheet } from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { Text } from "tamagui";

interface Estado {
  id: number;
  sigla: string;
  nome: string;
}

interface Cidade {
  id: number;
  nome: string;
}

const EstadoScreen: React.FC = () => {
  const [estados, setEstados] = useState<Estado[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState<string>("");
  const [cidadeSelecionada, setCidadeSelecionada] = useState<string>("");

  useEffect(() => {
    axios
      .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((response) => setEstados(response.data))
      .catch((error) => console.error("Erro ao buscar os estados:", error));
  }, []);

  useEffect(() => {
    if (estadoSelecionado) {
      axios
        .get(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`
        )
        .then((response) => setCidades(response.data))
        .catch((error) => console.error("Erro ao buscar as cidades:", error));
    }
  }, [estadoSelecionado]);

  const handleAvancar = () => {
    console.log("Estado selecionado:", estadoSelecionado);
    console.log("Cidade selecionada:", cidadeSelecionada);
  };

  return (
    <View style={styles.container}>
      <Text fontSize={"$2"} color="green" style={{marginTop:16}} mb="$1.5" marginLeft="2%" fontFamily={"$outfitBold"}>
        ESCOLHA O SEU ESTADO
      </Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={estadoSelecionado}
          onValueChange={(itemValue) => setEstadoSelecionado(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Estado..." value="" />
          {estados.map((estado) => (
            <Picker.Item
              key={estado.id}
              label={estado.nome}
              value={estado.sigla}
            />
          ))}
        </Picker>
      </View>
      <Text fontSize={"$2"} marginLeft="2%" color="green" mb="$1.5" fontFamily={"$outfitBold"}>
        ESCOLHA A SUA CIDADE
      </Text>
      
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={cidadeSelecionada}
          onValueChange={(itemValue) => setCidadeSelecionada(itemValue)}
          enabled={!!estadoSelecionado}
          style={styles.picker}
        >
          <Picker.Item label="Cidade..." value="" />
          {cidades.map((cidade) => (
            <Picker.Item
              key={cidade.id}
              label={cidade.nome}
              value={cidade.nome}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  pickerWrapper: {
    backgroundColor: "#e8f5e9",
    borderWidth: 1.7,
    borderColor: "#43a047",
    borderRadius: 10,
    marginBottom: 16,
  },
  picker: {
    width: "100%",
  },
});

export default EstadoScreen;
