import Loading from "@/components/loading";
import { useGetQrcode } from "@/lib/querys";
import { isAxiosError } from "axios";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Text } from "tamagui";

export default function Visitas() {
  const { uri } = useLocalSearchParams<{ uri: string }>();
  const { data, isLoading, error } = useGetQrcode<true>(uri);

  useEffect(() => {
    if (data?.data.details == "OK") {
      const id = setTimeout(() => {
        router.navigate("/(app)/(home)");
      }, 2000);

      return () => clearTimeout(id);
    }
  });

  const isInfoFaltante =
    isAxiosError(error) && error.response?.data?.details === "FALTA";

  if (isInfoFaltante) return <Redirect href={"/visitas/form"} />;

  if (isLoading) return <Loading />;

  if (!data) return <Text>Erro ao carregar dados</Text>;

  return <Text>Sucesso!</Text>;
}
