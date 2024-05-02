import { FormAuth } from '@/components/formClass';
import TAuth from '@/components/templateAuth';
import { storeAuth } from '@/lib/logicAuth';
import { router } from 'expo-router';

export default function Cadastrar() {
  const login = storeAuth((s) => s.login);

  const SignUp = new FormAuth(
    {
      apelido: [[(t) => /([a-z]{2,300})/g.test(t), 'valor paiado']],
      email: [[(t) => /([a-z]{2,300})/g.test(t), 'valor paiado']],
      senha: [[(t) => /([a-z]{2,300})/g.test(t), 'valor paiado']],
    },
    (axios) => ({
      mutationFn(allValues) {
        return axios.post('/usuario', allValues);
      },
      async onSuccess(_, allValues) {
        const { apelido, ...credentials } = allValues;

        const { data } = await axios.post('/usuario/login', credentials);

        login(data.token);

        router.replace('/(app)/(home)');
      },
    })
  );

  return (
    <TAuth subTitulo='Cadastra-se ' titulo='CADASTRAR'>
      <SignUp.Form
        link={{
          href: '/(auth)/login',
          text: 'Já está cadastrado?',
          textLink: 'Entre aqui!',
        }}
        textButton='CADASTRAR'
      >
        <SignUp.Input campo='apelido' />
        <SignUp.Input campo='email' />
        <SignUp.Input campo='senha' secureTextEntry />
      </SignUp.Form>
    </TAuth>
  );
}
