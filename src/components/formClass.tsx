import { useEffect, useRef, useState } from 'react';
import {
  type FormProps,
  Form as FormTamagui,
  Input,
  styled,
  Text,
  YStack,
  type InputProps,
} from 'tamagui';
import { ButtonCustom } from './buttonCustom';

import { useApi } from '@/lib/axiosApi';
import type { AxiosInstance } from 'axios';
import type { UseMutationOptions } from '@tanstack/react-query';

export class FormAuth<C extends ValidacaoOptions> {
  private AllValuesRef = useRef({} as Record<keyof C, string>).current;
  private isFormValid = useRef({} as Record<string, boolean>).current;

  constructor(private options: FormOptions<C>) {}

  private AvisoEValidador = (props: { campo: string; value: string }) => {
    const [aviso, setAviso] = useState('');

    const arrayDeValidacao = this.options.campos[props.campo];

    useEffect(() => {
      if (arrayDeValidacao == null) return;

      const ValidarCampo = async () => {
        try {
          for await (const [condi, avisoDaCondi] of arrayDeValidacao) {
            if (await condi(props.value)) throw avisoDaCondi; //se atender a condição do erro ele lança uma execao com o texto do aviso

            this.isFormValid[props.campo] = true;
            setAviso('');
          }
        } catch (error) {
          if (typeof error == 'string') {
            this.isFormValid[props.campo] = false;
            setAviso(error);
          }
        }
      };

      ValidarCampo();
    }, [props.value]);

    const color = aviso ? 'red' : 'green';
    return (
      <Text fontSize={'$4'} fontFamily={'$paiaNormal'} color={color}>
        {aviso || `${props.campo} valido`}
      </Text>
    );
  };

  private onSubmit = () => {};

  public Input = ({ campo, ...props }: InputProps & { campo: keyof C & string }) => {
    const [value, setValue] = useState(this.AllValuesRef[campo] || '');
    this.AllValuesRef[campo] = value;

    return (
      <YStack w='100%'>
        <Text fontSize={'$2'} color='green' mb='$1.5' fontFamily={'$outfitBold'}>
          {campo.toUpperCase()}:
        </Text>
        <Input value={value} onChangeText={setValue} {...props} placeholder={campo} />
        <this.AvisoEValidador campo={campo} value={value} />
      </YStack>
    );
  };

  public Form = ({ children, ...props }: Omit<FormProps, 'onSubmit'>) => {
    return (
      <FormTamagui w={'100%'} alignItems='center' {...props} onSubmit={this.onSubmit}>
        <YStack width={'100%'} gap={'$4'}>
          {children}
        </YStack>
      </FormTamagui>
    );
  };

  public Submit = (props: { textButton: string }) => {
    return (
      <FormTamagui.Trigger asChild>
        <ButtonCustom>{props.textButton}</ButtonCustom>
      </FormTamagui.Trigger>
    );
  };
}

const InputStyled = styled(Input, {
  size: '$4.5',
  borderWidth: 1.7,
  borderColor: '$green9Light',
  backgroundColor: '$green4Light',
  color: 'black',
  marginLeft: '-2%',
  width: '104%',
  focusStyle: {
    borderColor: 'green',
  },
  hoverStyle: {
    borderColor: 'green',
  },
});

type ValidacoesCampo = [(t: string) => boolean | Promise<boolean>, string][] | null;

type FormOptions<C> = {
  campos: C;
  onSubmit: (axios: AxiosInstance) => UseMutationOptions<
    unknown,
    unknown,
    {
      [key in keyof C]: string;
    }
  > & { notlogoutIfNotAuthorized: boolean };
};

export type ValidacaoOptions = { [key: string]: ValidacoesCampo };
