import { Text, YStack, XStack } from 'tamagui';
import { Link } from 'expo-router';

import { storeAuth } from '@/lib/logicAuth';
import { FormAuth } from '@/components/formClass';
import TAuth from '@/components/templateAuth';

export default function Login() {
  const login = storeAuth((s) => s.login);

  const Auth = new FormAuth(
    {
      email: null,
      senha: null,
    },
    (axios) => ({
      notlogoutIfNotAuthorized: true,
      async mutationFn(allValues) {
        const { data } = await axios.post('/usuario/login', allValues);

        login(data.token);
      },
    })
  );

  return (
    <TAuth subTitulo='texto pequeno e triste' titulo='Entrar'>
      <Auth.Form>
        <Auth.Input campo='email' persistValue />
        <Auth.Input campo='senha' secureTextEntry />
        <Auth.Footer
          link={{
            href: '/(auth)/cadastrar',
            text: 'Não tem cadastro?',
            textLink: 'cadastre-se aqui!',
          }}
          textButton='Entrar'
        />
      </Auth.Form>
    </TAuth>
  );
}
