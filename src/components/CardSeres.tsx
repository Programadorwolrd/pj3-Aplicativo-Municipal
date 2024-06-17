import { Button, Text, View } from "tamagui";
import { Image, Pressable } from "react-native";
import { router } from "expo-router";
import { getFiles } from "@/lib/useAxios";

export interface PropsCardSeres {
  nome: string;
  uuid: string;
  photo: string;
  categoria: string;
}
export default ({ nome, uuid, photo, categoria }: PropsCardSeres) => (
  <Pressable onPress={() => router.navigate(`(app)/(home)/${uuid}`)}>
    <View style={{ height: 180 }} justifyContent="flex-end">
      <View
        backgroundColor={"#329F60"}
        borderRadius={20}
        paddingBottom={100}
        height={140}
      >
        <Image
          style={{ width: 100, height: 90, marginTop: -10 }}
          source={{ uri: getFiles(photo) }}
        />

        <View marginLeft={10}>
          <Text color={"#fff"} fontWeight="normal">
            {nome}
          </Text>
          <Text color={"#fff"}>{categoria}</Text>
        </View>
      </View>
    </View>
  </Pressable>
);
