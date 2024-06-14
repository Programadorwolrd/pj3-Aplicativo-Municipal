import { Button, Text, View } from 'tamagui';
import { Image } from 'react-native';

export interface PropsCardSeres {
    nome: string;
    link: string;
    photo: string;
    categoria: string;
}
export default ({ nome, link, photo, categoria }: PropsCardSeres) =>
    <View backgroundColor={'#329F60'} width={150} height={160} borderRadius={20} paddingBottom={100}
        style={{
           zIndex: 1
        }}>
        <View width={150} display={'flex'} justifyContent='center' alignItems='center' >
            <Image style={{ width: 110, height: 100, marginTop: -10, zIndex: 2 }} source={require("../assets/passaro.png")} />

        </View>
        <View marginLeft={10}>
            <Text color={'#fff'} fontWeight='normal'>{nome}</Text>
            <Text color={'#fff'} >{categoria}</Text>

        </View>

    </View>


