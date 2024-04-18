import { FlatList, StyleSheet } from 'react-native';
import { Image, Text, View} from 'tamagui';

interface User {
  id: number;
  nome: string;
  cargo: string
}

const usuarios: User[] = [
  {
    id: 1,
    nome: 'João Silva',
    cargo: 'dev front end'
  },
  {
    id: 2,
    nome: 'Maria Oliveira',
    cargo: 'dev front end'
 
  },
];

function Itens({ item: { nome,cargo } }: { item: User }) {
  return (
    <View>

<View >
<Image
    source={{ width: 200, height: 200, uri: 'https://picsum.photos/200/300' }}
  
  />
      {/* <Image
       marginLeft ={"10%"}
        source={{uri: 'https://picsum.photos/200/300'}} // Substitua pela URL da sua imagem
        style={styles.roundImage}
      /> */}
    </View>
      
      <Text
     
      // can add theme values
      color="$white"
      fontFamily="$body"
      // or just use direct values
      fontSize={20}
      hoverStyle={{
        color: '$colorHover',
      }}
    >
      {nome}
    </Text>
      <Text>{cargo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
 
  roundImage: {
    width: 50, // Defina a largura da imagem
    height: 50, // Defina a altura da imagem
    borderRadius: 75, // Metade da largura (ou altura) para torná-la redonda
  },
});

export default function Paia() {
  return (
    <View>
      <FlatList data={usuarios} renderItem={Itens} />
    </View>
  );

}


