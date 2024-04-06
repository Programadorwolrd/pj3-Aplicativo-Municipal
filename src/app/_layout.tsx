import { Tabs } from "expo-router";
import React from "react";
import { Image } from "react-native";

export default function AppLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "paiaHome",
          tabBarIcon: () => (
            <Image
              source={require("@/assets/iconLay.jpeg")}
              style={{ height: 40, width: 40 }}
            />
          ),
        }}
      />
      <Tabs.Screen name="paia" options={{ title: "paiaPaia" }} />
    </Tabs>
  );
}
