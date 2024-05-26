import React from 'react';
import { FlatList, Image, StyleSheet, View, Text } from 'react-native';
// import MedalIcon from '@/assets/medal- 1.svg';

interface User {
  nome: string;
  funcao: string;
  linkImagem: string;
}

const usuarios: User[] = [
  {
    nome: 'Flavio Santos',
    funcao: 'Desenvolvedor web',
    linkImagem: 'https://via.placeholder.com/50',
  },
  {
    nome: 'Clemerson Rodrigues',
    funcao: 'Desenvolvedor web',
    linkImagem: 'https://via.placeholder.com/50',
  },
  {
    nome: 'Leonardo Paioso SP',
    funcao: 'Desenvolvedor web',
    linkImagem: 'https://via.placeholder.com/50',
  },
  {
    nome: 'Phet',
    funcao: 'Desenvolvedor web',
    linkImagem: 'https://via.placeholder.com/50',
  },
  {
    nome: 'Phet',
    funcao: 'Desenvolvedor web',
    linkImagem: 'https://via.placeholder.com/50',
  },
  {
    nome: 'Phet',
    funcao: 'Desenvolvedor web',
    linkImagem: 'https://via.placeholder.com/50',
  },
  {
    nome: 'Leonardo Paioso SP',
    funcao: 'Desenvolvedor web',
    linkImagem: 'https://via.placeholder.com/50',
  },
  {
    nome: 'Phet',
    funcao: 'Desenvolvedor web',
    linkImagem: 'https://via.placeholder.com/50',
  },
  {
    nome: 'Phet',
    funcao: 'Desenvolvedor web',
    linkImagem: 'https://via.placeholder.com/50',
  },
  {
    nome: 'Phet',
    funcao: 'Desenvolvedor web',
    linkImagem: 'https://via.placeholder.com/50',
  },
  {
    nome: 'Leonardo Paioso SP',
    funcao: 'Desenvolvedor web',
    linkImagem: 'https://via.placeholder.com/50',
  },
  {
    nome: 'Phet',
    funcao: 'Desenvolvedor web',
    linkImagem: 'https://via.placeholder.com/50',
  },
  {
    nome: 'Phet',
    funcao: 'Desenvolvedor web',
    linkImagem: 'https://via.placeholder.com/50',
  },
  {
    nome: 'Phet',
    funcao: 'Desenvolvedor web',
    linkImagem: 'https://via.placeholder.com/50',
  },
];

function Itens({ item, index }: { item: User; index: number }) {
  return (
    <View>
      <View style={styles.hr} />
    <View style={styles.itemContainer}>
      <View style={styles.userInfoContainer}>
        <Image
          source={{ uri: item.linkImagem }}
          style={styles.userImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.userName}>{item.nome}</Text>
          <Text>{item.funcao}</Text>
        </View>
      </View>
      <View style={styles.rankContainer}>
        {index < 3 && (
          <View style={styles.medalContainer}>
            <Text style={styles.rankTextAbove}>{index + 1}</Text>
            {/* <MedalIcon width={30} height={30} /> */}
          </View>
        )}
        {index >= 3 && (
          <Text style={styles.rankText}>{index + 1}</Text>
        )}
      </View>
    </View>
    </View>
  );
}

export default function Lista() {
  return (
    <View>
       <View style={styles.header}>
        <Image 
          source={ require('../../../assets/medalha-prata.png')}
        />
        <Image 
          source={ require('../../../assets/medalha-ouro.png')}
          style={styles.medalha}
        />
        <Image 
          source={ require('../../../assets/medalha-bronze.png')}
        />
      </View>
    <FlatList
      data={usuarios}
      renderItem={({ item, index }) => <Itens item={item} index={index} />}
      keyExtractor={(item, index) => index.toString()}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    marginLeft: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  rankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  medalContainer: {
    alignItems: 'center',
  },
  rankTextAbove: {
    position: 'absolute',
    top: -15,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  rankText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  header:{
    flexDirection: 'row',
    alignSelf: 'center',
  },
  hr: {
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
    width:310,
    alignSelf: 'center'
  },
  medalha:{
    marginTop: -20, 
  }
});

