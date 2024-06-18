import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Platform } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { router, useFocusEffect } from "expo-router";
import { XStack, Text, Button } from "tamagui";
import { Flashlight, X, Scan } from "@tamagui/lucide-icons";
import PermissionScreen from "@/components/PermissionScreen";

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [torch, setTorch] = useState(false);

  useFocusEffect(() => {
    const getCameraPermissions = async () => {
      if (hasPermission === false || hasPermission === null) {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted" ? true : false);
      }
    };
    getCameraPermissions();
    setScanned(false);
  });

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    setTorch(false);
    if (torch === false) {
      if (data.startsWith("PAIA:")) return router.navigate(`/visitas/${data}`);

      router.navigate(data);
    }
  };

  if (hasPermission === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator
          size={Platform.OS == "android" ? 70 : "large"}
          color="#01714B"
        />
      </View>
    );
  }

  if (hasPermission === false) {
    return <PermissionScreen />;
  }

  return (
    <XStack fullscreen style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        style={StyleSheet.absoluteFillObject}
        enableTorch={torch}
      />

      <Button
        style={styles.backButton}
        onPress={() => {
          setTorch(false);
          router.replace("/(app)/(home)");
        }}
        icon={X}
        color="#fff"
        size={70}
      />

      <Button
        style={[
          styles.flashlight,
          torch ? styles.flashlightOn : styles.flashlightOff,
        ]}
        onPress={() => setTorch(torch == false ? true : false)}
        icon={Flashlight}
        color={torch ? "#000" : "#fff"}
        size={70}
      />

      <View style={styles.overlay}>
        <Scan color="#fff" size={340} strokeWidth={0.5} />
      </View>
    </XStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    left: 10,
    bottom: 10,
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#081D10",
    padding: 12,
  },
  backText: {
    fontSize: 30,
    color: "#fff",
    textAlign: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  focusedArea: {
    width: 300,
    height: 300,
    borderColor: "rgba(255, 255, 255, 0.6)",
    borderWidth: 2,
    borderRadius: 30,
  },
  flashlight: {
    position: "absolute",
    right: 10,
    bottom: 10,
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#081D10",
  },
  flashlightOn: {
    backgroundColor: "#fff",
  },
  flashlightOff: {
    backgroundColor: "#081D10",
  },
  noPermisson: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
