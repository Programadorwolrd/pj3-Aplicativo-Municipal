import { FlatList } from 'react-native';
import { Text, View, Card} from 'tamagui';


interface User {
  id: number;
  nome: string;
  nascimento: Date;
  email: string;
}

const usuarios: User[] = [
  {
    id: 1,
    nome: 'João Silva',
    nascimento: new Date(),
    email: 'joao.silva@example.com',
  },
  {
    id: 2,
    nome: 'Maria Oliveira',
    nascimento: new Date(),
    email: 'maria.oliveira@example.com',
  },
];

function Itens({ item: {email,id,nascimento,nome} }: { item: User }) {
  return (
    <View >

      <Text>{email}</Text>
      <Text>{id}</Text>
      <Text>{nascimento.toLocaleString()}</Text>
      <Text>{nome}</Text>
    </View>
  );
}

export default function Paia() {
  return (
    <View>
      <FlatList data={usuarios} renderItem={Itens} />
    </View>
  );
}
