import { allvalids, FormAuth } from '@/components/formClass';
import TAuth from '@/components/templateAuth';
import { storeAuth } from '@/lib/logicAuth';
import { router } from 'expo-router';

export default function Cadastrar() {
  const login = storeAuth((s) => s.login);

  const SignUp = new FormAuth(allvalids, (axios) => ({
    mutationFn(allValues) {
      return axios.post('/usuario', allValues);
    },
    notlogoutIfNotAuthorized: true,
    async onSuccess(_, allValues) {
      const { apelido, ...credentials } = allValues;

      const { data } = await axios.post('/usuario/login', credentials);

      login(data.token);

      router.replace('/(app)/(home)');
    },
  }));

  return (
    <TAuth subTitulo='Cadastra-se ' titulo='CADASTRAR'>
      <SignUp.Form>
        <SignUp.Input campo='apelido' persistValue />
        <SignUp.Input campo='email' persistValue />
        <SignUp.Input campo='senha' secureTextEntry />
        <SignUp.Footer
          link={{
            href: '/(auth)/login',
            text: 'Já está cadastrado?',
            textLink: 'Entre aqui!',
          }}
          textButton='CADASTRAR'
        />
      </SignUp.Form>
    </TAuth>
  );
}
