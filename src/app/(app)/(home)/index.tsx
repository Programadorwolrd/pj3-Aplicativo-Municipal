import { Link } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import mapaPage from "./mapa";
import homePage from "./home";
import { ScrollView, View } from "tamagui";

const Tab = createMaterialTopTabNavigator();

export default function Index(a) {
  return (
    <View f={1}>
      <ScrollView>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12 },
          tabBarActiveTintColor: "#329F60",
          tabBarIndicatorStyle: { backgroundColor: "#329F60" },
        }}
      >
        <Tab.Screen name="home" component={homePage} />
        <Tab.Screen name="Mapa" component={mapaPage} />
      </Tab.Navigator>
      </ScrollView>
    </View>
  );
}
