import { useState } from 'react'

import type { TabsContentProps } from 'tamagui'

import { Button, H5, Separator, SizableText, Tabs, XStack, YStack, isWeb, Text, View } from 'tamagui'
const demos = ['horizontal', 'vertical'] as const

const demosTitle: Record<(typeof demos)[number], string> = {

  horizontal: 'Horizontal',

  vertical: 'Vertical',

}
export function TabsDemo({catalogo}) {

  const [demoIndex, setDemoIndex] = useState(0)

  const demo = demos[demoIndex]
  return (

    // web only fix for position relative

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

  return (

    <Tabs
      defaultValue="tab1"
      orientation="horizontal"
      flexDirection="column"
      width={400}
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
         flex={1} value="tab1"
         backgroundColor="#000"
         color= "#fff"
         borderWidth="$0"
        >

          <SizableText fontFamily="$body">Detalhes</SizableText>

        </Tabs.Tab>

        <Tabs.Tab flex={1} 
        value="tab2"
        backgroundColor="#000"
        color= "#fff"
        borderWidth="$0"
        fontSize= "$3">

          <SizableText fontFamily="$body">Audio</SizableText>

        </Tabs.Tab>

        <Tabs.Tab 
        flex={1} value="tab3"
        backgroundColor="#000"
        color= "#fff"
        borderWidth="$0">

          <SizableText fontFamily="$body">Mapa</SizableText>

        </Tabs.Tab>

      </Tabs.List>

      <Separator />

      <TabsContent value="tab1">

      <Text>{catalogo.detalhes}</Text>
       
      </TabsContent>
      <TabsContent value="tab2">


        <Text>{catalogo.audio}</Text>

      </TabsContent>
      <TabsContent value="tab3">

        <Text>{catalogo.map}</Text>

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
      color="#878787"
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
