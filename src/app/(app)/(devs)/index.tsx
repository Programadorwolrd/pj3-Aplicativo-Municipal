import type React from 'react';
import { useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  Linking,
  TouchableWithoutFeedback,
} from 'react-native';
import { Text, View, XStack } from 'tamagui';
import { ChevronRightCircle } from '@tamagui/lucide-icons';
import LinkedinIcon from '@/assets/linkedin.svg';
import GithubIcon from '@/assets/ellipse19.svg';
import MyImage from '@/assets/Design sem nome (2) (1).png';
import Imageluis from '@/assets/image.png';

interface User {
  nome: string;
  funcao: string;
  linkImagem: string;
  linkGithub: string;
  linkLinkedin: string | null;
  descricao: string;
}
const usuarios: User[] = [
  {
    nome: 'Leonardo Lopes',
    funcao: 'Dev Fullstack',
    linkImagem:
    'https://avatars.githubusercontent.com/u/132392161?v=4',
    linkGithub: 'https://github.com/6aleatorio6',
    linkLinkedin: 'https://www.linkedin.com/in/leonardo-lopes-felix-1152742b6/',
    descricao: ' Desenvolvedor talentoso que contribuiu significativamente para o desenvolvimento das funcionalidades do aplicativo. Sua capacidade de resolver problemas complexos foram fundamentais para o sucesso do projeto.',
  },
  {
    nome: 'Lucas',
    funcao: 'Dev Fullstack',
    linkImagem:
      'https://avatars.githubusercontent.com/u/136916226?v=4',
      linkGithub: 'https://github.com/lucas2007c',
      linkLinkedin: null,
      descricao:
      'É um desenvolvedor talentoso que contribuiu significativamente para o desenvolvimento das funcionalidades do aplicativo. suas habilidades foram fundamentais para o sucesso do projeto.',
    },
    {
    nome: 'Luis Eduardo',
    funcao: 'Dev FullStack',
    linkImagem:
      "Imageluis",
    linkGithub: '',
    linkLinkedin: '',
    descricao:
      'É um desenvolvedor talentoso que contribuiu significativamente para o desenvolvimento das funcionalidades do aplicativo. Suas habilidades foram fundamentais para o sucesso do projeto.',
  },
  {
  nome: 'Philype Jorge',
  funcao: 'Dev FrontEnd',
  linkImagem:
    'https://avatars.githubusercontent.com/u/128484070?v=4',
    linkGithub: 'https://github.com/Programadorwolrd',
    linkLinkedin: 'https://www.linkedin.com/in/philypejorge/',
    descricao:
    'Desenvolvedor talentoso que contribuiu significativamente para o desenvolvimento das funcionalidades do aplicativo. Suas habilidades em front-end foram fundamentais para o sucesso do projeto.',
  },
  
  {
    nome: 'João Gabriel',
    funcao: 'Dev FrontEnd',
    linkImagem:
      'https://avatars.githubusercontent.com/u/133153956?v=4',
    linkGithub: 'https://github.com/JGabrielBesera#jo%C3%A3o-gabriel-de-faria-beserra',
    linkLinkedin: null,
    descricao:
  'Desenvolvedor talentoso que contribuiu significativamente para o desenvolvimento das funcionalidades do aplicativo. Suas habilidades em front-end foram fundamentais para o sucesso do projeto.',
  },
  
  {
   nome: 'Lorena',
   funcao: 'Dev BackEnd',
   linkImagem:
   'https://avatars.githubusercontent.com/u/133153441?v=4',
   linkGithub: 'https://github.com/lorislolo',
   linkLinkedin: null,
   descricao:
   'Desenvolvedora talentosa que contribuiu significativamente para o desenvolvimento das funcionalidades do aplicativo. Suas habilidades foram fundamentais para o sucesso do projeto.',
  },
  {
  nome: 'Fabricio Ryan',
  funcao: 'Dev FrontEnd',
  linkImagem:
  'https://avatars.githubusercontent.com/u/133154067?v=4',
  linkGithub: 'https://github.com/ryanolv44',
  linkLinkedin: null,
  descricao:
  'Desenvolvedor talentoso que contribuiu significativamente para o desenvolvimento das funcionalidades do aplicativo. Suas habilidades em front-end foram fundamentais para o sucesso do projeto.',
  },
{
nome: 'Flavio Menezes',
funcao: 'Dev FrontEnd',
linkImagem:
  'https://avatars.githubusercontent.com/u/141774746?s=400&u=5f5019b00fefc620b3a981cb1aca7219a35fd0e7&v=4',
linkGithub: 'https://avatars.githubusercontent.com/u/141774746?s=400&u=5f5019b00fefc620b3a981cb1aca7219a35fd0e7&v=4',
linkLinkedin: 'https://www.linkedin.com/in/fl%C3%A1vio-menezes-4b92231b2/',
descricao:
  'Desenvolvedor talentoso que contribuiu significativamente para o desenvolvimento das funcionalidades do aplicativo. Suas habilidades em front-end foram fundamentais para o sucesso do projeto.',
},


  {
    nome: 'Matheus',
    funcao: 'Dev FrontEnd',
    linkImagem:
      'https://avatars.githubusercontent.com/u/133154457?v=4',
    linkGithub: 'https://github.com/MatheusMadin',
    linkLinkedin: null,
    descricao:
  'Desenvolvedor talentoso que contribuiu significativamente para o desenvolvimento das funcionalidades do aplicativo. Suas habilidades em front-end foram fundamentais para o sucesso do projeto.',
  },
{
  nome: 'Bryan Machado',
    funcao: 'Dev Backend',
    linkImagem:
      'https://avatars.githubusercontent.com/u/133154012?v=4',
    linkGithub: 'https://github.com/Bryan-Machado',
    linkLinkedin: null,
    descricao:
    'Desenvolvedor dedicado que desempenhou um papel crucial no desenvolvimento do sistema desktop',
  },
  
  {
    nome: 'Arthur',
    funcao: 'Dev Backend',
    linkImagem:
      'https://avatars.githubusercontent.com/u/159071386?v=4',
    linkGithub: 'https://github.com/ARTHURcantu',
    linkLinkedin: null,
    descricao:
      'Desenvolvedor dedicado que desempenhou um papel crucial no desenvolvimento do sistema desktop',
  },
  {
  nome: 'Gabriel Teixeira',
  funcao: 'Dev FrontEnd',
  linkImagem:
    'https://avatars.githubusercontent.com/u/133154082?v=4',
  linkGithub: 'https://github.com/Gabriel-Te',
  linkLinkedin: null,
  descricao:
      'Desenvolvedor dedicado que desempenhou um papel crucial no desenvolvimento do sistema desktop',
},

  {
  nome: 'Clemerson Santos',
  funcao: 'Dev Fullstack',
  linkImagem:
    'https://avatars.githubusercontent.com/u/133153603?v=4',
  linkGithub: 'https://github.com/ClemersonIFSP',
  linkLinkedin: null,
  descricao:
  'Desenvolvedor dedicado que desempenhou um papel crucial no desenvolvimento do sistema desktop',
},
{
nome: 'Roberto Criscuolo',
funcao: 'Dev FrontEnd',
linkImagem:
  'https://avatars.githubusercontent.com/u/127694300?v=4',
linkGithub: 'https://github.com/roberto-criscuolo',
linkLinkedin: null,
descricao:
      'Desenvolvedor dedicado que desempenhou um papel crucial no desenvolvimento do sistema desktop',
},
{
    nome: 'Manuela Otavio',
    funcao: 'Dev FrontEnd',
    linkImagem:
      'https://avatars.githubusercontent.com/u/141782711?v=4',
      linkGithub: 'https://github.com/manuelazotavio',
      linkLinkedin: 'https://www.linkedin.com/in/manuela-otavio-8aa5592b7/',
      descricao:
    'Desenvolvedora competente que contribuiu de maneira exemplar para o desenvolvimento do site de notícias. Sua criatividade e atenção aos detalhes foram essenciais para criar uma plataforma intuitiva e envolvente para os usuários.',
  },
  {
    nome: 'Barbara Santos',
    funcao: 'Dev FrontEnd',
    linkImagem:
    'https://avatars.githubusercontent.com/u/143025062?v=4',
    linkGithub: 'https://github.com/Barbarasantoos',
    linkLinkedin: null,
    descricao:
    'Desenvolvedora competente que contribuiu de maneira exemplar para o desenvolvimento do site de notícias. Sua criatividade e atenção aos detalhes foram essenciais para criar uma plataforma intuitiva e envolvente para os usuários.',
  },


   {
    nome: 'João Tavares',
    funcao: 'Dev FrontEnd',
    linkImagem:
      'https://avatars.githubusercontent.com/u/117996562?v=4',
    linkGithub: 'https://github.com/joaotavaresmatos',
    linkLinkedin: null,
    descricao:
    'Desenvolvedor competente que contribuiu de maneira exemplar para o desenvolvimento do site de notícias. Sua criatividade e atenção aos detalhes foram essenciais para criar uma plataforma intuitiva e envolvente para os usuários.',
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
            source={item.linkImagem === 'Imageluis' ? require('@/assets/image.png'): { uri: item.linkImagem }}
            style={{ width: 50, height: 50, borderRadius: 30, marginRight: 10 }}
          />
          <View style={{ marginLeft: '1%' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{item.nome}</Text>
            <Text>{item.funcao}</Text>
          </View>
        </View>

        <XStack alignItems='center'>
          <ChevronRightCircle
            backgroundColor='#D9D9D9'
            borderRadius={100}
            strokeWidth={2.3}
            alignItems='center'
          />
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
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    width: '90%',
  }}
>
  <TouchableOpacity onPress={() => Linking.openURL(item.linkGithub)}>
    <View>
      <GithubIcon style={{ width: 25, height: 25, marginStart: 50 }} />
    </View>
  </TouchableOpacity>
  {item.linkLinkedin && (
    <TouchableOpacity onPress={() => item.linkLinkedin ?  Linking.openURL(item.linkLinkedin): null}>
      <View>
        <LinkedinIcon style={{ marginStart: 10 }} />
      </View>
    </TouchableOpacity>
  )}
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
          source={MyImage}
          style={{
            width: '80%',
            height: 230,
            borderRadius: 20,
            marginTop: 35,
            marginBottom: 50,
          }}
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
