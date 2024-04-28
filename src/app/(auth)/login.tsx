import { Text, YStack, XStack } from 'tamagui';
import { Link } from 'expo-router';
import TAuth from '@/components/templateAuth';
import { InputValues } from '@/lib/helpersForm';
import { useLoggin } from '@/lib/logicAuth';

export default function Login() {
  const v = new InputValues<{ email: string; senha: string }>();

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
        <TAuth.InputAuth placeholder='email' onChangeText={v.onChange('email')} />
        <YStack alignItems='flex-end' width={'100%'}>
          <TAuth.InputAuth
            placeholder='senha'
            mb={3}
            secureTextEntry
            onChangeText={v.onChange('senha')}
          />
          <Link href={'/(auth)/'}>
            <Text>Esqueceu a senha?</Text>
          </Link>
        </YStack>
      </TAuth.Form>
    </TAuth>
  );
}
