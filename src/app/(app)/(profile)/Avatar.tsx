import { Avatar, YStack, Text } from "tamagui";
import React, { useState } from "react";
import { Alert, Modal, Pressable, StyleSheet, Image } from "react-native";
// const avatarPerfil = require("../../../assets/avatar-icon.jpeg");
import { View } from "react-native";
import { X } from "@tamagui/lucide-icons";
// import { PopoverDemo } from "./Test";
interface avatarPerfil {
  img: string;
}

export default function AvatarProfile({ img }: avatarPerfil) {
  const [modalVisible, setModalVisible] = useState(false);
  //teste
  const avatar: avatarPerfil = {
    img,
  };

  if (!avatar.img) {
    avatar.img =
      "https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg";
  }

  return (
    <YStack mt={"$3"} ai={"center"}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        {/* <SafeAreaView style={{flex: 1}} onTouch={() => setModalVisible(!modalVisible)}> */}
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Avatar circular size={"$20"}>
              <Avatar.Image accessibilityLabel="avatar" src={avatar.img} />
              <Avatar.Fallback backgroundColor="$blue10" />
            </Avatar>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <X size={30} color={"#000"} />
              {/* <Text style={styles.textStyle}>Hide Modal</Text> */}
            </Pressable>
          </View>
        </View>
        {/* </SafeAreaView> */}
      </Modal>

      <Pressable onPress={() => setModalVisible(true)}>
        <Avatar circular size={"$11"}>
          <Avatar.Image accessibilityLabel="avatar" src={avatar.img} />
          <Avatar.Fallback backgroundColor="$blue10" />
        </Avatar>
        {/* <Text mt={"$3"}>alterar incone</Text> */}
      </Pressable>
      {/* <PopoverDemo /> */}
    </YStack>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,

    borderRadius: 20,
    alignItems: "center",
  },
  tinyLogo: {
    width: 250,
    height: 250,
  },
  button: {
    borderRadius: 20,
    padding: 10,
  },
  buttonOpen: {
    backgroundColor: "transparent",
  },
  buttonClose: {
    backgroundColor: "transparent",
  },
});
