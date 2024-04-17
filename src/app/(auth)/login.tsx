import { Text, YStack, XStack } from 'tamagui';
import { Facebook } from '@tamagui/lucide-icons';
import TemplateAuth from '@/components/templateAuth';
import { FAuth } from '@/components/formAuth';
import { Link } from 'expo-router';
import { TextCustom } from '@/components/textCustom';

export default function Login() {
  return (
    <TemplateAuth subTitulo='texto pequeno e triste' titulo='ENTRAPAIA'>
      <FormSignIn />
      <Text marginVertical={15}>OU</Text>
      <XStack gap={30}>
        <Facebook />
        <Facebook />
        <Facebook />
      </XStack>
    </TemplateAuth>
  );
}

function FormSignIn() {
  return (
    <FAuth>
      <FAuth.I placeholder='email' />
      <YStack alignItems='flex-end' width={'100%'}>
        <FAuth.I placeholder='senha' mb={3} textContentType='password' />
        <Link href={'/(auth)/'}>
          <Text>Esqueceu a senha?</Text>
        </Link>
      </YStack>
      <FAuth.B>ENTRARPAIA</FAuth.B>
    </FAuth>
  );
}
