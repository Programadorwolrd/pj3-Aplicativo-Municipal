import { Text, YStack } from "tamagui";
import { Link } from "expo-router";
import ButtonsOauth from "./ButtonsOauth";

export default function FormFooter(props: {
  link: {
    text: string;
    href: string;
    textLink: string;
  };
}) {
  return (
    <>
      <YStack width={"100%"} alignItems="center">
        <YStack width={"100%"} alignItems="center">
          <Text fontFamily={"$outfitBold"} fontSize={17} marginVertical={18}>
            OU
          </Text>
          <ButtonsOauth gap={20} size={50} />
        </YStack>
      </YStack>
      <Text fontSize={15} mt={30} textAlign="center">
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
    </>
  );
}
