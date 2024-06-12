import { GetProps, Input, Spinner, styled, Text, YStack } from "tamagui";
import { FormPaia, Options, TemplateInputProps } from "./FormClass";

// Input
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
}) as unknown as typeof Input;

// TemplateInput
function AvisoPaia(p: TemplateInputProps) {
  return (
    <YStack w="100%">
      <Text fontSize={"$2"} color="green" mb="$1.5" fontFamily={"$outfitBold"}>
        {p.campo.toUpperCase()}:
      </Text>
      {p.children}
      {p.isError && <Text>{p.aviso}</Text>}
      {p.isValid && <Text color={"red"}>{p.campo} valido</Text>}
      {p.isLoading && (
        <Text>
          <Spinner /> aguarde...
        </Text>
      )}
    </YStack>
  );
}

// class extendida do FormPaia com os Input e AvisoType definido
export class FormPaiado<C extends string> extends FormPaia<
  C,
  GetProps<typeof InputPaia>
> {
  constructor(options: Options<C>) {
    super(options, InputPaia, AvisoPaia);
  }
}
