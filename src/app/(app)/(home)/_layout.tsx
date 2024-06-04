import StackApp from '@/components/StackApp';
import { Stack } from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function HomeLayout() {
  return <StackApp titulo='src/assets/BioDex.png' />;
}
