import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "./components/WelcomeScreen";
import RegisterScreen from "./components/RegisterScreen";
import MyColors from "./themes/myTheme";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ title: "Apply to all", headerShown: false, animation: 'none'}}>
        <Stack.Screen name="Login" component={WelcomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
