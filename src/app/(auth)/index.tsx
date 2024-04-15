import ButtonAuth from '@/components/ButtonAuth';
import TextAuth from '@/components/TextAuth';
import { router } from 'expo-router';
import { Text, View, XStack, YStack } from 'tamagui';

// n vi q era sua pag
export default function Auth() {
  return (
    <YStack fullscreen>
      <XStack>
        <TextAuth>Bio</TextAuth>
        <TextAuth>Paia</TextAuth>
      </XStack>
      <Text color={'$white3'}>Vamos a busca</Text>
      <Text color={'$white3'}>
        Embarque agora na jornada para registrar todos os seres íncriveis e fascinantes do
        nosso parque.
      </Text>

      <ButtonAuth bgOpaco onPress={() => router.navigate('/(auth)/login')}>
        Paia Entrar
      </ButtonAuth>
    </YStack> 
  );
}
