import IconsTabs from '@/components/iconsTabs';
import { Redirect,  Tabs } from 'expo-router';


//const capivaraTriste = require('@/assets/iconLay.jpeg');
const homeImg = require('@/assets/botao-home(1).png');
const mapaImg = require('@/assets/mapa(1).png');
const qrCodeImg = require('@/assets/qrCode.png');
const profileImg = require('@/assets/avatarperfil(1).png');
const rankingImg = require('@/assets/ranking(1).png');

export default function HomeLayout() {
  // simular loggin até a logica estiver completa
  const isLogged = true;

  if (!isLogged) return <Redirect href={'/(auth)/'} />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >

     
      <Tabs.Screen name='(home)' options={{ tabBarIcon: () => <IconsTabs foto={homeImg} />,
                tabBarLabelStyle: { color: '#329F60' }, }} />
      <Tabs.Screen name='(mapa)' options={{ tabBarIcon: () => <IconsTabs foto={mapaImg} />,
                tabBarLabelStyle: { color: '#329F60' },  }} />
      <Tabs.Screen name='(qrCode)' options={{ tabBarIcon: () => <IconsTabs foto={qrCodeImg} />,
                tabBarLabelStyle: { color: '#329F60' },  }} />
      <Tabs.Screen name='(ranking)' options={{  tabBarIcon: () => <IconsTabs foto={rankingImg} />,
                tabBarLabelStyle: { color: '#329F60' }, }} />
      <Tabs.Screen name='(profile)' options={{  tabBarIcon: () => <IconsTabs foto={profileImg} />  }} />
    </Tabs>
  );
}
