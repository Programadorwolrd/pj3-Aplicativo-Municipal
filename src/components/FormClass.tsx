import {
  ComponentClass,
  FC,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

import type { AxiosInstance } from "axios";
import type {
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";

import useApi from "@/lib/useApi";
import { InputProps } from "tamagui";
import { TextInput, TextInputProps } from "react-native";

type UseMutation<objC> = {
  options: UseMutationOptions<unknown, Error, objC>;
  result: UseMutationResult<unknown, Error, objC>;
};

type InputPropsPaia<P> = P extends InputProps ? InputProps : TextInputProps;

type Options<C extends string, In> = {
  campos: {
    [key in C]: [];
  };
  InputComponent: ComponentClass<InputPropsPaia<In>> & In;
  submitOptions: (
    axios: AxiosInstance
  ) => UseMutation<{ [key in C]: string }>["options"];
};
type Values<C extends string> = {
  [key in C]: string;
};
type EscutarPropsPaia<C extends string> = {
  children: FC<{ mutation: UseMutation<Values<C>>["result"] }>;
};

// refatorando a classe para n depender do tamagui
export class FormPaia<C extends string, In> {
  private values = useRef({} as Values<C>).current;
  private useApiPaia: UseMutation<typeof this.values>["result"];

  constructor(private options: Options<C, In>) {
    this.useApiPaia = useApi("mutate", options["submitOptions"]);
  }

  public Input = ({
    value,
    campo,
    ...props
  }: InputPropsPaia<In> & { campo: C }) => {
    const [valueInput, setValuesInput] = useState(this.values[campo] || "");

    const InputPaiado = this.options.InputComponent as FC<typeof props>;
    return <InputPaiado {...props} />;
  };

  public Escutar = ({ children: Children }: EscutarPropsPaia<C>) => (
    <Children mutation={this.useApiPaia} />
  );

  public submit = () => this.useApiPaia.mutate(this.values);
}

// class FormAuthAntigo<C extends ValidacaoOptions> {
//   private AllValuesRef = useRef({} as Record<keyof C, string>).current;
//   private isFormValid = useRef({} as Record<string, boolean>).current;
//   private useApiForm!: UseMutationResult;

//   constructor(private options: FormOptions<C>) {
//     this.useApiForm = useApi("mutate", options.onSubmit) as UseMutationResult;
//   }

//   private AvisoEValidador = (props: { campo: string; value: string }) => {
//     const [aviso, setAviso] = useState("");

//     const arrayDeValidacao = this.options.campos[props.campo];

//     useEffect(() => {
//       if (arrayDeValidacao == null) return;

//       const ValidarCampo = async () => {
//         try {
//           for await (const [condi, avisoDaCondi] of arrayDeValidacao) {
//             if (await condi(props.value)) throw avisoDaCondi; //se atender a condição do erro ele lança uma execao com o texto do aviso

//             this.isFormValid[props.campo] = true;
//             setAviso("");
//           }
//         } catch (error) {
//           if (typeof error == "string") {
//             this.isFormValid[props.campo] = false;
//             setAviso(error);
//           }
//         }
//       };

//       ValidarCampo();
//     }, [props.value]);

//     const color = aviso ? "red" : "green";
//     return (
//       <Text fontSize={"$4"} fontFamily={"$paiaNormal"} color={color}>
//         {aviso || `${props.campo} valido`}
//       </Text>
//     );
//   };

//   private onSubmit = () => {
//     const isNotValid = Object.values(this.isFormValid).includes(false);

//     if (isNotValid) {
//       Platform.OS === "web"
//         ? alert("formulario invalido")
//         : Alert.alert("formulario invalido", "finalize o formulario");

//       return;
//     }

//     this.useApiForm.mutate(this.AllValuesRef);
//   };

//   public Submit = (props: { textButton: string }) => {
//     const { isPending } = this.useApiForm;

//     return (
//       <FormTamagui.Trigger asChild disabled={isPending}>
//         <ButtonCustom disabled={isPending} marginLeft="-2%" width="104%">
//           {isPending ? "aguarde" : props.textButton}
//           {isPending && <Spinner size="large" color={"$blue10Dark"} />}
//         </ButtonCustom>
//       </FormTamagui.Trigger>
//     );
//   };

//   public Input = ({
//     campo,
//     ...props
//   }: InputProps & { campo: keyof C & string }) => {
//     const [value, setValue] = useState(this.AllValuesRef[campo] || "");
//     this.AllValuesRef[campo] = value;

//     return (
//       <YStack w="100%">
//         <Text
//           fontSize={"$2"}
//           color="green"
//           mb="$1.5"
//           fontFamily={"$outfitBold"}
//         >
//           {campo.toUpperCase()}:
//         </Text>
//         <InputStyled
//           value={value}
//           onChangeText={setValue}
//           {...props}
//           placeholder={campo}
//         />
//         <this.AvisoEValidador campo={campo} value={value} />
//       </YStack>
//     );
//   };

//   public Form = ({ children, ...props }: Omit<FormProps, "onSubmit">) => (
//     <FormTamagui
//       w={"100%"}
//       alignItems="center"
//       {...props}
//       onSubmit={this.onSubmit}
//     >
//       <YStack width={"100%"} gap={"$4"}>
//         {children}
//       </YStack>
//     </FormTamagui>
//   );
// }

type ValidacoesCampo =
  | [(t: string) => boolean | Promise<boolean>, string][]
  | null;
