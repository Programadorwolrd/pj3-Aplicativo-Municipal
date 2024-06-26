import React from "react";
import Button from "../../../components/botao";
import Card from "../../../components/card-mapa";
import { Image, Text, View } from "tamagui";
import { LocateFixed } from "@tamagui/lucide-icons";
import { useGetUser } from "@/lib/querys";
import Loading from "@/components/loading";

export default function MapaPage() {
  const user = useGetUser();
  if (user.isLoading) return <Loading />;

  if (!user.data) {
    return <Text>Erro ao carregar dados</Text>;
  }
  const total = user.data.data.usuario.progresso.total;
  const lidos = user.data.data.usuario.progresso.lido;

  return (
    <>
      <View width={"100%"} backgroundColor={"white"}>
        <Text
          textAlign="center"
          marginBottom={"$5"}
          marginTop={"$4"}
          fontWeight={"bold"}
          fontSize={"$9"}
          color={"green"}
        >
          Liberar Areas{" "}
          <LocateFixed color={"green"} fontWeight={"bold"} size={29} />
        </Text>
      </View>
      <View f={1} flexDirection="row">
        {/* <Text>Lauren</Text> */}
        <View style={{ flex: 1.3, backgroundColor: "white" }}>
          <View
            style={{
              display: "flex",
              height: "100%",
              width: "100%",
              flexDirection: "column",
            }}
          >
            <View
              style={{
                width: "90%",
                height: "23%",
                alignSelf: "flex-start",
                borderRadius: 20,
                marginLeft: 10,
                backgroundColor: "#25353E",
                marginTop: 0,
              }}
            >
              <Image
                source={require("../../../assets/bandeira.png")}
                style={{
                  width: "20%",
                  height: "20%",
                  marginLeft: 20,
                  marginTop: 20,
                }}
              />
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 40,
                  alignSelf: "left",
                  marginLeft: 20,
                }}
              >
                {lidos} / {total}
              </Text>
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 15,
                  alignSelf: "left",
                  marginLeft: 20,
                }}
              >
                Seres vistos
              </Text>
            </View>

            <View
              style={{
                width: "90%",
                height: "45%",
                alignSelf: "flex-start",
                marginTop: 15,
                borderRadius: 20,
                marginLeft: 10,
                backgroundColor: "#329f5f2b",
              }}
            >
              <Image
                source={require("../../../assets/mapa.png")}
                style={{
                  width: "15%",
                  height: "12%",
                  marginLeft: 20,
                  marginTop: 20,
                }}
              />
              <Text
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 40,
                  alignSelf: "left",
                  marginLeft: 14,
                }}
              >
                {lidos} / {total}
              </Text>
              <Text
                style={{
                  color: "green",
                  fontWeight: "bold",
                  fontSize: 15,
                  alignSelf: "left",
                  marginLeft: 20,
                }}
              >
                {/* ----------------------- */}
                Suas medalhas
              </Text>

              <Image
                source={require("../../../assets/pin.png")}
                style={{
                  width: "15%",
                  height: "12%",
                  marginLeft: 20,
                  marginTop: 20,
                }}
              />
              <Text
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 40,
                  alignSelf: "left",
                  marginLeft: 20,
                }}
              >
                {lidos} / {total}
              </Text>
              <Text
                style={{
                  color: "green",
                  fontWeight: "bold",
                  fontSize: 15,
                  alignSelf: "left",
                  marginLeft: 20,
                }}
              >
                {/* --------------- */}
                Descobertas
              </Text>
            </View>

            <View
              style={{
                width: "90%",
                height: "15%",
                alignSelf: "flex-start",
                marginTop: 20,
                marginLeft: 16,
                backgroundColor: "white",
                borderLeftWidth: 5, // Adiciona uma borda à esquerda com 1 pixel de largura
                borderLeftColor: "green", // Define a cor da borda como preta
              }}
            >
              <Text
                style={{
                  color: "green",
                  fontWeight: "bold",
                  fontSize: 18,
                  alignSelf: "left",
                  marginLeft: 20,
                }}
              >
                Dica!
              </Text>

              <Text
                style={{
                  color: "black",
                  fontSize: 14,
                  alignSelf: "left",
                  marginLeft: 20,
                }}
              >
                Procure perto das arvores e de zonas de fluxo , com facil acesso
                remoto ou arvores.
              </Text>
            </View>
          </View>
        </View>

        <View style={{ flex: 2, backgroundColor: "white" }}>
          <Image
            source={require("../../../assets/mapaoficial.png")}
            style={{ width: "100%", height: "60%", marginTop: "6%" }}
            resizeMode="cover"
          />
        </View>
      </View>
    </>
  );
}
//diferença de uma varivel normal para um usestate ele é uma varivael que atualiza quando muda ele é um estado, varivaeis efunçoes glboais voce porde importar elas
