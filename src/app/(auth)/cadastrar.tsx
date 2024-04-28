import TAuth from '@/components/templateAuth';
import { InputValues } from '@/lib/helpersForm';

export default function Cadastrar() {
  

  const values = new InputValues<{
    apelido: string;
    email: string;
    senha: string;
  }>();

  return (
    <TAuth subTitulo='Cadastra-se ' titulo='CADASTRAR'>
      <TAuth.Form
        link={{
          href: '/(auth)/login',
          text: 'Já está cadastrado?',
          textLink: 'Entre aqui!',
        }}
        textButton='CADASTRAR'
        onSubmit={() => {
        }}
      >
        <TAuth.InputAuth
          placeholder='apelido'
          onChangeText={values.onChange('apelido')}
        />
        <TAuth.InputAuth placeholder='email' onChangeText={values.onChange('email')} />
        <TAuth.InputAuth
          placeholder='senha'
          onChangeText={values.onChange('senha')}
          mb={3}
          secureTextEntry
        />
      </TAuth.Form>
    </TAuth>
  );
}
