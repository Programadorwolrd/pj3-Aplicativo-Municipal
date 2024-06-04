import { Button, styled, type GetProps } from 'tamagui';

export const ButtonCustom = styled(Button, {
  fontFamily: '$outfitBold',
  fontSize: '$8',
  alignItems: 'center',
  justifyContent: 'center',
  // textalign: "center",

  color: 'white',
  width: '100%',
  borderRadius: '$6',
  size: '$4.5',

  backgroundColor: '$green11Light',
  pressStyle: {
    borderColor: '$black2',
    backgroundColor: '$green9Light',
  },
  hoverStyle: {
    borderColor: '$black2',
    backgroundColor: '$green9Light',
  },

  disabledStyle: {
    backgroundColor: '$green5Light',
  },

  variants: {
    bgOpaco: {
      true: {
        backgroundColor: '$white025',
        pressStyle: {
          backgroundColor: '$white10',
        },
      },
    },
  },
} as const);

export type ButtonCustomProps = GetProps<typeof ButtonCustom>;
