import TabQrCode from '@/components/TabQrCode';
import { BarChart2, CircleUserRound, Home, MapPinned } from '@tamagui/lucide-icons';
import { Redirect, Tabs } from 'expo-router';



export default function HomeLayout() {
  // simular loggin até a logica estiver completa
  const isLogged = true;

  if (!isLogged) return <Redirect href={'/(auth)/'} />;

  const iconSize = 1.2;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#00A86B',
        tabBarInactiveTintColor: 'black',

        // styles
        tabBarItemStyle: {
          marginTop: '1%',
          height: '80%',
        },
        tabBarStyle: {
          height: '7%',
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: 'paiaFeliz',
        },
      }}
    >
      <Tabs.Screen
        name='(home)'
        options={{
          title: 'Inicio',
          tabBarIcon({ size, color }) {
            return <Home color={color} size={size * iconSize} />;
          },
        }}
      />
      <Tabs.Screen
        name='(mapa)'
        options={{
          title: 'Mapa',
          tabBarIcon({ size, color }) {
            return <MapPinned color={color} size={size * iconSize} />;
          },
        }}
      />
      <Tabs.Screen
        name='(qrCode)'
        options={{
          tabBarButton: () => (
            <TabQrCode href='/(app)/(qrCode)' elevacao={0.54} size={22 * iconSize} />
          ),
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name='(ranking)'
        options={{
          title: 'Ranking',
          tabBarIcon({ size, color, focused }) {
            // color = focused ? color : '#9ACD32';
            return <BarChart2 strokeWidth={5} color={color} size={size * iconSize} />;
          },
        }}
      />
      <Tabs.Screen
        name='(profile)'
        options={{
          title: 'Minha Conta',
          tabBarIcon({ size, color }) {
            return <CircleUserRound color={color} size={size * iconSize} />;
          },
        }}
      />
    </Tabs>
  );
}
