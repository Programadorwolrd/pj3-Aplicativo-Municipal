import { ScanLine } from '@tamagui/lucide-icons';
import { router, type Href } from 'expo-router';
import { Circle, View } from 'tamagui';

interface IconProps {
  focused?: boolean;
  color?: string;
  size: number;
  elevacao: number;
  href: Href<'pathname'>;
}

export default function TabQrCode({ size, href, elevacao }: IconProps) {
  const proporcaoPaia = size * 1.6;

  return (
    <View f={1} alignItems='center'>
      {/* borda */}
      <View overflow='hidden' height={'100%'} top={'-5%'}>
        <Circle
          size={proporcaoPaia * 1.9}
          top={`-${110 * elevacao}%`}
          backgroundColor={'whitesmoke'}
        />
      </View>

      {/* icone */}
      <Circle
        size={proporcaoPaia * 1.5}
        position='absolute'
        zi={2}
        top={`-${95 * elevacao}%`}
        backgroundColor={'$green10Light'}
        onPress={() => router.navigate(href)}
      >
        <ScanLine size={proporcaoPaia} strokeWidth={2.2} color={'white'} />
      </Circle>
    </View>
  );
}
