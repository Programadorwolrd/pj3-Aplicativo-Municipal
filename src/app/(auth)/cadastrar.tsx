import { FAuth } from '@/components/formAuth';
import TemplateAuth from '@/components/templateAuth';
import { Text } from 'tamagui';

export default function Cadastrar() {
  return (
    <TemplateAuth subTitulo='texto pequeno e triste' titulo='CADASTRARPAIA'>
      <FormSignIn />
      <Text>
        Já tem uma conta?
        <TemplateAuth.LinkEnd href='/(auth)/login' textLink='Entre agr msm corno!' />
      </Text>
    </TemplateAuth>
  );
}

function FormSignIn() {
  return (
    <FAuth gap={13}>
      <FAuth.I placeholder='Nome' />
      <FAuth.I placeholder='email' />
      <FAuth.I placeholder='senha' mb={3} secureTextEntry/>

      <FAuth.B mt={20}>CADASTRARPAIA</FAuth.B>
    </FAuth>
  );
}
