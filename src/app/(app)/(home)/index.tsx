import { Link } from 'expo-router';
import { View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import mapaPage from './mapa';
import homePage from './home';


const Tab = createMaterialTopTabNavigator();


export default function Index() {
  return (
    <View>
    <Tab.Navigator screenOptions={{
      tabBarLabelStyle: { fontSize: 12 },
      tabBarActiveTintColor: '#329F60',
      tabBarIndicatorStyle: { backgroundColor: '#329F60' }
    }}>
      <Tab.Screen  name="home" component={homePage} />
      <Tab.Screen name="Mapa" component={mapaPage} />
    </Tab.Navigator>
    </View>
  );
}
