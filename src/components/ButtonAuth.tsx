import { router, type Href } from 'expo-router';
import { Button, styled, type GetProps } from 'tamagui';

const ButtonAuth = styled(Button, {
  fontFamily: '$outfitBold',
  fontSize: '$7',
  color: 'white',
  width: 300,
  backgroundColor: '$green11Light',

  variants: {
    bgOpaco: {
      true: {
        backgroundColor: '$brancoOpaco',
      },
    },
  },
});

export type ButtonAuthProps = GetProps<typeof ButtonAuth>;
export default ButtonAuth;
