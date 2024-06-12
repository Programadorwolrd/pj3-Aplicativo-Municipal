import { FormPaia } from "@/components/FormClass";
import { TemplateInput } from "@/components/FormDefault";
import FormFooter from "@/components/FormFooter";
import TAuth from "@/components/templateAuth";
import { allvalids } from "@/lib/allValids";
import { storeAuth } from "@/lib/logicAuth";
import { router } from "expo-router";
import { Input } from "tamagui";

export default function Cadastrar() {
  const login = storeAuth((s) => s.login);

  const SignUp = new FormPaia(
    {
      campos: allvalids,
      submitOptions: (axios) => ({
        mutationFn: (allValues) => axios.post("/usuario", allValues),
        notlogoutIfNotAuthorized: true,
        async onSuccess(_, allValues) {
          const { apelido, ...credentials } = allValues;

          const { data } = await axios.post("/usuario/login", credentials);

          login(data.token);

          router.replace("/(app)/(home)");
        },
      }),
    },
    Input,
    TemplateInput
  );

  return (
    <TAuth subTitulo="Cadastra-se " titulo="CADASTRAR">
      <SignUp.Input campo="" />
      <SignUp.Input campo="email" textContentType="emailAddress" />
      <SignUp.Input campo="senha" secureTextEntry textContentType="password" />
      <SignUp.Submit textButton="CADASTRAR" />
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
