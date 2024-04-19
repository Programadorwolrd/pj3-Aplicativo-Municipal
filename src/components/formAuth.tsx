import { withStaticProperties, YStack, type GetProps } from 'tamagui';
import type { PropsWithChildren } from 'react';
import { ButtonCustom } from './buttonCustom';
import { InputCustom } from './InputCustom';

function FormAuth({ children, gap = 20 }: PropsWithChildren<{ gap?: number }>) {
  return (
    <YStack width={'100%'} gap={gap}>
      {children}
    </YStack>
  );
}

export const FAuth = withStaticProperties(FormAuth, {
  I: InputCustom,
  B: ButtonCustom,
});

export type ButtonCustomProps = GetProps<typeof ButtonCustom>;
