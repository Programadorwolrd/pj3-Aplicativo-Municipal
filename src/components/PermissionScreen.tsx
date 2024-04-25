import { View, Text, StyleSheet, Pressable, Linking, Image } from "react-native";
import { Link, router } from 'expo-router';

const PermissionScreen = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/Monkey.png')} />

            <Text style={styles.title}>Permissão Negada</Text>
            <Text style={[styles.text, { paddingBottom: 10 }]}>Para Escanear os QrCodes, permita que o BioDex acesse sua câmera.</Text>
            <Text style={styles.text}>Toque em Configurações {'>'} Permissões e ative a Câmera</Text>

            <View style={styles.buttons}>
                <Pressable onPress={() => { Linking.openSettings(); router.replace('/(app)/(home)') }} >
                    <Text style={[styles.buttonText, { width: 200 }]}>Configurações</Text>
                </Pressable>

                <Pressable onPress={() => router.replace('/(app)/(home)')} style={{ alignItems: 'center', paddingTop: 20 }} >
                    <Text style={[styles.buttonBack, { width: 60 }]}>Voltar</Text>
                </Pressable>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1E1E',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    text: {
        color: '#fff',
        fontWeight: '200',
        width: 350,
        textAlign: 'center'
    },
    buttons: {
        marginTop: 20,
        width: 250,
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#01714B',
        borderRadius: 17,
        padding: 15,
        backgroundColor: '#01714B'
    },
    buttonBack: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        borderBottomWidth: 1,
        borderColor: '#fff',
    },
})

export default PermissionScreen