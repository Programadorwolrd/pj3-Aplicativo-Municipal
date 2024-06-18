import React from "react";
import { View, Text } from "react-native";
import { Spinner } from "tamagui";

const Loading = () => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Spinner size="large" color="#0000ff" />
            <Text style={{ marginTop: 10 }}>Carregando...</Text>
        </View>
    );
};

export default Loading;