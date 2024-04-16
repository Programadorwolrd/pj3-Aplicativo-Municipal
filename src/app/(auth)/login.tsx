import { Text, YStack, XStack, Form } from 'tamagui';
import { Facebook } from '@tamagui/lucide-icons';
import { Link } from 'expo-router';
import { InputAuth } from '@/components/Auth/InputAuth';
import { ButtonAuth } from '@/components/Auth/ButtonAuth';
import { TextAuth } from '@/components/Auth/TextAuth';

export default function Login() {
  return (
    <YStack fullscreen marginTop='15%' paddingVertical={'$5'} paddingHorizontal={40} backgroundColor={'$white2'}>
      <TituloAuth />

      <YStack justifyContent='center' alignItems='center'>
        <EntrarForm />
        <Text marginVertical={15}>OU</Text>
        <XStack gap={30}>
          <Facebook />
          <Facebook />
          <Facebook />
        </XStack>
      </YStack>
    </YStack>
  );
}

function EntrarForm() {
  return (
    <Form onSubmit={() => {}} width={'100%'}>
      <YStack gap={20}>
        <InputAuth placeholder='email' />
        <YStack alignItems='flex-end'>
          <InputAuth placeholder='senha' textContentType='password' />
          <Link href={'/(auth)/'}>Esqueceu a senha?</Link>
        </YStack>
        <Form.Trigger>
          <ButtonAuth>ENTRARPAIA</ButtonAuth>
        </Form.Trigger>
      </YStack>
    </Form>
  );
}

function TituloAuth() {
  return (
    <YStack  marginBottom={'$6'}>
      <TextAuth H1>PAIAENTRAR</TextAuth>
      <TextAuth H4>Texto muito triste e minusculo</TextAuth>
    </YStack>
  );
}
