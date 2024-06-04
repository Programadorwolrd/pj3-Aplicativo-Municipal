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
    a: {
      true: {
        color: '$gray8Dark',
        textDecorationLine: 'underline',
      },
    },
    preRegs: {
      p: {
        fontSize: '$8',
        color: 'white',
        fontFamily: '$paiaFino',
        textalign: 'center',
      },
      h3: {
        fontFamily: '$outfitBold',
        fontSize: '$10',
        color: 'white',
      },
      h1: {
        fontFamily: '$outfitBold',
        fontSize: '$9',
      },
    },
  },
} as const);

export type TextCustomProps = GetProps<typeof TextCustom>;
