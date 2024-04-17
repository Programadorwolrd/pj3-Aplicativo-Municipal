import { styled, Text, type GetProps } from 'tamagui';

export const TextCustom = styled(Text, {
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
    a:{
      true:{
        color: '$gray8Dark', 
        textDecorationLine: 'underline'
      }
    }
  },
} as const);

export type TextCustomProps = GetProps<typeof TextCustom>;
