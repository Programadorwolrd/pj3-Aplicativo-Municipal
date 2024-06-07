import { Button, Text, View } from 'tamagui';
import { Image } from 'react-native';

export interface PropsCardSeres {
    nome: string;
    link: string;
    photo: string;
    categoria: string;
}
export default ({ nome, link, photo, categoria  }: PropsCardSeres) => 
    <View backgroundColor={'#329F60'} width={125} height={160} borderRadius={20} paddingBottom={100}>
        <Text>{nome}</Text>
        <Text>{categoria}</Text>

    </View>;


