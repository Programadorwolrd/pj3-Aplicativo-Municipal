import { Form, Input, styled, type GetProps } from 'tamagui';
import { Image, Text, withStaticProperties, XStack, YStack } from 'tamagui';
import { TextCustom } from './textCustom';
import { Link, type Href } from 'expo-router';
import type { ReactNode } from 'react';
import { Facebook } from '@tamagui/lucide-icons';
import { ButtonCustom } from './buttonCustom';
import { Svg, SvgUri } from 'react-native-svg';

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
        <YStack >
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

const TAuth = withStaticProperties(ComponenteTemplateAuth, {
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
