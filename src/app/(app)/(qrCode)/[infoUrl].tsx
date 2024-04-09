import { useLocalSearchParams } from 'expo-router';
import { View, Text, YStack } from 'tamagui';

export default function InfoUrl() {
  const { infoUrl } = useLocalSearchParams();

  return (
    <YStack alignContent='center'>
      <Text>params: {infoUrl}</Text>
    </YStack>
  );
}
