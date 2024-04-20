import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, ActivityIndicator, Platform } from "react-native";
import { CameraView, Camera } from "expo-camera/next";
import { router, useFocusEffect } from 'expo-router';
import { XStack, Text } from 'tamagui';
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
      };
    }
    getCameraPermissions();
  });

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    router.navigate(data)
    // router.navigate('/(app)/(qrCode)/126')
    setScanned(false)
  };

  if (hasPermission === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={Platform.OS == 'android' ? 70 : 'large'} color="#01714B" />
      </View>
    )
  }

  if (hasPermission === false) {
    return (
      <PermissionScreen />
    );
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

      <Pressable style={styles.backButton} onPress={() => { setTorch(false); router.replace('/(app)/(home)') }}>
        <Text style={styles.backText}>{<X color="#fff" />}</Text>
      </Pressable>

      <Pressable style={[styles.flashlight, torch ? styles.flashlightOn : styles.flashlightOff]} onPress={() => {
        setTorch(torch == false ? true : false)
      }}>
        <Text style={styles.backText}>{<Flashlight color={torch ? "#000" : "#fff"} />}</Text>
      </Pressable>

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
    top: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#081D10',
    padding: 12,
  },
  backText: {
    fontSize: 30,
    color: '#fff',
    textAlign: 'center'
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusedArea: {
    width: 300,
    height: 300,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 2,
    borderRadius: 30,
  },
  flashlight: {
    position: "absolute",
    right: 10,
    top: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#081D10',
    padding: 12,
  },
  flashlightOn: {
    backgroundColor: '#fff',
  },
  flashlightOff: {
    backgroundColor: '#081D10',
  },
  noPermisson: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});