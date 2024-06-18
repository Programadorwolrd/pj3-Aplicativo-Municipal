import React from "react";
import TAuth from "@/components/templateAuth";
import { router } from "expo-router";
import { YStack, Text } from "tamagui";
import NascimentoScreen from "@/components/form/PickerNascimento";
import PickerSexo from "@/components/form/PickerSexo";
import { FormPaiado } from "@/components/FormConfigs";
import { useGetUser } from "@/lib/querys";
import EstadoScreen from "@/components/form/PickerCidade";
import { clientQuery } from "@/app/_layout";

export default function Form() {
  const { data: userData } = useGetUser();

  const completForm = new FormPaiado((axios) => ({
    mutationFn: async (allValues) => {
      await axios.put("/usuario", allValues);

      clientQuery.invalidateQueries({
        queryKey: ["currentUser"],
      });

      router.back();
    },
  }));

  if (!userData) return null;

  const user = userData.data.usuario;

  return (
    <TAuth subTitulo="É apenas uma vez" titulo="Termine o cadastro">
      <completForm.Input campo="nome" defaultValue={user.nome || ""} />
      <YStack w="104%" mb="$4">
        <NascimentoScreen
          values={completForm.values}
          defaultValue={user.nascimento || ""}
        />
        <PickerSexo
          values={completForm.values}
          defaultValue={user.sexo || ""}
        />
        <EstadoScreen values={completForm.values} />
      </YStack>
      <completForm.ButtonSubmit text="SALVAR" />

      <YStack alignItems="center" mt="$4">
        <Text
          onPress={() => {
            router.navigate("(app)/(home)");
          }}
          color="$green9Light"
          fontSize="$5"
          textDecorationLine="underline"
        >
          Voltar para o inicio
        </Text>
      </YStack>
    </TAuth>
  );
}
