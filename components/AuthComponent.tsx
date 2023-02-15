import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "../Screens/WelcomeScreen";
import RegisterScreen from "../Screens/RegisterScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="Login" component={WelcomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
  );
};

export default AuthStack;
