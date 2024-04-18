import { ButtonCustom } from '@/components/buttonCustom';
import { TextCustom } from '@/components/textCustom';
import { router } from 'expo-router';
import { ImageBackground } from 'react-native';
import { Text, XStack, YStack } from 'tamagui';

// n vi q era sua pag
export default function Auth() {
  const image = require('@/assets/background-login.png');

  return (
    <ImageBackground source={image} resizeMode='cover' style={{ flex: 1 }}>
      <YStack fullscreen>
        <XStack>
          <TextCustom>Bio</TextCustom>
          <TextCustom>Paia</TextCustom>
        </XStack>
        <Text color={'$white3'}>Vamos a busca</Text>
        <Text color={'$white3'}>
          Embarque agora na jornada para registrar todos os seres íncriveis e fascinantes
          do nosso parque.
        </Text>

        <ButtonCustom  onPress={() => router.navigate('/(auth)/cadastrar')}>
          Paia Cadastrar
        </ButtonCustom>

        <ButtonCustom bgOpaco onPress={() => router.navigate('/(auth)/login')}>
          Paia Entrar
        </ButtonCustom>
      </YStack>
    </ImageBackground>
  );
}
