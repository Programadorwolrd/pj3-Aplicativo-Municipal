import { YStack, Image, Text, XStack } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import AvatarProfile from "./Avatar";
import ProfileData from "./ProfileData";
import Tabs from "./(tabs)";

const backProfile = require("../../../assets/background-perfil.png");

export default function Profile() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <YStack backgroundColor={"#F6FFF7"} fullscreen>
        <YStack mb={"$5"}>
          <Image
            source={backProfile}
            width={"100%"}
            height={280}
            resizeMode="stretch"
            position="absolute"
            zi={"$0"}
          />
          <XStack mt={"$3"} ai={"center"} jc={"center"}>
            <Text
              fontSize={"$8"}
              fontWeight={"bold"}
              mt={"$5"}
              color={"$white2"}
            >
              Perfil
            </Text>
            
          </XStack>
          <ProfileData nome="Xabullinha Rei do Atraso" ranking={5} />
          <AvatarProfile img={require("../../../assets/avatar-icon.jpeg")} />
        </YStack>
        <Tabs />
      </YStack>
    </SafeAreaView>

  );
}
