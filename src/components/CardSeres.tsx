import { Button, Text, View } from 'tamagui';
import { Image } from 'react-native';
import { Grayscale } from 'react-native-color-matrix-image-filters'

export interface PropsCardSeres {
    nome: string;
    link: string;
    photo: string;
    categoria: string;
}
export default ({ nome, link, photo, categoria }: PropsCardSeres) =>
    <Grayscale>
        <View style={{ height: 180 }} justifyContent='flex-end'>
            <View backgroundColor={'#329F60'} borderRadius={20} paddingBottom={100} height={140}>
                <Image style={{ width: 100, height: 90, marginTop: -10 }} source={require("../assets/passaro.png")} />


                <View marginLeft={10}>
                    <Text color={'#fff'} fontWeight='normal'>{nome}</Text>
                    <Text color={'#fff'} >{categoria}</Text>

                </View>

            </View>
        </View>
    </Grayscale>


