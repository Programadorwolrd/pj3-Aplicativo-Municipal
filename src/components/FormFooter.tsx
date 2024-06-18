import { Text, View, YStack } from "tamagui";
import { Link } from "expo-router";
import ButtonsOauth from "./ButtonsOauth";
import { XStack } from "tamagui";

export default function FormFooter(props: {
  link: {
    text: string;
    href: string;
    textLink: string;
  };
}) {
  return (
    <View gap={"$5"} alignItems="center">
      <YStack width={"100%"} alignItems="center">
        <YStack width={"100%"} alignItems="center">
          <Text fontFamily={"$outfitBold"} fontSize={17} marginVertical={18}>
            OU
          </Text>
          <XStack gap={30} alignSelf="center" alignItems="center">
            <ButtonsOauth />
          </XStack>
        </YStack>
      </YStack>
      <Text fontSize={15} textAlign="center">
        {props.link.text}{" "}
        <Link href={props.link.href}>
          <Text
            textDecorationLine="underline"
            color={"green"}
            fontFamily={"$outfitBold"}
          >
            {props.link.textLink}
          </Text>
        </Link>
      </Text>
    </View>
  );
}
