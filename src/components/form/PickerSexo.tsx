import { Picker } from "@react-native-picker/picker";
import { ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import { useState } from "react";
import { YStack, Text, Adapt, Sheet, Select, View } from "tamagui";
import { stylesPicker } from "./PickerCidade";

export interface PropsPicker {
  values: Record<string, string>;
  defaultValue?: string;
}
export default function PickerSexo({ values, defaultValue }: PropsPicker) {
  const [sexo, setSexo] = useState<string | undefined>(defaultValue || "");

  // Definindo as opções pSelectSelect
  const options = [
    { label: "Selecione seu sexo", value: "" },
    { label: "Masculino", value: "masculino" },
    { label: "Feminino", value: "feminino" },
    { label: "Prefiro Não Informar", value: "prefiroNaoInformar" },
  ];

  const handleSexoChange = (itemValue: string) => {
    if (itemValue === "M") {
      setSexo("M");
    } else if (itemValue === "F") {
      setSexo("F");
    } else if (itemValue === "O") {
      setSexo("O");
    }
  };

  if (sexo) values["sexo"] = sexo;

  return (
    <>
      <Text
        fontSize={"$2"}
        color="green"
        mb="$1.5"
        style={{ marginTop: 16 }}
        marginLeft="2%"
        fontFamily={"$outfitBold"}
      >
        ESCOLHA O SEU SEXO
      </Text>
      <View style={stylesPicker.pickerWrapper}>
        <Picker
          selectedValue={sexo}
          onValueChange={(itemValue) => setSexo(itemValue)}
          style={stylesPicker.picker}
        >
          {options.map((d, i) => (
            <Picker.Item key={i} label={d.label} value={d.value} />
          ))}
        </Picker>
      </View>
    </>
  );
}
