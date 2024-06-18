import React, { useState, useEffect } from "react";
import { FormPaiado } from "@/components/FormConfigs";
import TAuth from "@/components/templateAuth";
import { router } from "expo-router";
import { YStack, Text, Adapt, Sheet, Select } from "tamagui";
import { useGetUser } from "@/lib/querys";
import { clientQuery } from "@/app/_layout";
import EstadoScreen from "../../../components/form/PickerCidade";
import NascimentoScreen from "@/components/form/PickerNascimento";
import PickerSexo from "@/components/form/PickerSexo";

export default function Editar() {
  const { data: userData } = useGetUser();

  const EditForm = new FormPaiado((axios) => ({
    mutationFn: async (allValues) => {
      await axios.put("/usuario", allValues);
      clientQuery.invalidateQueries();
      router.replace("/(app)/(profile)");
    },
  }));

  if (!userData) return null;

  const user = userData.data.usuario;

  return (
    <TAuth subTitulo="Edite seus dados" titulo="EDITAR">
      <EditForm.Input campo="apelido" defaultValue={user.apelido} />
      <EditForm.Input campo="nome" defaultValue={user.nome || ""} />
      <YStack w="104%" mb="$2">
        <NascimentoScreen
          values={EditForm.values}
          defaultValue={user.nascimento || ""}
        />
        <PickerSexo values={EditForm.values} defaultValue={user.sexo || ""} />
        <EstadoScreen values={EditForm.values} />
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
