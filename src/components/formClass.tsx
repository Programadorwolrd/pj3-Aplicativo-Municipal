import { useEffect, useReducer, useRef, useState } from "react";
import {
  type FormProps,
  Form as FormTamagui,
  Input,
  styled,
  Text,
  YStack,
  type InputProps,
  Spinner,
} from "tamagui";
import { ButtonCustom } from "./buttonCustom";

import type { AxiosInstance } from "axios";
import type {
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { Alert, Platform } from "react-native";
import useApi from "@/lib/useApi";

export class FormAuth<C extends ValidacaoOptions> {
  private AllValuesRef = useRef({} as Record<keyof C, string>).current;
  private isFormValid = useRef({} as Record<string, boolean>).current;
  private useApiForm!: UseMutationResult;

  constructor(private options: FormOptions<C>) {
    this.useApiForm = useApi("mutate", options.onSubmit) as UseMutationResult;
  }

  private AvisoEValidador = (props: { campo: string; value: string }) => {
    const [aviso, setAviso] = useState("");

    const arrayDeValidacao = this.options.campos[props.campo];

    useEffect(() => {
      if (arrayDeValidacao == null) return;

      const ValidarCampo = async () => {
        try {
          for await (const [condi, avisoDaCondi] of arrayDeValidacao) {
            if (await condi(props.value)) throw avisoDaCondi; //se atender a condição do erro ele lança uma execao com o texto do aviso

            this.isFormValid[props.campo] = true;
            setAviso("");
          }
        } catch (error) {
          if (typeof error == "string") {
            this.isFormValid[props.campo] = false;
            setAviso(error);
          }
        }
      };

      ValidarCampo();
    }, [props.value]);

    const color = aviso ? "red" : "green";
    return (
      <Text fontSize={"$4"} fontFamily={"$paiaNormal"} color={color}>
        {aviso || `${props.campo} valido`}
      </Text>
    );
  };

  private onSubmit = () => {
    const isNotValid = Object.values(this.isFormValid).includes(false);

    if (isNotValid) {
      Platform.OS === "web"
        ? alert("formulario invalido")
        : Alert.alert("formulario invalido", "finalize o formulario");

      return;
    }

    this.useApiForm.mutate(this.AllValuesRef);
  };

  public Submit = (props: { textButton: string }) => {
    const { isPending } = this.useApiForm;

    return (
      <FormTamagui.Trigger asChild disabled={isPending}>
        <ButtonCustom disabled={isPending} marginLeft="-2%" width="104%">
          {isPending ? "aguarde" : props.textButton}
          {isPending && <Spinner size="large" color={"$blue10Dark"} />}
        </ButtonCustom>
      </FormTamagui.Trigger>
    );
  };

  public Input = ({
    campo,
    ...props
  }: InputProps & { campo: keyof C & string }) => {
    const [value, setValue] = useState(this.AllValuesRef[campo] || "");
    this.AllValuesRef[campo] = value;

    return (
      <YStack w="100%">
        <Text
          fontSize={"$2"}
          color="green"
          mb="$1.5"
          fontFamily={"$outfitBold"}
        >
          {campo.toUpperCase()}:
        </Text>
        <InputStyled
          value={value}
          onChangeText={setValue}
          {...props}
          placeholder={campo}
        />
        <this.AvisoEValidador campo={campo} value={value} />
      </YStack>
    );
  };

  public Form = ({ children, ...props }: Omit<FormProps, "onSubmit">) => (
    <FormTamagui
      w={"100%"}
      alignItems="center"
      {...props}
      onSubmit={this.onSubmit}
    >
      <YStack width={"100%"} gap={"$4"}>
        {children}
      </YStack>
    </FormTamagui>
  );
}

const InputStyled = styled(Input, {
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
});

type ValidacoesCampo =
  | [(t: string) => boolean | Promise<boolean>, string][]
  | null;

type FormOptions<C> = {
  campos: C;
  onSubmit: (axios: AxiosInstance) => UseMutationOptions<
    unknown,
    Error,
    {
      [key in keyof C]: string;
    }
  > & { notlogoutIfNotAuthorized: boolean };
};

export type ValidacaoOptions = { [key: string]: ValidacoesCampo };
