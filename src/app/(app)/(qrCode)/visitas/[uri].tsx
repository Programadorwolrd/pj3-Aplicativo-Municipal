import { clientQuery } from "@/app/_layout";
import Loading from "@/components/loading";
import { useGetQrcode } from "@/lib/querys";
import useApi from "@/lib/useApi";
import { BadgeCheck } from "@tamagui/lucide-icons";
import { isAxiosError } from "axios";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import { Text } from "tamagui";

export default function Visitas() {
  const { uri } = useLocalSearchParams<{ uri: string }>();

  const { mutate, isPending, isSuccess, error, isIdle } = useApi(
    "mutate",
    (axios) => {
      return {
        mutationKey: ["qrCodePaiaaa"],
        mutationFn: () => {
          return axios.get(`/usuario/lerQrCode/${uri}`);
        },
        throwOnError: () => false,
      };
    }
  );

  useEffect(() => {
    mutate();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      const id = setTimeout(() => {
        router.replace("/(app)/(home)");
      }, 2000);
      return () => clearTimeout(id);
    }
  }, [isSuccess]);

  const isInfoFaltante =
    isAxiosError(error) && error.response?.data?.details === "FALTA";

  if (isInfoFaltante) return <Redirect href={"/visitas/form"} />;

  if (isPending && !isIdle) return <Loading />;

  if (!isSuccess) return <Text>Erro ao carregar dados</Text>;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <BadgeCheck color="green" size={"$10"} />
      <Text fontSize={"$10"} color="green">
        Sucesso!
      </Text>
      <Text fontSize={"$8"} mt={"$3"} fontFamily={"$outfitBold"}>
        Visita registrada!
      </Text>
      <Text style={{ marginTop: 5, fontSize: 14, color: "gray" }}>
        Redirecionando para a página inicial...
      </Text>
    </View>
  );
}
