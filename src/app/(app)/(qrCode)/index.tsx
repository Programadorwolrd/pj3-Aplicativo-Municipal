import { Link, router } from 'expo-router';
import { XStack, Text } from 'tamagui';
import { Button, type GetProps, Input, styled } from 'tamagui';

export default function Index() {
  return (
    <XStack fullscreen >
      <Button
        margin='auto'
        theme={'green_active'}
        width={150}
        onPress={() => router.navigate('/(app)/(qrCode)/123')}
      >
        paia triste :C
      </Button>
    </XStack>
  );
}
