import { Text, YStack, XStack } from 'tamagui';
import { Link } from 'expo-router';
import TAuth from '@/components/templateAuth';

import { storeAuth } from '@/lib/logicAuth';
import { FormAuth } from '@/components/formClass';

export default function Login() {
  const login = storeAuth((s) => s.login);

  const Auth = new FormAuth(
    {
      email: [[(t) => /([a-z]{2,300})/g.test(t), 'valor paiado']],
      senha: [[(t) => /([a-z]{2,300})/g.test(t), 'valor paiado']],
    },
    (axios) => ({
      async mutationFn(allValues) {
        const { data } = await axios.post('/usuario/login', allValues);

        login(data.token);
      },
    })
  );

  return (
    <TAuth subTitulo='texto pequeno e triste' titulo='Entrar'>
      <Auth.Form
        link={{
          href: '/(auth)/cadastrar',
          text: 'Não tem cadastro?',
          textLink: 'cadastre-se aqui!',
        }}
        textButton='Entrar'
      >
        <Auth.Input campo='email' />
        <Auth.Input campo='senha' secureTextEntry />
      </Auth.Form>
    </TAuth>
  );
}
