import { styled, Text, type GetProps } from 'tamagui';

export const TextAuth = styled(Text, {
  color: 'green',

  variants: {
    H1: {
      true: {
        fontFamily: '$outfitBold',
        fontSize: '$9',
      },
    },
    H4: {
      true: {
        color: '$gray11Light',
        fontFamily: '$paiaFeliz',
        fontSize: '$6',
      },
    },
  },
} as const);

export type TextAuthProps = GetProps<typeof TextAuth>;
