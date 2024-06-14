import StackApp from "@/components/StackApp";
import { Stack } from "expo-router";
import { Button } from "tamagui";

import { ArrowLeftCircle } from "@tamagui/lucide-icons";
// Button will automatically pass size/theme to icon

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerShown: false,
        // headerLeft: () =>
      }}
    ></Stack>
  );
}
