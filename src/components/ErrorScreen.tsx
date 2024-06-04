import { View, Text, StyleSheet, Pressable, Linking, Image } from 'react-native';

const ErrorScreen = ({ title, text }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/Monkey.png')} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  text: {
    color: '#fff',
    fontWeight: '200',
    width: 400,
    textAlign: 'center',
  },
});

export default ErrorScreen;
