import { getFiles } from "@/lib/useAxios";
import { Image } from "tamagui";
import { Text, View } from "tamagui";
import { Pressable } from "react-native";
import { router } from "expo-router";

export interface PropsCardSeres {
  nome: string;
  uuid: string;
  photo: string;
  categoria: string;
  isRead: boolean; // nova propriedade
}

export default ({ nome, uuid, photo, categoria, isRead }: PropsCardSeres) => {
  const backgroundColor = isRead ? "#329F60" : "gray"; // altera a cor de fundo com base em isRead
  const onPress = isRead ? () => router.navigate(`(app)/(home)/${uuid}`) : undefined; // desabilita a navegação se o card não foi lido

  return (
    <Pressable onPress={onPress}>
      <View style={{ height: 180 }} justifyContent="flex-end">
        <View
          backgroundColor={backgroundColor}
          borderRadius={20}
          paddingBottom={100}
          height={150}
          width={130}
        >
          <View display="flex" justifyContent="center" alignItems="center"> 
            <Image
              style={{ width: 100, height: 90, marginTop: -10 }}
              source={{ uri: getFiles(photo) }}
            />
          </View>

          <View marginLeft={10}>
            <Text marginTop={2} color={"#fff"} fontSize={14} fontWeight={"unset"}>{categoria}</Text>
            <Text marginTop={5} color={"#fff"} fontWeight="normal">{nome}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
