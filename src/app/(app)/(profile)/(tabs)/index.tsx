import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SeresVivos from "./SeresVivos";
import Medalhas from "./Medalhas";

const Tab = createMaterialTopTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="seresVivos"
      screenOptions={{
        tabBarGap: 10,
        tabBarActiveTintColor: "#329F60",
        tabBarStyle: { backgroundColor: "#F6FFF7" },
        tabBarIndicatorStyle: { backgroundColor: "#329F60" },
      }}
    >
      <Tab.Screen
        name="seresVivos"
        component={SeresVivos}
        options={{ tabBarLabel: "Seres Vivos" }}
      />
      <Tab.Screen
        name="medalhas"
        component={Medalhas}
        options={{ tabBarLabel: "Medalhas" }}
      />
    </Tab.Navigator>
  );
}