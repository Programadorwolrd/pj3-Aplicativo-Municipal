import { useState, useEffect, useRef } from 'react'
import type { TabsContentProps } from 'tamagui'
import { Button, H5, Separator, SizableText, Tabs, XStack, YStack, isWeb, Text, View, useTabsContext } from 'tamagui'

const demos = ['horizontal', 'vertical'] as const

const demosTitle: Record<(typeof demos)[number], string> = {

  horizontal: 'Horizontal',

  vertical: 'Vertical',

}

export function TabsDemo({catalogo}) {

  const [demoIndex, setDemoIndex] = useState(0)
  const demo = demos[demoIndex]

  return (

    <YStack
      paddingHorizontal="$4"
      {...(isWeb && {
        position: 'unset' as any,
      })}
    >

      <HorizontalTabs catalogo= {catalogo} />
      <XStack
        alignItems="center"
        space
        position="absolute"
        bottom="$3"
        left="$4"
        $xxs={{ display: 'none' }}
      >

      </XStack>

    </YStack>

  )
}


const HorizontalTabs = ({catalogo}) => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)


  useEffect(() =>{
    if(ref.current){
      setShowReadMoreButton(
        ref.current.scrollHeigth !== ref.current.clientHeight
      )
    }
  }, [])

  return (

    <Tabs
      defaultValue="tab1"
      orientation="horizontal"
      flexDirection="column"
      width={360}
      height={150}
      backgroundColor="$background"  
    //   borderWidth="$0"
      overflow="hidden"
    //   borderColor="$borderColor"
    >

      <Tabs.List
        separator={<Separator vertical />}
        // disablePassBorderRadius="bottom"
        aria-label="Manage your account"
      >

        <Tabs.Tab 
         flex={1} 
         value="tab1"
         backgroundColor="#000"
         color= "#fff"
         borderWidth="$0"
         borderBottomWidth={activeTab === 'tab1' ? 3 : 0} 
         borderBottomColor={activeTab === 'tab1' ? 'green' : 'transparent'}
        >
        <SizableText color="white" fontSize={18} >Detalhes</SizableText>
        </Tabs.Tab>

        <Tabs.Tab 
          flex={1} 
          value="tab2"
          backgroundColor="#000"
          color= "#fff"
          borderWidth="$0"
          borderBottomWidth={activeTab === 'tab2' ? 3 : 0} 
          borderBottomColor={activeTab === 'tab2' ? 'green' : 'transparent'}
        >
        <SizableText color="white" fontSize={18} >Audio</SizableText>
        </Tabs.Tab>

        <Tabs.Tab 
        flex={1} 
        value="tab3"
        backgroundColor="#000"
        color= "#fff"
        borderWidth="$0"
        borderBottomWidth={activeTab === 'tab3' ? 3 : 0} 
        borderBottomColor={activeTab === 'tab3' ? 'green' : 'transparent'}
        >
        <SizableText color="white" fontSize={18} >Mapa</SizableText>
        </Tabs.Tab>

      </Tabs.List>

      <Separator />

      <TabsContent value="tab1">
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex:1 }}>
      <Text 
        style={{
          color: '#939393',
          fontSize: 16,
        }}
        numberOfLines={isOpen ? undefined : 2}>
        {catalogo.detalhes}
      </Text>
      <Button 
        style={{
          backgroundColor: 'transparent',
          borderWidth: 0,
          color: '#2e955a',
        }}
        onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Ler menos' : 'Ler mais'}
      </Button>
      </View>
      </TabsContent>
      <TabsContent value="tab2">


        <Text color="#939393" fontSize={18}>{catalogo.audio}</Text>

      </TabsContent>
      <TabsContent value="tab3">

        <Text color="#939393" fontSize={18}>{catalogo.map}</Text>

      </TabsContent>

    </Tabs>

  )

}

const TabsContent = (props: TabsContentProps) => {

  return (

    <Tabs.Content
      backgroundColor="$background"
      key="tab3"
      padding="$2"
      alignItems="center"
      justifyContent="center"
      textAlign="justify"
      flex={2}
      color="white"
      borderColor="$background"
      borderRadius="$2"
      borderTopLeftRadius={0}
      borderTopRightRadius={0}
      borderWidth="$0"
    //   overflow='hidden'
      height={400}
      {...props}
    >

      {props.children}

    </Tabs.Content>

  )

}


const paragraphStyles = {
  webkitLineClamp: 2,
  webkitBoxOrient: 'vertical',
  overFlow: 'hidden',
  display: '-webkit-box',
  color:"#939393",
  fontSize: 18,
}