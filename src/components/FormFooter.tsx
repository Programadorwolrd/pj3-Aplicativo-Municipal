import { Form, Text, XStack, YStack } from 'tamagui';
import { ButtonCustom } from './buttonCustom';
import { Link } from 'expo-router';
import IconGoogle from '@/assets/iconGoogle.svg';
import IconFacebook from '@/assets/iconFacebook.svg';

export default function FormFooter(props: {
  link: {
    text: string;
    href: string;
    textLink: string;
  };
}) {
  return (
    <>
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
          <Text textDecorationLine='underline' color={'green'} fontFamily={'$outfitBold'}>
            {props.link.textLink}
          </Text>
        </Link>
      </Text>
    </>
  );
}
