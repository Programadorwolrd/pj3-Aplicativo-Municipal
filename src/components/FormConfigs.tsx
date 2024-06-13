import {
  Form,
  FormProps,
  GetProps,
  Input,
  InputProps,
  Spinner,
  styled,
  TamaguiComponent,
  Text,
  YStack,
} from "tamagui";
import { FormPaia, Options, TemplateInputProps } from "./FormClass";
import { ValidacoesCampo } from "@/components/FormClass";
import { ButtonCustom } from "./buttonCustom";

/**
 * validações de campos pre definidas
 */
const validsPaia = {
  email: [
    [(t) => t.length < 1, "Insira um email"],
    [(t) => t.length > 64, "Máx. 64 caracteres"],
    [(t) => !/^[a-zA-Z0-9._%+-]+/.test(t), "Caractere inválido no início"],
    [(t) => !/@[a-zA-Z0-9.-]+\./.test(t), "Formato de email inválido"],
    [(t) => !/[a-zA-Z]{2,}$/.test(t), "Terminação inválida"],
  ],
  apelido: [
    [(t) => t.length < 1, "Insira um apelido/nome"],
    [(t) => t.length < 3 || t.length > 40, "Entre 3 e 40 caracteres"],
    [
      (t) => !/^[a-zA-Z\s\d]{3,40}$/.test(t),
      "Apenas letras, números e espaços",
    ],
  ],
  senha: [
    [(t) => t.length < 1, "Insira uma senha"],
    [(t) => t.length < 4 || t.length > 40, "Entre 4 e 40 caracteres"],
  ],
} satisfies { [K: string]: ValidacoesCampo };
type ValidKeys = keyof typeof validsPaia;

/**
 * Modelo padrao de input
 */
const InputPaia = styled(Input, {
  size: "$4.5",
  borderWidth: 1.7,
  borderColor: "$green9Light",
  backgroundColor: "$green4Light",
  color: "black",
  marginLeft: "-2%",
  width: "104%",
  focusStyle: {
    borderColor: "green",
  },
  hoverStyle: {
    borderColor: "green",
  },
}) as TamaguiComponent<InputProps>;
type InputPaiaProps = InputProps;

/**
 * VIEW que vai em volta do input
 */
function AvisoPaia(props: TemplateInputProps) {
  const { aviso, campo, children, isValid, isLoading } = props;

  const [color, texto] =
    (isValid && ["green", `${campo} valido`]) ||
    (isLoading && ["orange", "validando..."]) ||
    (aviso && ["red", aviso]) ||
    ['', ' ']; // pratico, mas feio

  return (
    <YStack w="100%">
      <Text fontSize={"$2"} color="green" mb="$1.5" fontFamily={"$outfitBold"}>
        {campo.toUpperCase()}:
      </Text>
      {children}
      <Text color={color}>{texto}</Text>
    </YStack>
  );
}

// class extendida do FormPaia com os Input e AvisoType definido
export class FormPaiado extends FormPaia<
  ValidKeys,
  GetProps<typeof InputPaia>
> {
  constructor(submitOptions: Options<ValidKeys>["submitOptions"]) {
    super(
      {
        campos: validsPaia,
        submitOptions,
      },
      InputPaia,
      AvisoPaia
    );
  }

  /**
   * ButtonSubmit
   */
  public ButtonSubmit = (props: { text: string }) => {
    const isLoading = false;

    return (
      <Form.Trigger asChild disabled={isLoading}>
        <ButtonCustom disabled={isLoading} marginLeft="-2%" width="104%">
          {isLoading ? "aguarde" : props.text}
          {isLoading && <Spinner size="large" color={"$blue10Dark"} />}
        </ButtonCustom>
      </Form.Trigger>
    );
  };

  /**
   * Form
   */
  public Form = (props: Omit<FormProps, "onSubmit">) => {
    return (
      <Form w={"100%"} alignItems="center" {...props} onSubmit={this.submit}>
        <YStack width={"100%"} gap={"$4"}>
          {props.children}
        </YStack>
      </Form>
    );
  };
}
