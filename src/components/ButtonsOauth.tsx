import { Button, ButtonProps, styled, XStack } from "tamagui";
import IconGoogle from "@/assets/iconGoogle.svg";
import IconFacebook from "@/assets/iconFacebook.svg";
import useApi from "@/lib/useApi";
import * as WebBrowser from "expo-web-browser";
import { baseURL } from "@/lib/useAxios";
import * as Linking from "expo-linking";
import { Alert, Pressable } from "react-native";
import { storeAuth } from "@/lib/logicAuth";

WebBrowser.maybeCompleteAuthSession();
const uriRedirect = Linking.createURL("/");

interface Props {
  size: number;
  gap: number;
}
export default ({ gap, size, ...props }: Props & ButtonProps) => {
  const login = storeAuth((s) => s.login);

  const { mutate } = useApi("mutate", (a) => ({
    async mutationFn(oauthName: "google" | "facebook") {
      const result = await WebBrowser.openAuthSessionAsync(
        `${baseURL}/usuario/login/${oauthName}/?stateRedirect=${encodeURIComponent(
          uriRedirect
        )}`,
        uriRedirect
      );

      if (result.type === "success") {
        const token = new URL(result.url).searchParams.get("token");

        if (token) return login(token);
      }

      WebBrowser.dismissAuthSession();
      Alert.alert("Erro no login", "Erro ao fazer login oauth");
    },
  }));

  const ButtonStyled = styled(Button, {
    backgroundColor: "$colorTransparent",
    padding: 10,
    size: size * 1.4,
    ...props,
  });

  return (
    <XStack gap={gap}>
      <ButtonStyled
        onPress={() => mutate("google")}
        icon={<IconGoogle width={"100%"} height={"100%"} />}
      />
      <ButtonStyled
        onPress={() => mutate("facebook")}
        icon={<IconFacebook width={"100%"} height={"100%"} />}
        {...props}
      />
    </XStack>
  );
};
