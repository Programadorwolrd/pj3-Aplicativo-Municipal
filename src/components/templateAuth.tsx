import { YStack } from 'tamagui';
import type { ReactNode } from 'react';
import { TextCustom } from './textCustom';

interface PropsAuth {
  titulo: string;
  subTitulo: string;
  children: ReactNode[] | ReactNode;
}

export default function TemplateAuth({ subTitulo, titulo, children }: PropsAuth) {
  return (
    <YStack
      fullscreen
      marginTop='15%'
      paddingVertical={'$5'}
      paddingHorizontal={40}
      backgroundColor={'$white2'}
    >
      <YStack marginBottom={'$6'}>
        <TextCustom H1>{titulo}</TextCustom>
        <TextCustom H4>{subTitulo}</TextCustom>
      </YStack>
      <YStack width={'100%'} gap={20} justifyContent='center' alignItems='center'>
        {children}
      </YStack>
    </YStack>
  );
}
