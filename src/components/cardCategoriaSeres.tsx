import { Button } from "tamagui";

export interface PropsCard {
  title: string;
  onPress: () => void;
}

export default ({ title, onPress }: PropsCard) => (
  <Button
    backgroundColor={"white"}
    color={"green"}
    borderWidth={1}
    borderColor={"$red1Dark"}
    onPress={onPress}
  >
    {title}
  </Button>
);
