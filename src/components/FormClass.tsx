import { FC, PropsWithChildren, useEffect, useRef, useState } from "react";
import type {
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import useApi, { CallbackAxios } from "@/lib/useApi";
import { TextInputProps } from "react-native";

export class FormPaia<C extends string, Inp extends InputBase> {
  private values = useRef({} as ObjC<C, string>).current;
  private useApiPaia: UseMutation<typeof this.values>["result"];

  constructor(
    private options: Options<C>,
    private InputType: FC<Inp>,
    private TemplateInput: FC<TemplateInputProps>
  ) {
    this.useApiPaia = useApi("mutate", options.submitOptions);
  }

  /*
   * função para submeter o formulário
   */
  public submit = () => this.useApiPaia.mutate(this.values);

  /*
   * componente que rerenderiza o que estiver dentro com as informações da tentativa de submissão
   */
  public Escutar = ({ children: C }: EscutarPropsPaia<C>) => (
    <C mutation={this.useApiPaia} />
  );

  /*
   * Componente do Input com toda lógica de validação
   */
  public Input = ({ value, campo, ...props }: Inp & { campo: C }) => {
    const [valueInput, setValuesInput] = useState(this.values[campo]);
    const infoValidy = this.useValid(value || "", campo);

    this.values[campo] = valueInput;

    return (
      <this.TemplateInput campo={campo} {...infoValidy}>
        <this.InputType
          {...(props as unknown as Inp)}
          value={value}
          onChangeText={(v) => setValuesInput(v)}
        />
      </this.TemplateInput>
    );
  };

  /**
   *  Hook que cuida de validar os valores do input
   */
  private useValid(value: string, campo: C) {
    const [aviso, setAviso] = useState<StateValues<typeof State>>(State.EMPTY);

    useEffect(() => {
      setAviso(State.LOADING);

      const timeoutId = setTimeout(async () => {
        const validadoresDoCampo = this.options.campos?.[campo];
        if (!validadoresDoCampo) return setAviso(State.EMPTY); // não existe validacao para esse campo

        for await (const [verify, avisoDoErro] of validadoresDoCampo) {
          if (await verify(value)) {
            return setAviso(avisoDoErro); // ERROR
          }
        }

        // se passou nos testes seta null como sucesso
        setAviso(State.SUCCESS);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }, [value]);

    return {
      aviso,
      isLoading: aviso == State.LOADING,
      isError: aviso instanceof String,
      isValid: aviso === State.SUCCESS,
    };
  }
}

// 

// AVISO: tipagem abaixo

//

export type TemplateInputProps = PropsWithChildren<{
  campo: string;
  aviso: StateValues<typeof State>;
  isLoading: boolean;
  isError: boolean;
  isValid: boolean;
}>;

const State = {
  LOADING: false,
  SUCCESS: true,
  EMPTY: null,
  ERROR: new String(), // qualquer string é considerado erro
} as const;

type StateValues<O> = {
  [K in keyof O]: O[K];
}[keyof O];

type ValidacoesCampo =
  | [(t: string) => boolean | Promise<boolean>, string][]
  | null;

type ObjC<C extends string, Value> = {
  [K in C]: Value;
};

type Options<C extends string> = {
  campos: ObjC<C, ValidacoesCampo>;
  submitOptions: CallbackAxios<UseMutation<ObjC<C, string>>["options"]>;
};

type UseMutation<objC> = {
  options: UseMutationOptions<unknown, Error, objC>;
  result: UseMutationResult<unknown, Error, objC>;
};

type EscutarPropsPaia<C extends string> = {
  children: FC<{ mutation: UseMutation<ObjC<C, string>>["result"] }>;
};

type InputBase = Pick<TextInputProps, "value" | "onChangeText">;
