import { Text, YStack, XStack } from 'tamagui';
import { Link } from 'expo-router';

import { storeAuth } from '@/lib/logicAuth';
import { FormAuth } from '@/components/formClass';
import TAuth from '@/components/templateAuth';
import { allvalids } from '@/lib/allValids';
import FormFooter from '@/components/FormFooter';

export default function Login() {
  const login = storeAuth((s) => s.login);

  const Auth = new FormAuth({
    campos: allvalids,
    onSubmit: (axios) => ({
      notlogoutIfNotAuthorized: true,
      async mutationFn(allValues) {
        const { data } = await axios.post('/usuario/login', allValues);

        login(data.token);
      },
    }),
  });

  return (
    <TAuth subTitulo='texto pequeno e triste' titulo='Entrar'>
      <Auth.Form>
        <Auth.Input campo='email' />
        <Auth.Input campo='senha' secureTextEntry />
        <FormFooter
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
