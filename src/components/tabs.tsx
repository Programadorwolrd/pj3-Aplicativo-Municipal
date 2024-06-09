import { useState, useEffect, useRef } from "react";
import type { TabsContentProps } from "tamagui";
import { Button, Tabs, XStack, YStack, isWeb, Text, View } from "tamagui";
import { Audio } from "expo-av";
import { Pressable } from "react-native";

const demos = ["horizontal", "vertical"] as const;

// const demosTitle: Record<(typeof demos)[number], string> = {

//   horizontal: 'Horizontal',

//   vertical: 'Vertical',

// }

export function TabsDemo({ catalogo }) {
  const [demoIndex, setDemoIndex] = useState(0);
  const demo = demos[demoIndex];

  return (
    <YStack
      paddingHorizontal="$4"
      {...(isWeb && {
        position: "unset" as any,
      })}
    >
      <HorizontalTabs catalogo={catalogo} />
      <XStack
        alignItems="center"
        space
        position="absolute"
        bottom="$3"
        left="$4"
        $xxs={{ display: "none" }}
      ></XStack>
    </YStack>
  );
}

const HorizontalTabs = ({ catalogo }) => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const [sound, setSound] = useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(catalogo.sound);
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    if (ref.current) {
      setShowReadMoreButton(
        ref.current.scrollHeigth !== ref.current.clientHeight
      );
    }
  }, []);

  return (
    <Tabs
      defaultValue="tab1"
      onValueChange={(value) => setActiveTab(value)}
      orientation="horizontal"
      flexDirection="column"
      width={360}
      backgroundColor="#000"
      overflow="hidden"
    >
      <Tabs.List
        disablePassBorderRadius="bottom"
        aria-label="Manage your account"
      >
        <Tabs.Tab
          flex={1}
          value="tab1"
          backgroundColor="#000"
          color="#fff"
          borderWidth="$0"
          borderRadius={0}
          themeInverse={true}
          borderBottomWidth={activeTab === "tab1" ? 2 : 0}
          borderBottomColor={activeTab === "tab1" ? "#329F60" : "transparent"}
        >
          <Text color="white" fontSize={16}>
            Detalhes
          </Text>
        </Tabs.Tab>

        <Tabs.Tab
          flex={1}
          value="tab2"
          backgroundColor="#000"
          color="#fff"
          themeInverse={true}
          borderWidth="$0"
          borderRadius={0}
          borderBottomWidth={activeTab === "tab2" ? 2 : 0}
          borderBottomColor={activeTab === "tab2" ? "#329F60" : "transparent"}
        >
          <Text color="white" fontSize={16}>
            Audio
          </Text>
        </Tabs.Tab>
      </Tabs.List>

      <TabsContent value="tab1">
        <View style={{ flexDirection: "row", flexWrap: "wrap", flex: 1 }}>
          <Text
            style={{
              color: "#939393",
              fontSize: 16,
            }}
            numberOfLines={isOpen ? undefined : 2}
          >
            {catalogo?.descricao}
          </Text>
          <Button
            style={{
              backgroundColor: "transparent",
              borderWidth: 0,
              color: "#329F60",
              margin: -17,
              marginTop: -10,
            }}
            onPress={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "Ler menos" : "Ler mais"}
          </Button>
        </View>
      </TabsContent>
      <TabsContent value="tab2">
        <Pressable
          style={{
            backgroundColor: "transparent",
            height: 50,
            width: 280,
            justifyContent: "center",
            alignItems: "center",
            borderColor: "#329F60",
            borderWidth: 1,
            borderRadius: 5,
            marginVertical: 5,
          }}
          onPress={playSound}
        >
          <Text style={{ color: "#329F60", fontSize: 18 }}>Escute o som</Text>
        </Pressable>
      </TabsContent>
    </Tabs>
  );
};

const TabsContent = (props: TabsContentProps) => {
  return (
    <Tabs.Content
      backgroundColor="#000"
      key="tab3"
      padding="$2"
      alignItems="center"
      justifyContent="center"
      flex={2}
      borderColor="#000"
      borderTopLeftRadius={0}
      borderTopRightRadius={0}
      {...props}
    >
      {props.children}
    </Tabs.Content>
  );
};
