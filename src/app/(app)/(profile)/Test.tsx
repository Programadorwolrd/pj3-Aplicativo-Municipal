// import { Dimensions, Pressable } from "react-native";
// import type { CardProps } from "tamagui";
// import { useNavigation } from '@react-navigation/native'
// import { Button, Card, H2, Image, Paragraph, XStack, Text, View } from "tamagui";
// import useApi from "@/lib/useApi";
// import bichoIcon from "./../../../assets/macaco.png";

// interface PropsUser {
//   apelido: string;
//   foto: string,
//   lidopelouser: {
//     catalogo: {
//       uuid: string,
//       nomePopular: string
//     }
//   },
//   ranking: number;
// }
// const data: { nome: string; url: string; id: number }[] = [
//   { nome: "Capybara", url: 'https://e7.pngegg.com/pngimages/716/242/png-clipart-monkey-monkey.png', id: 1 },
//   { nome: "Sairá-7-Cores", url: 'https://e7.pngegg.com/pngimages/716/242/png-clipart-monkey-monkey.png', id: 2 },
//   { nome: "Esquilo", url: 'https://e7.pngegg.com/pngimages/716/242/png-clipart-monkey-monkey.png', id: 3 },
//   { nome: "Tucano", url: bichoIcon, id: 4 },
//   { nome: "Calango", url: 'https://e7.pngegg.com/pngimages/716/242/png-clipart-monkey-monkey.png', id: 5 },
//   { nome: "Juqueriquerê", url: bichoIcon, id: 6 },
//   { nome: "Caraguatá", url: 'https://e7.pngegg.com/pngimages/716/242/png-clipart-monkey-monkey.png', id: 7 },
//   { nome: "Quaresmeira", url: bichoIcon, id: 8 },
//   { nome: "Aranha", url: 'https://e7.pngegg.com/pngimages/716/242/png-clipart-monkey-monkey.png', id: 9 },
//   { nome: "Tatu", url: bichoIcon, id: 10 },
//   { nome: "Bicho 11", url: 'https://picsum.photos/100/100', id: 11 },
//   { nome: "Borboleta", url: bichoIcon, id: 12 },
//   { nome: "Borboleta", url: bichoIcon, id: 13 },
//   { nome: "Borboleta", url: bichoIcon, id: 14 },
//   { nome: "Borboleta", url: bichoIcon, id: 15 },
//   { nome: "Borboleta", url: bichoIcon, id: 16 },
// ];
// export function CardDemo(props: CardProps) {
//   // const user = useApi("query", (axios) => {
//   //   return {
//   //     queryKey: ['xabulha'],
//   //     queryFn: () => {
//   //       return axios.get('/usuario')

//   //     }
//   //   }
//   // })
//   // console.log(user.data?.data.usuario, 'user');

//   // const dataUser: PropsUser = {
//   //   apelido: user.data?.data.usuario.apelido,
//   //   foto: user.data?.data.usuario.foto,
//   //   lidopelouser: {
//   //     catalogo: {
//   //       uuid: user.data?.data?.usuario?.catalogo?.uuid,
//   //       nomePopular: user.data?.data?.usuariocatalogo?.nomePopular
//   //     }
//   //   },
//   //   ranking: 3
//   // }
//   // console.log(dataUser, 'data user')

//   const navigation = useNavigation()
//   return (
//     <XStack $sm={{ flexDirection: "column" }} paddingHorizontal="$4" space>
//       <Pressable onPress={() => navigation.navigate('', { data })}>
//         <View style={{
//           height: Dimensions.get("window").height / 4 - 12,
//           width: Dimensions.get("window").width / 3 - 4,
//         }}
//           animation="bouncy"

//           scale={0.9}
//           hoverStyle={{ scale: 0.925 }}
//           pressStyle={{ scale: 0.875 }}>

//           <Card
//             size="$4"
//             bordered
//             borderBottomColor={"#329F60"}
//             borderBottomStartRadius={"$3"}
//             borderBottomEndRadius={"$3"}
//             borderBottomWidth={"$1"}
//             {...props}
//             justifyContent={"center"}
//             alignItems={"center"}
//           >
//             <Card.Header
//               padded
//               justifyContent={"center"}
//               alignItems={"center"}
//             >
//               <Text fontSize={"$8"} color={"#000"}>
//                 # {item.id}
//               </Text>
//             </Card.Header>
//             <View>
//               <Image
//                 resizeMode="contain"
//                 alignSelf="center"
//                 source={{
//                   width: 100,
//                   height: 100,
//                   // uri: item.url,
//                   uri: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
//                 }}
//               />
//             </View>
//             <Card.Footer padded justifyContent={"center"}
//               alignItems={"center"} >
//               <XStack justifyContent={"center"}
//                 alignItems={"center"} />
//               <Text fontSize={"$6"} color={"#000"} textAlign={"center"}>
//                 {item.nome}
//               </Text>
//             </Card.Footer>

//             <Card.Background>

//             </Card.Background>
//           </Card>
//         </View>
//       </Pressable>
//     </XStack>
//   );
// }
// export function DemoCard() {
//   return (
//     <></>
//   );
// }

// const Modal = () => {
//   const [modalVisible, setModalVisible] = useState(false);
//   return (
//     <View style={styles.centeredView}>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           Alert.alert('Modal has been closed.');
//           setModalVisible(!modalVisible);
//         }}>
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Text style={styles.modalText}>Hello World!</Text>
//             <Pressable
//               style={[styles.button, styles.buttonClose]}
//               onPress={() => setModalVisible(!modalVisible)}>
//               <Text style={styles.textStyle}>Hide Modal</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>

//       <Pressable
//         style={[styles.button, styles.buttonOpen]}
//         onPress={() => setModalVisible(true)}>
//         <Text style={styles.textStyle}>Show Modal</Text>
//       </Pressable>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   button: {
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//   },
//   buttonOpen: {
//     backgroundColor: '#F194FF',
//   },
//   buttonClose: {
//     backgroundColor: '#2196F3',
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: 'center',
//   },
// });

import {
  Menu,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Settings,
} from "@tamagui/lucide-icons";

import Ionicons from "react-native-vector-icons/Ionicons";
import type { PopoverProps } from "tamagui";

import { Adapt, Button, Input, Label, Popover, Text, XStack, YStack } from "tamagui";
export function PopoverDemo() {
  return (
    <XStack
      space="$2"
      h={50}
      justifyContent="center"
      alignItems="center"
      backgroundColor={"$colorTransparent"}
    >
      <Demo
        placement="top"
        Icon={<Settings size={24} color="white" />}
        Name="bottom-popover"
      />
    </XStack>
  );
}
export function Demo({
  Icon,

  Name,

  ...props
}: PopoverProps & { Icon?: any; Name?: string }) {
  return (
    <Popover size="$5"  allowFlip {...props}>
      {/* botão  */}
      <Popover.Trigger asChild>
        <Button icon={Icon} backgroundColor={"$colorTransparent"} />
      </Popover.Trigger>

      <Adapt when="sm" platform="touch" >
        <Popover.Sheet modal dismissOnSnapToBottom >
          <Popover.Sheet.Frame padding="$4">
            <Adapt.Contents />
          </Popover.Sheet.Frame>
          <Popover.Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Popover.Sheet>
      </Adapt>
      <Popover.Content
        borderWidth={1}
        backgroundColor={"$colorTransparent"}
        borderColor="$red10Light"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
        size={"$5"}
        animation={[
          "quick",
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
      >

       
        <Popover.Arrow borderWidth={1} borderColor="$borderColor" />
        <YStack space="$3">
          <XStack space="$3">
            <Label size="$3" htmlFor={Name}>
              Name
            </Label>

            <Input size="$3" id={Name} />
          </XStack>
          <Popover.Close asChild>
            <Button
              backgroundColor={"$colorTransparent"}
              size="$3"
              onPress={() => {
                /* Custom code goes here, does not interfere with popover closure */
              }}
            >
              Submit
            </Button>
          </Popover.Close>
        </YStack>
      </Popover.Content>
    </Popover>
  );
}
