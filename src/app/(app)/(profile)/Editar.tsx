import React, { useState, useEffect } from "react";
import { FormPaiado } from "@/components/FormConfigs";
import TAuth from "@/components/templateAuth";
import { router } from "expo-router";
import { ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import { YStack, Text, Adapt, Sheet, Select } from "tamagui";
import { useGetUser } from "@/lib/querys";

export default function Editar() {
  const { data: userData } = useGetUser();

    const [sexo, setSexo] = useState<string>("");

  useEffect(() => {
    if (userData?.data) {
      setSexo(userData.data.sexo);
    }
  }, [userData]);
  console.log(userData?.data?.usuario.apelido);

  const EditForm = new FormPaiado((axios) => ({
    mutationFn: async (allValues) => {
      try {
        await axios.put("/usuario", { ...allValues, sexo });
        router.replace("/(app)/(profile)");
      } catch (error) {
        console.error("Error updating user data:", error);
      }
    },
  }));

  const handleSexoChange = (itemValue: string) => {
    if (itemValue === "masculino") {
      setSexo("M");
    } else if (itemValue === "feminino") {
      setSexo("F");
    } else if (itemValue === "outro") {
      setSexo("O");
    }
  };

  // Definindo as opções para o Select
  const options = [
    { label: "Selecione seu sexo", value: "" },
    { label: "Masculino", value: "masculino" },
    { label: "Feminino", value: "feminino" },
    { label: "Outro", value: "outro" },
  ];




useEffect(() => {
  var apelido:string = userData?.data?.usuario.apelido
  console.log(typeof apelido);
  EditForm.values.apelido = apelido;
  console.log('useEffect executado após o carregamento do componente');
}, []);

  return (
    <TAuth subTitulo="Edite seus dados" titulo="EDITAR">
      <EditForm.Input
        campo="apelido"
      />
      

      <YStack w="104%" mb="$2">
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
            <Select.Value placeholder="Selecione seu sexo" />
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
