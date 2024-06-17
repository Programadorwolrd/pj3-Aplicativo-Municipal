import React, { useRef, useState } from "react";
import {
  Alert,
  Animated,
  Easing,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { FileEdit, LogOut, Settings } from "@tamagui/lucide-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";
import { storeAuth } from "@/lib/logicAuth";

interface PropsOptions {
  title: string;
  action: () => void;
  icon: React.ReactNode;
}

const DropdownMenu = () => {
  const loggout = storeAuth((s) => s.logout);
  const [visible, setVisible] = useState(false);
  const scale = useRef(new Animated.Value(0)).current;
  const options: PropsOptions[] = [
    {
      title: "Editar",
      icon: <FileEdit size={26} color="black" />,
      action: () => {
        router.navigate(`(app)/(profile)/Editar/`);
      },
    },
    {
      title: "Logout",
      icon: <LogOut size={26} color="red" />,
      action: () => loggout(),
    },
  ];
  function resizeBox(to: any) {
    to === 1 && setVisible(true);
    Animated.timing(scale, {
      toValue: to,
      useNativeDriver: true,
      duration: 100,
      easing: Easing.linear,
    }).start(() => to === 0 && setVisible(false));
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          resizeBox(1);
        }}
        style={{ margin: 10 }}
      >
        <Settings size={24} color="white" />
      </TouchableOpacity>
      <Modal transparent visible={visible}>
        <SafeAreaView style={{ flex: 1 }} onTouchStart={() => resizeBox(0)}>
          <Animated.View
            style={[
              styles.popup,
              { transform: [{ scale }] },
              {
                opacity: scale.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
            ]}
          >
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  option.action();
                  setVisible(false);
                }}
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: 10,
                  borderBottomColor: "green",
                  borderBottomWidth: index === options.length - 1 ? 0 : 1,
                }}
              >
                <Pressable onPress={option.action}>
                  <Text style={[styles.text, option.title === "Logout" && styles.logout ]}>{option.title}</Text>
                </Pressable>
                <Pressable onPress={option.action}>
                  <Text >{option.icon}</Text>
                </Pressable>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default DropdownMenu;

const styles = StyleSheet.create({
  popup: {
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderColor: "$black",
    borderRadius: 10,
    borderWidth: 1,
    position: "absolute",
    width: 110,
    top: 40,
    right: 38,
  },
  text: {
    fontSize: 16,
  },
  logout: {
    color: "red",
    fontSize: 16,
  },
});
