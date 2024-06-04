import { Avatar, YStack, Text } from "tamagui";
// const avatarPerfil = require("../../../assets/avatar-icon.jpeg");

interface avatarPerfil {
  img: string;
}

export default function AvatarProfile({ img }: avatarPerfil) {
    //teste
  const avatar: avatarPerfil = {
    img
  };
  return (
    <YStack mt={"$3"} ai={"center"}>
      <Avatar circular size={"$11"}>
        <Avatar.Image accessibilityLabel="avatar" src={avatar.img} />
        <Avatar.Fallback backgroundColor="$blue10" />
      </Avatar>
      <Text mt={"$3"}>alterar incone</Text>
    </YStack>
  );
}
