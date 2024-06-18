import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Text } from "tamagui";
import { PropsPicker } from "./PickerSexo";

const NascimentoScreen = ({ values }: PropsPicker) => {
  const [date, setDate] = useState<Date>(new Date());
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    values["nascimento"] = date.toISOString();
  }, [date, values]);

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios"); // Para iOS, manter o DatePicker visível até a confirmação
    setDate(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={styles.container}>
      <Text
        fontSize={"$2"}
        color="green"
        style={{ marginTop: 7 }}
        mb="$1.5"
        fontFamily={"$outfitBold"}
        marginLeft="2%"
      >
        ESCOLHA SUA DATA DE NASCIMENTO
      </Text>
      <View style={styles.pickerWrapper}>
        <Text style={styles.dateText}>{formatDate(date)}</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Selecionar Data"
            onPress={showDatePicker}
            color="#4caf50"
          />
        </View>
      </View>
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
          style={styles.datePicker}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  pickerWrapper: {
    flexDirection: "row",
    backgroundColor: "#e8f5e9",
    borderWidth: 1.7,
    borderColor: "#43a047",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  buttonContainer: {
    marginLeft: 10,
  },
  datePicker: {
    width: "100%",
  },
});

export default NascimentoScreen;
