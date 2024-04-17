import { withStaticProperties, YStack, type GetProps } from 'tamagui';
import type { PropsWithChildren } from 'react';
import { ButtonCustom } from './buttonCustom';
import { InputCustom } from './InputCustom';

function FormAuth({ children }: PropsWithChildren) {
  return (
    <YStack width={'100%'} gap={20}>
      {children}
    </YStack>
  );
}

export const FAuth = withStaticProperties(FormAuth, {
  I: InputCustom,
  B: ButtonCustom,
});

export type ButtonCustomProps = GetProps<typeof ButtonCustom>;
