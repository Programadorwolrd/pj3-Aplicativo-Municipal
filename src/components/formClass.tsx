import { Link, type Href } from 'expo-router';
import { useEffect, useState, type ReactNode } from 'react';
import {
  Form as FormTamagui,
  Input as InputTamagui,
  styled,
  Text,
  View,
  XStack,
  YStack,
  type InputProps,
} from 'tamagui';
import { ButtonCustom } from './buttonCustom';
import IconGoogle from '@/assets/iconGoogle.svg';
import IconFacebook from '@/assets/iconFacebook.svg';
import { useApi, type UseOptions } from '@/lib/axiosApi';
import type { Axios } from 'axios';
import type { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import axios from 'axios';

interface LinkEndProps {
  link: {
    text: string;
    href: Href<'pathname'>;
    textLink: string;
  };
  textButton: string;
  children: ReactNode[] | ReactNode;
}

const InputCustom = styled(InputTamagui, {
  size: '$4.5',
  borderWidth: 1.7,
  borderColor: '$green9Light',
  backgroundColor: '$green4Light',
  focusStyle: {
    borderColor: 'green',
  },
  color: 'black',
  width: '100%',
} as const);

interface Campos {
  [key: string]: [(t: string) => boolean | Promise<boolean>, string | null][];
}

// classe
// ELA AINDA SERÁ REFATORADA
export class FormAuth<V extends Campos, D, E> {
  private allValues = {} as { [key in keyof V]: string };
  private mutationPost: UseMutationResult;

  constructor(
    private campos: V,
    private axiosOnSubmit: (
      axios: Axios
    ) => UseOptions<'mutate', D, E, typeof this.allValues>
  ) {
    this.mutationPost = useApi('mutate', axiosOnSubmit);

    // para não perder o contexto
    this.onSubmit = this.onSubmit.bind(this);
    this.useValidador = this.useValidador.bind(this);
    this.Input = this.Input.bind(this);
    this.MessageError = this.MessageError.bind(this);
    this.ButtonSubmit = this.ButtonSubmit.bind(this);
    this.Form = this.Form.bind(this);
  }

  private onSubmit() {
    this.mutationPost.mutateAsync(this.allValues);
  }

  private useValidador(campoNome: string, value: string) {
    const [aviso, setAviso] = useState<null | string>(null);

    // ele tem 3 respostas
    // string vazia significa que passou no teste
    // null quer dizer que o campo está vazio
    // com texto quer dizer que n foi valido

    useEffect(() => {
      (async () => {
        if (!value) return setAviso(null);

        for (const regras of this.campos[campoNome]) {
          const [isValid, texto] = regras;

          if (!(await isValid(value))) {
            return setAviso(texto);
          }
        }

        setAviso('');
      })();
    }, [value]);

    return aviso;
  }

  public Input({ campo, ...props }: InputProps & { campo: keyof V & string }) {
    const [value, setValue] = useState('');

    this.allValues[campo] = value;
    const aviso = this.useValidador(campo, value);
    const color = aviso ? 'red' : 'green';
    const textoAviso = aviso === '' ? `${campo} valido` : aviso;

    return (
      <View>
        <InputCustom
          placeholder={campo}
          {...props}
          value={value}
          onChangeText={setValue}
        />
        {textoAviso ? (
          <Text marginStart={10} color={color}>
            {textoAviso}
          </Text>
        ) : (
          <Text opacity={0}>paia</Text>
        )}
      </View>
    );
  }

  private ButtonSubmit(props: { text: string }) {
    // const [isValid, setValid] = useState(false);

    // useEffect(() => {
    //   (async () => {
    //     for (const [key, validadores] of Object.entries(this.campos)) {
    //       const value = this.allValues[key as keyof V];

    //       for (const [validador] of validadores) {
    //         if (!(await validador(value || ''))) continue;
    //       }

    //       setValid(true);
    //     }
    //   })();
    // }, []);

    return (
      <FormTamagui.Trigger asChild>
        <ButtonCustom marginTop='$5'>{props.text}</ButtonCustom>
      </FormTamagui.Trigger>
    );
  }

  private MessageError() {
    let error = this.mutationPost.error?.message;

    if (axios.isAxiosError(this.mutationPost.error)) {
      const {response, name} = this.mutationPost.error;

      error = response?.data.message || response?.statusText || error;
    }

    const [message, setMessage] = useState(error);

    useEffect(() => {
      const id = setTimeout(() => {
        setMessage('');
      }, 5000);

      return () => clearTimeout(id);
    }, []);

    return (
      <View height={40} alignSelf='baseline' justifyContent='center'>
        <Text fontSize={'$6'} color={'red'}>
          {message}
        </Text>
      </View>
    );
  }

  public Form({ link: { href, textLink, text }, children, textButton }: LinkEndProps) {
    return (
      <FormTamagui w={'100%'} alignItems='center' onSubmit={this.onSubmit}>
        <this.MessageError />

        <YStack width={'100%'} gap={10}>
          {children}
        </YStack>
        <YStack width={'100%'} alignItems='center'>
          <this.ButtonSubmit text={textButton} />
          <YStack width={'100%'} alignItems='center'>
            <Text fontFamily={'$outfitBold'} fontSize={17} marginVertical={18}>
              OU
            </Text>
            <XStack gap={30}>
              <IconGoogle width={40} height={40} />
              <IconFacebook width={40} height={40} />
            </XStack>
          </YStack>
        </YStack>
        <Text fontSize={15} mt={30}>
          {text}
          <Link href={href}>
            {' '}
            <Text
              textDecorationLine='underline'
              color={'green'}
              fontFamily={'$outfitBold'}
            >
              {textLink}
            </Text>
          </Link>
        </Text>
      </FormTamagui>
    );
  }
}
