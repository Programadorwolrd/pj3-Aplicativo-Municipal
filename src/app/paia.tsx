import { View, Text, Image } from "react-native";
import React from "react";


const img = require("@/assets/iconLay.jpeg")

export default function Paia() {
  return (
    <View>
      <Text>Paia</Text>
      <Image source={img} />
    </View>
  );
}
