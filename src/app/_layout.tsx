import React from "react";
import Provider from "@/components/provider";
import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Provider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
