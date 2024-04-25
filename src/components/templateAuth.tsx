import { Form, Input, styled, type GetProps } from 'tamagui';
import { Image, Text, withStaticProperties, XStack, YStack } from 'tamagui';
import { TextCustom } from './textCustom';
import { Link, type Href } from 'expo-router';
import type { ReactNode } from 'react';
import { Facebook } from '@tamagui/lucide-icons';
import { ButtonCustom } from './buttonCustom';
import { Svg, SvgUri } from 'react-native-svg';
import IconGoogle from '@/assets/iconGoogle.svg';
import IconFacebook from '@/assets/iconFacebook.svg';

interface PropsAuth {
  titulo: string;
  subTitulo: string;
  children: ReactNode[] | ReactNode;
}
function ComponenteTemplateAuth({ subTitulo, titulo, children }: PropsAuth) {
  const headerBackImg = require('@/assets/headerAuth.png');

  return (
    <YStack backgroundColor={'$white2'} fullscreen>
      <Image
        source={headerBackImg}
        width={'100%'}
        height={280}
        resizeMode='stretch'
        position='absolute'
        zi={'$0'}
      />
      <YStack paddingVertical={'$5'} paddingHorizontal={'7%'} marginTop={'45%'}>
        <YStack marginBottom={'$6'}>
          <TextCustom H1>{titulo}</TextCustom>
          <TextCustom H4>{subTitulo}</TextCustom>
        </YStack>
        <YStack width={'100%'} alignItems='center'>
          {children}
        </YStack>
      </YStack>
    </YStack>
  );
}

interface LinkEndProps {
  link: {
    text: string;
    href: Href<'pathname'>;
    textLink: string;
  };
  textButton: string;
  onSubmit: () => void;
  children: ReactNode[] | ReactNode;
}
function FormAuth({
  link: { href, textLink, text },
  children,
  onSubmit,
  textButton,
}: LinkEndProps) {
  return (
    <Form w={'100%'} alignItems='center' onSubmit={onSubmit}>
      <YStack width={'100%'} gap={15}>
        {children}
      </YStack>
      <YStack width={'100%'} alignItems='center'>
        <Form.Trigger asChild>
          <ButtonCustom marginTop='$5'>{textButton}</ButtonCustom>
        </Form.Trigger>
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
      <Text fontSize={15} mt={50}>
        {text}
        <Link href={href}>
          {' '}
          <Text textDecorationLine='underline' color={'green'} fontFamily={'$outfitBold'}>
            {textLink}
          </Text>
        </Link>
      </Text>
    </Form>
  );
}

const TAuth = withStaticProperties(ComponenteTemplateAuth, {
  Form: FormAuth,
  InputAuth: styled(Input, {
    size: '$5r',
    borderWidth: 1.5,
    borderColor: '$green9Light',
    backgroundColor: '$green4Light',
    focusStyle: {
      borderColor: 'green',
    },
    color: 'black',
    width: '100%',
  } as const),
});
export default TAuth;
