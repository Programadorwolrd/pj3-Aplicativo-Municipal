import { Text, YStack, XStack } from 'tamagui';
import { Link } from 'expo-router';
import TAuth from '@/components/templateAuth';

export default function Login() {
  return (
    <TAuth subTitulo='texto pequeno e triste' titulo='Entrar'>
      <TAuth.Form
        link={{
          href: '/(auth)/cadastrar',
          text: 'Não tem cadastro?',
          textLink: 'cadastre-se aqui!',
        }}
        textButton='ENTRAR'
        onSubmit={({data}) => {
          console.log(data);
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
