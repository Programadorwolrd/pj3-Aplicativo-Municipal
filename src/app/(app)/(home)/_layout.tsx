import StackApp from '@/components/StackApp';
import { Stack } from 'expo-router';

import { Image, Text } from 'tamagui';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function HomeLayout() {
  return <Stack screenOptions={{
    headerTitleAlign: 'center',
    headerTitle({ children }) {
      return (
        <Text display='flex' justifyContent='center' alignContent='center'>
          <Image style={{
            alignItems: 'center',
            justifyContent: 'center'
          }} source={require('../../../assets/BioDex.png')} />
          <Image />
        </Text>
      );
    },
  }} />;

}
