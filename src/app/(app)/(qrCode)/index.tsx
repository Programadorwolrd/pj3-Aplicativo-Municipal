import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet, Pressable } from "react-native";
import { CameraView, Camera } from "expo-camera/next";
import { router } from 'expo-router';
import { XStack, Text } from 'tamagui';
import { type GetProps, Input, styled } from 'tamagui';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    router.navigate(data)
    // router.navigate('/(app)/(qrCode)/126')
    setScanned(false)
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <XStack fullscreen style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.overlay}>
        <View style={styles.focusedArea}></View>
      </View>

      <Pressable style={styles.backButton} onPress={() => router.replace('(home)')}>
        <Text style={styles.backText}>X</Text>
      </Pressable>
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
});