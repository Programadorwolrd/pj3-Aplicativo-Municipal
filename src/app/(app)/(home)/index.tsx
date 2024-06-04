import { Link } from 'expo-router';
import { View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Home } from '@tamagui/lucide-icons';
import mapaPage from './mapa';

const Tab = createMaterialTopTabNavigator();


export default function Index() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarLabelStyle: { fontSize: 12 },
      tabBarActiveTintColor: '#329F60',
      tabBarIndicatorStyle: { backgroundColor: '#329F60' }
    }}>
      <Tab.Screen  name="home" component={Home} />
      <Tab.Screen name="Mapa" component={mapaPage} />
    </Tab.Navigator>
  );
}
