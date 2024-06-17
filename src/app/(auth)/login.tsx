import { storeAuth } from "@/lib/logicAuth";
import TAuth from "@/components/templateAuth";
import FormFooter from "@/components/FormFooter";
import { FormPaiado } from "@/components/FormConfigs";

export default function Login() {
  const login = storeAuth((s) => s.login);

  const Auth = new FormPaiado(
    (axios) => ({
      async mutationFn(allValues) {
        const { data } = await axios.post("/usuario/login", allValues);

        login(data.token);
      },
    }),
    {
      email: null,
      senha: null,
    }
  );

  return (
    <TAuth subTitulo="texto pequeno e triste" titulo="Entrar">
      <Auth.Input campo="email" textContentType="emailAddress" />
      <Auth.Input campo="senha" secureTextEntry textContentType="password" />
      <Auth.ButtonSubmit text="ENTRAR" />

      <FormFooter
        link={{
          href: "/(auth)/cadastrar",
          text: "Não tem cadastro?",
          textLink: "cadastre-se aqui!",
        }}
      />
    </TAuth>
  );
}
