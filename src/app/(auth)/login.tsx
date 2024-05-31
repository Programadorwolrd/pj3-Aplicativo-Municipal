import { Text, YStack, XStack } from 'tamagui';
import { Link } from 'expo-router';

import { storeAuth } from '@/lib/logicAuth';
import { FormAuth } from '@/components/formClass';
import TAuth from '@/components/templateAuth';
import { allvalids } from '@/lib/allValids';
import FormFooter from '@/components/FormFooter';
import { isAxiosError } from 'axios';

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
      onError(error) {
        if (!isAxiosError(error)) throw error;

        if (error.response?.status === 401) return alert('Email ou Senha invalidos');

        alert(
          error.response?.data?.messsage ||
            error.message ||
            'erro desconhecido do servidor'
        );

        return error;
      },
    }),
  });

  return (
    <TAuth subTitulo='texto pequeno e triste' titulo='Entrar'>
      <Auth.Form>
        <Auth.Input campo='email' />
        <Auth.Input campo='senha' secureTextEntry />
        <Auth.Submit textButton='Entrar' />
        <FormFooter
          link={{
            href: '/(auth)/cadastrar',
            text: 'Não tem cadastro?',
            textLink: 'cadastre-se aqui!',
          }}
        />
      </Auth.Form>
    </TAuth>
  );
}
