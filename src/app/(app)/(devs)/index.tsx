import React, { useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  Linking,
  TouchableWithoutFeedback,
} from 'react-native';
import { Text, View, XStack } from 'tamagui';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ChevronRightCircle } from '@tamagui/lucide-icons';

interface User {
  nome: string;
  funcao: string;
  linkImagem: string;
  linkGithub: string;
  linkLinkedin: string;
  descricao: string;
}
const usuarios: User[] = [
  {
    nome: 'João Silva',
    funcao: 'Dev frontEnd',
    linkImagem:
      'https://th.bing.com/th/id/R.3ed87c38e1fa44b5e11b525944c1ba1c?rik=jww3viNoAixuYQ&pid=ImgRaw&r=0',
    linkGithub: 'https://github.com/Programadorwolrd',
    linkLinkedin: '',
    descricao:
      'João é um desenvolvedor frontEnd que adora criar interfaces bonitas e funcionais. Ele é apaixonado por tecnologia e está sempre em busca de novos desafios.',
  },
  {
    nome: 'Maria Oliveira',
    funcao: 'Dev backEnd',
    linkImagem:
      'https://th.bing.com/th/id/R.3ed87c38e1fa44b5e11b525944c1ba1c?rik=jww3viNoAixuYQ&pid=ImgRaw&r=0',
    linkGithub: '',
    linkLinkedin: '',
    descricao: 'Maria é uma ',
  },
  {
    nome: 'Maria Oliveira',
    funcao: 'Dev backEnd',
    linkImagem:
      'https://th.bing.com/th/id/R.3ed87c38e1fa44b5e11b525944c1ba1c?rik=jww3viNoAixuYQ&pid=ImgRaw&r=0',
    linkGithub: '',
    linkLinkedin: '',
    descricao: 'Maria é uma ',
  },
  {
    nome: 'Maria Oliveira',
    funcao: 'Dev backEnd',
    linkImagem:
      'https://th.bing.com/th/id/R.3ed87c38e1fa44b5e11b525944c1ba1c?rik=jww3viNoAixuYQ&pid=ImgRaw&r=0',
    linkGithub: '',
    linkLinkedin: '',
    descricao: 'Maria é uma ',
  },
  {
    nome: 'Maria Oliveira',
    funcao: 'Dev backEnd',
    linkImagem:
      'https://th.bing.com/th/id/R.3ed87c38e1fa44b5e11b525944c1ba1c?rik=jww3viNoAixuYQ&pid=ImgRaw&r=0',
    linkGithub: '',
    linkLinkedin: '',
    descricao: 'Maria é uma ',
  },
  {
    nome: 'Maria Oliveira',
    funcao: 'Dev backEnd',
    linkImagem:
      'https://th.bing.com/th/id/R.3ed87c38e1fa44b5e11b525944c1ba1c?rik=jww3viNoAixuYQ&pid=ImgRaw&r=0',
    linkGithub: '',
    linkLinkedin: '',
    descricao: 'Maria é uma ',
  },
  {
    nome: 'Maria Oliveira',
    funcao: 'Dev backEnd',
    linkImagem:
      'https://th.bing.com/th/id/R.3ed87c38e1fa44b5e11b525944c1ba1c?rik=jww3viNoAixuYQ&pid=ImgRaw&r=0',
    linkGithub: '',
    linkLinkedin: '',
    descricao: 'Maria é uma ',
  },
  {
    nome: 'Maria Oliveira',
    funcao: 'Dev backEnd',
    linkImagem:
      'https://th.bing.com/th/id/R.3ed87c38e1fa44b5e11b525944c1ba1c?rik=jww3viNoAixuYQ&pid=ImgRaw&r=0',
    linkGithub: '',
    linkLinkedin: '',
    descricao: 'Maria é uma ',
  },
  {
    nome: 'Maria Oliveira',
    funcao: 'Dev backEnd',
    linkImagem:
      'https://th.bing.com/th/id/R.3ed87c38e1fa44b5e11b525944c1ba1c?rik=jww3viNoAixuYQ&pid=ImgRaw&r=0',
    linkGithub: '',
    linkLinkedin: '',
    descricao: 'Maria é uma ',
  },
  {
    nome: 'Maria Oliveira',
    funcao: 'Dev backEnd',
    linkImagem:
      'https://th.bing.com/th/id/R.3ed87c38e1fa44b5e11b525944c1ba1c?rik=jww3viNoAixuYQ&pid=ImgRaw&r=0',
    linkGithub: '',
    linkLinkedin: '',
    descricao: 'Maria é uma ',
  },
];

function Itens({ item, onPress }: { item: User; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ marginVertical: 10 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginLeft: 40,
          marginRight: 40,
        }}
      >
        <View style={{ flexDirection: 'row', marginLeft: '3%', alignItems: 'center' }}>
          <Image
            source={{ uri: item.linkImagem }}
            style={{ width: 50, height: 50, borderRadius: 30, marginRight: 10 }}
          />
          <View style={{ marginLeft: '1%' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{item.nome}</Text>
            <Text>{item.funcao}</Text>
          </View>
        </View>

        <XStack alignItems='center'>
          {/* <IconeDois /> */}
          <ChevronRightCircle
            backgroundColor='#D9D9D9'
            borderRadius={100}
            strokeWidth={2.3}
            alignItems='center'
          />
          {/* <Image source={{  }} style={{ marginLeft: '3%', width: 35, height: 35, marginRight: 20 }} />
          <Image source={{ uri: item.icone }} style={{ width: 25, height: 25, marginRight: 20, marginTop: 5 }} /> */}
        </XStack>
      </View>
    </TouchableOpacity>
  );
}

const CustomModal: React.FC<{ item: User | null; onClose: () => void }> = ({
  item,
  onClose,
}) => {
  if (!item) return null;

  return (
    <Modal visible={true} onRequestClose={onClose} transparent>
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        activeOpacity={1}
        onPressOut={onClose}
      >
        <TouchableWithoutFeedback>
          <View
            style={{
              backgroundColor: 'white',
              padding: 15,
              borderRadius: 10,
              width: '80%',
            }}
          >
            <View style={{ alignItems: 'center', marginBottom: 50 }}>
              <Image
                source={{ uri: item.linkImagem }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  position: 'absolute',
                  top: -40,
                }}
              />
            </View>
            <View style={{ marginBottom: 50 }}>
              <Text style={{ textAlign: 'center' }}>{item.descricao}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                position: 'absolute',
                bottom: 10,
                width: '90%',
              }}
            >
              <TouchableOpacity onPress={() => Linking.openURL(item.linkGithub)}>
                <View>
                  <Icon name='github' size={30} color='#000' />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL(item.linkLinkedin)}>
                <View
                  style={{
                    backgroundColor: '#2867B2',
                    borderRadius: 5,
                    padding: 5,
                    marginLeft: 5,
                  }}
                >
                  <Icon name='linkedin' size={20} color='#fff' />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default function Lista() {
  const [selectedItem, setSelectedItem] = useState<User | null>(null);

  return (
    <>
      <View style={{ alignItems: 'center' }}>
        <Image
          source={{ uri: 'https://picsum.photos/200/300' }}
          style={{ width: '80%', height: 170, borderRadius: 20, marginTop: 35, marginBottom: 50}}
        />
      </View>

      <FlatList
        data={usuarios}
        renderItem={({ item }) => (
          <Itens item={item} onPress={() => setSelectedItem(item)} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <CustomModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </>
  );
}