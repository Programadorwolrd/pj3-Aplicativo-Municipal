import {
  ComponentType,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import type {
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import useApi, { CallbackAxios } from "@/lib/useApi";
import { TextInputProps } from "react-native";

const TIMEOUT_VALIDY = 500;

export class FormPaia<C extends string, Inp extends InputMinimoProps> {
  private values = useRef({} as ObjC<C, string>).current;
  private useApiPaia: UseMutation<typeof this.values>["result"];

  constructor(
    private options: Options<C>,
    private InputType: InputMinimo<Inp>,
    private TemplateInput: ComponentType<TemplateInputProps>
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
  public Input = ({ campo, ...props }: Inp & { campo: C }) => {
    const [valueInput, setValuesInput] = useState(this.values[campo] || "");
    const infoValidy = this.useValid(valueInput, campo);

    this.values[campo] = valueInput;

    return (
      <this.TemplateInput campo={campo} {...infoValidy}>
        <this.InputType
          {...(props as unknown as Inp)}
          value={valueInput}
          onChangeText={(v) => setValuesInput(v)}
        />
      </this.TemplateInput>
    );
  };

  /**
   *  Hook que cuida de validar os valores do input
   */
  private useValid(value: string, campo: C) {
    const [validy, setValidy] = useState<StateValues<typeof State>>(
      State.EMPTY
    );

    useEffect(() => {
      setValidy(State.LOADING);
      const validadoresDoCampo = this.options.campos?.[campo];
      if (!validadoresDoCampo) return setValidy(State.EMPTY); // não existe validacao para esse campo

      const timeoutId = setTimeout(async () => {
        for await (const [verify, avisoDoErro] of validadoresDoCampo) {
          if (await verify(value)) {
            return setValidy(avisoDoErro); // ERROR
          }
        }

        // se passou nos testes seta null como sucesso
        setValidy(State.SUCCESS);
      }, TIMEOUT_VALIDY);

      return () => clearTimeout(timeoutId);
    }, [value]);

    const isError = typeof validy == "string";

    return {
      aviso: isError ? validy : null,
      isLoading: validy == State.LOADING,
      isValid: validy === State.SUCCESS,
    };
  }
}

//

// AVISO: tipagem abaixo

//

export type TemplateInputProps = PropsWithChildren<{
  campo: string;
  aviso: string | null;
  isLoading: boolean;
  isValid: boolean;
}>;

const State = {
  LOADING: 0,
  SUCCESS: 1,
  EMPTY: 2,
  ERROR: "", // qualquer string é considerado erro
};

type StateValues<O> = {
  [K in keyof O]: O[K];
}[keyof O];

export type ValidacoesCampo =
  | [(t: string) => boolean | Promise<boolean>, string][]
  | null;

type ObjC<C extends string, Value> = {
  [K in C]: Value;
};

export type Options<C extends string> = {
  campos: ObjC<C, ValidacoesCampo>;
  submitOptions: CallbackAxios<UseMutation<ObjC<C, string>>["options"]>;
};

type UseMutation<objC> = {
  options: UseMutationOptions<unknown, Error, objC>;
  result: UseMutationResult<unknown, Error, objC>;
};

type EscutarPropsPaia<C extends string> = {
  children: ComponentType<{ mutation: UseMutation<ObjC<C, string>>["result"] }>;
};

export type InputMinimoProps = Pick<TextInputProps, "value" | "onChangeText">;
type InputMinimo<P = InputMinimoProps> = ComponentType<P>;
