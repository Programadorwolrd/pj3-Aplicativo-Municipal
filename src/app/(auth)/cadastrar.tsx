import { FormPaia } from "@/components/FormClass";
import { FormPaiado } from "@/components/FormConfigs";
import FormFooter from "@/components/FormFooter";
import TAuth from "@/components/templateAuth";
import { storeAuth } from "@/lib/logicAuth";
import { router } from "expo-router";

export default function Cadastrar() {
  const login = storeAuth((s) => s.login);

  const SignUp = new FormPaiado((axios) => ({
    mutationFn: async (allValues) => {
      await axios.post("/usuario", allValues); //se der erro n continua

      const { apelido, ...credentials } = allValues;

      const { data } = await axios.post("/usuario/login", credentials);

      login(data.token);

      router.replace("/(app)/(home)");
    },
  }));

  return (
    <TAuth subTitulo="Cadastra-se" titulo="CADASTRAR">
      <SignUp.Input campo="apelido" />
      <SignUp.Input campo="email" textContentType="emailAddress" />
      <SignUp.Input campo="senha" secureTextEntry textContentType="password" />
      <SignUp.ButtonSubmit text="CADASTRAR" />
      <FormFooter
        link={{
          href: "/(auth)/login",
          text: "Já está cadastrado?",
          textLink: "Entre aqui!",
        }}
      />
    </TAuth>
  );
}
