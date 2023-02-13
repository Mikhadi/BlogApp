import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { FC } from "react";

import AuthStack from './components/AuthComponent';
import TabsStack from "./components/TabsComponent";

const App: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  return (
    <NavigationContainer>
      <TabsStack route={route} navigation={navigation}/>
    </NavigationContainer>
    );
}

export default App
