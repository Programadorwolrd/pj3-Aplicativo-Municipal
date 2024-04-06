import { View, Text } from "react-native";
import React from "react";
import { Spinner, YStack } from "tamagui";

export default function index() {
  return (
    <YStack fullscreen justifyContent="center" alignItems="center">
      <Spinner size="large" color="$orange10" />
      <Text>Tantos erros :C</Text>
    </YStack>
  );
}
