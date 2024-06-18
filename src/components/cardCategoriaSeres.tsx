import React from 'react';
import { Button } from "tamagui";

export interface PropsCard {
  title: string;
  onPress: () => void;
  isSelected: boolean; // Nova propriedade
}

const CardCategoriaSeres: React.FC<PropsCard> = ({ title, onPress, isSelected }) => {
  return (
    <Button
      backgroundColor={isSelected ? "#329F60" : "white"}
      color={isSelected ? "white" : "green"}
      borderWidth={1}
      borderColor={"$red1Dark"}
      onPress={onPress}
      borderRadius={10}
    >
      {title}
    </Button>
  );
};

export default CardCategoriaSeres;
