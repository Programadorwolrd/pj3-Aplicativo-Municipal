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

export default (props: ButtonProps) => {
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
    padding: 0,
    margin: 0,
    width: 50,
    height: 50,
    ...props,
  });

  return (
    <>
      <ButtonStyled onPress={() => mutate("google")} {...props}>
        <IconGoogle height="100%" width="100%" />
      </ButtonStyled>
      <ButtonStyled onPress={() => mutate("facebook")} {...props}>
        <IconFacebook height="100%" width="100%" />
      </ButtonStyled>
    </>
  );
};
