import { Link, type Href } from 'expo-router';
import { useEffect, useState, type PropsWithChildren, type ReactNode } from 'react';
import {
  Form as FormTamagui,
  Input,
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

interface Campos {
  [key: string]: [(t: string) => boolean | Promise<boolean>, string][] | null;
}

// refatorei, mas acho que piorou
export class FormAuth<C extends Campos> {
  private useStateAllValues = useState({} as { [key in keyof C]: string });
  private mutationPost: UseMutationResult;

  constructor(
    private campos: C,
    private axiosOnSubmit: (
      axios: Axios
    ) => UseOptions<'mutate', unknown, unknown, (typeof this.useStateAllValues)[0]>
  ) {
    this.mutationPost = useApi('mutate', this.axiosOnSubmit);
  }

  private Validacao = (props: { campo: string; value: string | undefined }) => {
    const [aviso, setAviso] = useState<string | null>(null);

    if (props.value === undefined || this.campos[props.campo] === null)
      return <Text opacity={0}>paia</Text>;

    (async () => {
      for (const [validadorDoCampo, avisoDaValidacao] of this.campos[props.campo] || []) {
        const result = await validadorDoCampo(props.value || '');

        if (!result) {
          return setAviso(avisoDaValidacao);
        }
      }

      if (aviso !== '') setAviso('');
    })();

    const color = aviso ? 'red' : 'green';
    return (
      <Text marginStart={10} color={color}>
        {aviso || `${props.campo} valido`}
      </Text>
    );
  };

  private MessageError = () => {
    const [message, setMessage] = useState('');
    const errorFetch = this.mutationPost.error;
    const errorAxios = axios.isAxiosError(errorFetch) && errorFetch.response?.data;

    useEffect(() => {
      setMessage(errorAxios || errorFetch?.message);

      const id = setTimeout(() => {
        setMessage('');
      }, 3000);

      return () => clearTimeout(id);
    }, []);

    return (
      <View height={40} alignSelf='baseline' justifyContent='center'>
        <Text fontSize={'$6'} color={'red'}>
          {message}
        </Text>
      </View>
    );
  };

  public Form = ({ children }: PropsWithChildren) => {
    const [allValues] = this.useStateAllValues;

    return (
      <FormTamagui
        w={'100%'}
        alignItems='center'
        onSubmit={() => this.mutationPost.mutate(allValues)}
      >
        <this.MessageError />

        <YStack width={'100%'} gap={5}>
          {children}
        </YStack>
      </FormTamagui>
    );
  };

  public Input = ({
    campo,
    persistValue = false,
    ...props
  }: InputProps & { campo: keyof C & string; persistValue?: boolean }) => {
    const [{ [campo]: defaultValue }, setAllV] = this.useStateAllValues;
    const [value, setValue] = useState(persistValue ? defaultValue : undefined);

    useEffect(() => {
      setAllV((all) => {
        if (value) all[campo] = value;

        return all;
      });
    }, [value]);

    return (
      <View>
        <Input
          size='$4.5'
          borderWidth={1.7}
          borderColor='$green9Light'
          backgroundColor='$green4Light'
          color='black'
          width='100%'
          focusStyle={{
            borderColor: 'green',
          }}
          placeholder={campo}
          {...props}
          value={value}
          onChangeText={setValue}
        />
        <this.Validacao campo={campo} value={value} />
      </View>
    );
  };

  public Submit = (props: { textButton: string }) => {
    return (
      <FormTamagui.Trigger asChild>
        <ButtonCustom marginTop='$5'>{props.textButton}</ButtonCustom>
      </FormTamagui.Trigger>
    );
  };

  public Footer = (props: {
    link: {
      text: string;
      href: Href<'pathname'>;
      textLink: string;
    };
    textButton: string;
  }) => {
    return (
      <>
        <this.Submit textButton={props.textButton} />
        <YStack width={'100%'} alignItems='center'>
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
        <Text fontSize={15} mt={30} textAlign='center'>
          {props.link.text}
          <Link href={props.link.href}>
            {' '}
            <Text
              textDecorationLine='underline'
              color={'green'}
              fontFamily={'$outfitBold'}
            >
              {props.link.textLink}
            </Text>
          </Link>
        </Text>
      </>
    );
  };
}

export const allvalids: Campos = {
  email: [
    [(t) => t.length <= 64, 'o email deve ter entre 10 a 50 caracteres'],
    [(t) => /^[a-zA-Z0-9._%+-]+/.test(t), 'O email deve começar com caracteres válidos'],
    [
      (t) => /@[a-zA-Z0-9.-]+\./.test(t),
      'O email deve conter "@" seguido de caracteres válidos e "."',
    ],
    [
      (t) => /[a-zA-Z]{2,}$/.test(t),
      'O email deve terminar com pelo menos duas letras após o "."',
    ],
  ],
  apelido: [
    [(t) => /^.{3,40}$/.test(t), 'O apelido deve ter entre 3 e 40 caracteres'],
    [
      (t) => /^[a-zA-Z\s\d]{3,40}$/.test(t),
      'O apelido deve conter apenas letras, números e espaços',
    ],
  ],
  senha: [[(t) => /^.{4,40}$/.test(t), 'A senha deve ter entre 4 e 40 caracteres']],
};
