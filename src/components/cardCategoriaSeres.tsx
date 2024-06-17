import { Button } from "tamagui";

export interface PropsCard {
  title: string;
}
export default ({ title }: PropsCard) => (
  <Button
    backgroundColor={"white"}
    color={"green"}
    borderWidth={1}
    borderColor={"$red1Dark"}
  >
    {title}
  </Button>
);
