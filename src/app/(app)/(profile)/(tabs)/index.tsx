import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SeresVivos from "./SeresVivos";
import Medalhas from "./Medalhas";
import { useGetUser } from "@/lib/querys";

const Tab = createMaterialTopTabNavigator();

export default function Tabs() {
  
  const user = useGetUser();
  const total = user.data?.data.usuario.progresso.total;
  const lidos = user.data?.data.usuario.progresso.lido;
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
        options={{ tabBarLabel: `Seres Vivos \n ${lidos} / ${total}` }}
      />
      <Tab.Screen
        name="medalhas"
        component={Medalhas}
        options={{ tabBarLabel: `Seres Vivos \n ${lidos} / ${total}` }}
      />
    </Tab.Navigator>
  );
}
