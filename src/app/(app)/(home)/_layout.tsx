import StackApp from "@/components/StackApp";
import { Stack } from "expo-router";

import { Image, Text } from "tamagui";

export const unstable_settings = {
  initialRouteName: "index",
  
};

export default function HomeLayout() {
  return (
    <StackApp backgroundColor="#fff"
      HeaderTitle={() => (
        
        <Image
        
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
          source={require("../../../assets/BioDexBlack.png")}
        />
      )}
    />
  );
}
