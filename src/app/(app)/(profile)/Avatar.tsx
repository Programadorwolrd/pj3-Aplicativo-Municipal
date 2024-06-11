import { Avatar, YStack, Text } from "tamagui";
import { CardDemo } from "./Test";
// const avatarPerfil = require("../../../assets/avatar-icon.jpeg");

interface avatarPerfil {
  img: string;
}

export default function AvatarProfile({ img }: avatarPerfil) {
  //teste
  const avatar: avatarPerfil = {
    img
  };

  if (!avatar.img) {
    // avatar.img = "https://pbs.twimg.com/profile_images/1464251436284485632/8tFZcXcg_400x400.jpg";
    avatar.img = "https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg";
  }

  return (
    <YStack mt={"$3"} ai={"center"}>
      <Avatar circular size={"$11"}>
        <Avatar.Image accessibilityLabel="avatar" src={avatar.img} />
        <Avatar.Fallback backgroundColor="$blue10" />
      </Avatar>
      {/* <CardDemo /> */}
      {/* <Text mt={"$3"}>alterar incone</Text> */}
    </YStack>
  );
}
