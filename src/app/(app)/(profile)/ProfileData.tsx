import { YStack, Text, Button, XStack } from "tamagui";
interface PropsProfile {
  nome: string;
  ranking: number;
}

export default function ProfileData({ nome, ranking }: PropsProfile) {
  const user: PropsProfile = {
    nome,
    ranking,
  };

  return (
    <YStack mt={"$3"} ai={"center"}>
      <Text fontSize={"$7"} color={"$white2"}>
        {user.nome}
      </Text>
      <Text fontSize={"$6"} color={"$white2"} mt={"$3"} fontWeight={"bold"}>
        {ranking < 0 ? "Sem ranking" : `Ranking #${user.ranking + 1}`}
      </Text>
    </YStack>
  );
}
