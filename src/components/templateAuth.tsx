import { Image, Text, withStaticProperties, YStack } from 'tamagui';
import { TextCustom } from './textCustom';
import { Link, type Href } from 'expo-router';
import type { ReactNode } from 'react';

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
      <YStack paddingVertical={'$5'} paddingHorizontal={40} marginTop={'45%'}>
        <YStack marginBottom={'$6'}>
          <TextCustom H1>{titulo}</TextCustom>
          <TextCustom H4>{subTitulo}</TextCustom>
        </YStack>
        <YStack width={'100%'} gap={20} justifyContent='center' alignItems='center'>
          {children}
        </YStack>
      </YStack>
    </YStack>
  );
}

interface LinkEndProps {
  href: Href<'pathname'>;
  textLink: string;
}
function LinkEnd({ href, textLink }: LinkEndProps) {
  return (
    <Link href={href}>
      {' '}
      <Text textDecorationLine='underline' color={'green'}>
        {textLink}
      </Text>
    </Link>
  );
}

const TemplateAuth = withStaticProperties(ComponenteTemplateAuth, {
  LinkEnd,
});
export default TemplateAuth;
