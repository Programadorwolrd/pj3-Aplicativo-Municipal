import { Stack, usePathname } from "expo-router";
import type { FC, PropsWithChildren, ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Text, View } from "tamagui";

type Props = {
  titulo?: string;
  backgroundColor?: string;
  HeaderTitle?: FC<PropsWithChildren>;
} & PropsWithChildren;

export default function StackApp({
  children,
  titulo,
  backgroundColor = "#F5F5F5",
  HeaderTitle,
}: Props) {
  return (
    <Stack
      screenOptions={({ route }) => ({
        headerShown: !(route.params && Object.keys(route.params).length > 0),

        title: titulo,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor,
        },
        headerShadowVisible: false,
        headerTitle({ children }) {
          return HeaderTitle ? (
            <HeaderTitle>{children}</HeaderTitle>
          ) : (
            <Text fontSize={23} fontWeight={"bold"} margin="auto">
              {children}
            </Text>
          );
        },
      })}
    >
      {children}
    </Stack>
  );
}
