import { GetProps, Input, InputProps, Spinner, Text, YStack } from "tamagui";
import {
  FormPaia,
  Options,
  TemplateInputProps,
  ValidacoesCampo,
} from "./FormClass";
import { ButtonCustom } from "./buttonCustom";
import { validsPaia } from "@/lib/allValids";

type ValidKeys = keyof typeof validsPaia;
// class extendida do FormPaia com os Input e AvisoType definido
export class FormPaiado<C extends string = ValidKeys> extends FormPaia<
  C,
  GetProps<typeof InputPaia>
> {
  constructor(
    submitOptions: Options<C>["submitOptions"],
    camposAdd?: Record<C, ValidacoesCampo>
  ) {
    const campos = camposAdd ?? (validsPaia as Record<C, ValidacoesCampo>);

    super({ campos, submitOptions }, InputPaia, AvisoPaia);
  }

  /**
   * ButtonSubmit
   */
  public ButtonSubmit = (props: { text: string }) => {
    const { isPending } = this.useApiPaia;

    return (
      <ButtonCustom
        disabled={isPending}
        marginLeft="-2%"
        mt={"$4"}
        width="104%"
        onPress={this.submit}
      >
        {isPending ? "aguarde" : props.text}
        {isPending && <Spinner size="large" color={"$blue10Dark"} />}
      </ButtonCustom>
    );
  };
}

/**
 * VIEW que vai em volta do input
 */
function AvisoPaia(props: TemplateInputProps) {
  const { aviso, campo, children, isValid, isLoading } = props;

  const [color, texto] = (isValid && ["green", `${campo} valido`]) ||
    (isLoading && ["#FFA500", "validando..."]) ||
    (aviso && ["red", aviso]) || ["", " "]; // pratico, mas feio

  return (
    <YStack w="100%" mb={"$2"}>
      <Text fontSize={"$2"} color="green" mb="$1.5" fontFamily={"$outfitBold"}>
        {campo.toUpperCase()}:
      </Text>
      {children}
      <Text fontSize={"$4"} mt={"$1"} color={color}>
        {texto}
      </Text>
    </YStack>
  );
}

/**
 * Modelo padrao de input
 */
export function InputPaia(props: InputProps) {
  return (
    <Input
      size="$4.5"
      borderWidth={1.7}
      borderColor="$green9Light"
      backgroundColor="$green4Light"
      color="black"
      marginLeft="-2%"
      width="104%"
      focusStyle={{ borderColor: "green" }}
      hoverStyle={{ borderColor: "green" }}
      {...props}
    />
  );
}
