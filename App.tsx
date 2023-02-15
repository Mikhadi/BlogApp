import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FC } from "react";

import AuthStack from "./components/AuthComponent";
import TabsStack from "./components/TabsComponent";

const App: FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
      <NavigationContainer>
        {isAuthenticated ? <TabsStack /> : <AuthStack />}
      </NavigationContainer>
  );
};

export default App;
