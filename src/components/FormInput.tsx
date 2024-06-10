import { Input, styled } from "tamagui";

export const InputStyled = styled(Input, {
  size: "$4.5",
  borderWidth: 1.7,
  borderColor: "$green9Light",
  backgroundColor: "$green4Light",
  color: "black",
  marginLeft: "-2%",
  width: "104%",
  focusStyle: {
    borderColor: "green",
  },
  hoverStyle: {
    borderColor: "green",
  },
});
