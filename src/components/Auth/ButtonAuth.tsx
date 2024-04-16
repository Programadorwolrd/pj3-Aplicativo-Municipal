import { router, type Href } from 'expo-router';
import { Button, styled, type GetProps } from 'tamagui';

export const ButtonAuth = styled(Button, {
  fontFamily: '$outfitBold',
  fontSize: '$7',
  color: 'white',
  width: "100%",
  borderRadius: '$7',
  size:'$5',

  backgroundColor: '$green11Light',
  pressStyle: {
    borderColor: '$black2',
    backgroundColor: '$green9Light',
  },

  variants: {
    bgOpaco: {
      true: {
        backgroundColor: '$white025',
        pressStyle: {
          backgroundColor: '$green11Light',
        },
      },
    },
  },
} as const);

export type ButtonAuthProps = GetProps<typeof ButtonAuth>;
