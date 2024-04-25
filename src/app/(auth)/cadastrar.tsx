import TAuth from '@/components/templateAuth';

export default function Cadastrar() {
  const values = {
    apelido: '',
    email: '',
    senha: '',
    change(campo: Exclude<keyof typeof this, 'change'>) {
      return (v: string) => {
        this[campo] = v;
      };
    },
  };

  // Type 'string' is not assignable to type 'string & ((campo: "apelido" | "email" | "senha" | "change") => (v: string) => void)'.
  // Type 'string' is not assignable to type '(campo: "apelido" | "email" | "senha" | "change") => (v: string) => void'.t

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
          console.log(values);
        }}
      >
        <TAuth.InputAuth placeholder='apelido' onChangeText={values.change('apelido')} />
        <TAuth.InputAuth placeholder='email' onChangeText={values.change('email')} />
        <TAuth.InputAuth
          placeholder='senha'
          onChangeText={values.change('senha')}
          mb={3}
          secureTextEntry
        />
      </TAuth.Form>
    </TAuth>
  );
}
