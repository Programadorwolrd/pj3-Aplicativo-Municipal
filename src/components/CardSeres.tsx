import { Button, Text, View } from 'tamagui';
import { Image } from 'react-native';

export interface PropsCardSeres {
    nome: string;
    link: string;
    photo: string;
    categoria: string;
}
export default ({ nome, link, photo, categoria }: PropsCardSeres) =>
    <View width={150} height={170} display='flex' justifyContent='flex-end'>
        <View backgroundColor={'#329F60'} borderRadius={20} paddingBottom={100}>
            <Image style={{ width: 110, height: 100, marginTop: -10 }} source={require("../assets/passaro.png")} />


            <View marginLeft={10}>
                <Text color={'#fff'} fontWeight='normal'>{nome}</Text>
                <Text color={'#fff'} >{categoria}</Text>

            </View>

        </View>
    </View>


