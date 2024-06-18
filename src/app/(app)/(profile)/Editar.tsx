import React, { useState, useEffect } from "react";
import { FormPaiado } from "@/components/FormConfigs";
import TAuth from "@/components/templateAuth";
import { router } from "expo-router";
import { ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import { YStack, Text, Adapt, Sheet, Select } from "tamagui";
import { useGetUser } from "@/lib/querys";
import { clientQuery } from "@/app/_layout";
import EstadoScreen from "./test";
import NascimentoScreen from "./test2";
import NomeCompletoScreen from "./test3";

export default function Editar() {
  const { data: userData } = useGetUser();
  console.log(userData?.data);

  const [sexo, setSexo] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (userData?.data) {
      setSexo(userData.data.usuario.sexo);
      // EditForm.values.apelido = userData?.data?.usuario.apelido ?? "";
    }
  }, [userData]);

  const EditForm = new FormPaiado((axios) => ({
    mutationFn: async (allValues) => {
      await axios.put("/usuario", { ...allValues, sexo });
      clientQuery.invalidateQueries();
      router.replace("/(app)/(profile)");
    },
  }));
  // EditForm.values.apelido = userData?.data?.usuario.apelido ?? "";
  const apelido = userData?.data?.usuario.apelido ?? "";

  const handleSexoChange = (itemValue: string) => {
    if (itemValue === "masculino") {
      setSexo("M");
    } else if (itemValue === "feminino") {
      setSexo("F");
    } else if (itemValue === "prefiroNaoInformar") {
      setSexo("O");
    }
  };

  // Definindo as opções para o Select
  const options = [
    { label: "Selecione seu sexo", value: "" },
    { label: "Masculino", value: "masculino" },
    { label: "Feminino", value: "feminino" },
    { label: "Prefiro Não Informar", value: "prefiroNaoInformar" },
  ];

  return (
    <TAuth subTitulo="Edite seus dados" titulo="EDITAR">
      <EditForm.Input campo="apelido" defaultValue={apelido} />
      <YStack w="104%" mb="$2">
        <NomeCompletoScreen />
        <Text
          fontSize={"$2"}
          color="green"
          mb="$1.5"
          marginLeft="2%"
          fontFamily={"$outfitBold"}
        >
          ESCOLHA O SEU SEXO
        </Text>
        <Select value={sexo} onValueChange={handleSexoChange}>
          <Select.Trigger
            size="$4.5"
            iconAfter={ChevronDown}
            backgroundColor={"$green4Light"}
            borderWidth={1.7}
            borderColor="$green9Light"
            borderRadius={10}
            width="100%"
            focusStyle={{ borderColor: "green" }}
            hoverStyle={{ borderColor: "green" }}
          >
            <Select.Value placeholder="Sexo" />
          </Select.Trigger>
          <Adapt when="sm" platform="touch">
            <Sheet
              native
              modal
              dismissOnSnapToBottom
              animationConfig={{
                type: "spring",
                damping: 20,
                mass: 1.2,
                stiffness: 250,
              }}
            >
              <Sheet.Frame>
                <Sheet.ScrollView>
                  <Adapt.Contents />
                </Sheet.ScrollView>
              </Sheet.Frame>
              <Sheet.Overlay
                animation="lazy"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
              />
            </Sheet>
          </Adapt>
          <Select.Content zIndex={200000}>
            <Select.ScrollUpButton
              alignItems="center"
              justifyContent="center"
              position="relative"
              width="100%"
              height="$3"
            >
              <YStack zIndex={10}>
                <ChevronUp size={20} />
              </YStack>
            </Select.ScrollUpButton>
            <Select.Viewport minWidth={200}>
              {options.map((option, index) => (
                <Select.Item key={index} value={option.value} index={index}>
                  <Select.ItemText>{option.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
            <Select.ScrollDownButton
              alignItems="center"
              justifyContent="center"
              position="relative"
              width="100%"
              height="$3"
            >
              <YStack zIndex={10}>
                <ChevronDown size={20} />
              </YStack>
            </Select.ScrollDownButton>
          </Select.Content>
        </Select>
        <EstadoScreen />
        <NascimentoScreen />
      </YStack>
      <EditForm.ButtonSubmit text="SALVAR" />

      <YStack alignItems="center" mt="$4">
        <Text
          onPress={() => {
            router.navigate("(app)/(profile)");
          }}
          color="$green9Light"
          fontSize="$5"
          textDecorationLine="underline"
        >
          Voltar para o Perfil
        </Text>
      </YStack>
    </TAuth>
  );
}
