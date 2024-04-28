import { Text, YStack, XStack } from 'tamagui';
import { Link } from 'expo-router';
import TAuth from '@/components/templateAuth';
import { useLoggin } from '@/lib/logicAuth';

export default function Login() {
  const { mutate } = useLoggin();
  return (
    <TAuth subTitulo='texto pequeno e triste' titulo='Entrar'>
      <TAuth.Form
        link={{
          href: '/(auth)/cadastrar',
          text: 'Não tem cadastro?',
          textLink: 'cadastre-se aqui!',
        }}
        textButton='ENTRAR'
        onSubmit={() => {
          mutate(v.getAll);
        }}
      >
        <TAuth.InputAuth placeholder='email'  />
        <YStack alignItems='flex-end' width={'100%'}>
          <TAuth.InputAuth placeholder='senha' mb={3} secureTextEntry />
          <Link href={'/(auth)/'}>
            <Text>Esqueceu a senha?</Text>
          </Link>
        </YStack>
      </TAuth.Form>
    </TAuth>
  );
}
