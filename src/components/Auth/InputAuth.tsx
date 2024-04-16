import { Input, styled, type GetProps } from "tamagui";

export const InputAuth = styled(Input, {
  size: '$4',
  borderWidth: 1.5,
  borderColor: '$green9Light',
  backgroundColor: '$green4Light',
  focusStyle: {
    borderColor: 'green',
  },
  color: 'black',
  width: '100%',
} as const);


export type InputAuthProps = GetProps<typeof InputAuth>;
