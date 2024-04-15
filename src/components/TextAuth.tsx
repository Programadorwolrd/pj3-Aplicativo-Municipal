import { styled, Text, type GetProps } from 'tamagui';

const TextAuth = styled(Text, {
  fontFamily: '$paiaTriste',
  fontSize: '$10',
  variants: {
    H1: {
      true: {},
    },
  },
});

export type TextAuthProps = GetProps<typeof TextAuth>;
export default TextAuth;
