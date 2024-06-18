import React, { useEffect, useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { Text } from "tamagui";
import { PropsPicker } from "./PickerSexo";

interface Estado {
  id: number;
  sigla: string;
  nome: string;
}

interface Cidade {
  id: number;
  nome: string;
}

const EstadoScreen = ({ values }: PropsPicker) => {
  const [estados, setEstados] = useState<Estado[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState<string>("");
  const [cidadeSelecionada, setCidadeSelecionada] = useState<string>("");

  if (cidadeSelecionada) values["cidade"] = cidadeSelecionada;

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

  return (
    <View style={stylesPicker.container}>
      <Text
        fontSize={"$2"}
        color="green"
        style={{ marginTop: 16 }}
        mb="$1.5"
        marginLeft="2%"
        fontFamily={"$outfitBold"}
      >
        ESCOLHA O SEU ESTADO
      </Text>
      <View style={stylesPicker.pickerWrapper}>
        <Picker
          selectedValue={estadoSelecionado}
          onValueChange={(itemValue) => setEstadoSelecionado(itemValue)}
          style={stylesPicker.picker}
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
      <Text
        fontSize={"$2"}
        marginLeft="2%"
        style={{ marginTop: 16 }}
        color="green"
        mb="$1.5"
        fontFamily={"$outfitBold"}
      >
        ESCOLHA A SUA CIDADE
      </Text>

      <View style={stylesPicker.pickerWrapper}>
        <Picker
          selectedValue={cidadeSelecionada}
          onValueChange={(itemValue) => setCidadeSelecionada(itemValue)}
          enabled={!!estadoSelecionado}
          style={stylesPicker.picker}
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
export const stylesPicker = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  pickerWrapper: {
    flexDirection: "row",
    backgroundColor: "#e8f5e9",
    borderWidth: 1.7,
    borderColor: "green",
    borderRadius: 10,
    padding: 1,
    alignItems: "center",
    overflow: "hidden",
  },
  picker: {
    width: "100%",
    height: 45,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1.7,
    borderColor: "#46d39a",
    backgroundColor: "#DDF3E4",
    color: "black",
  },
});

export default EstadoScreen;
