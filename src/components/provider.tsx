import React, { PropsWithChildren, useEffect, useState } from "react";
import { TamaguiProvider, Theme } from "tamagui";
import appConfig from "tamagui.config";
import { useColorScheme } from "react-native";

export default function Provider({ children }: PropsWithChildren) {
  const theme = useColorScheme();

  return (
    <TamaguiProvider config={appConfig} defaultTheme="light">
      <Theme name={theme}>{children}</Theme>
    </TamaguiProvider>
  );
}
