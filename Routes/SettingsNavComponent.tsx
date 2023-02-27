import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SettingsScreen from "../Screens/SettingsScreen";
import EditProfileScreen from "../Screens/EditProfileScreen";

const Stack = createNativeStackNavigator();

const SettingsNav = () => {
  return (
      <Stack.Navigator
        screenOptions={{
          animation: "slide_from_right",
          headerShown: false,
        }}
      >
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Edit Profile" component={EditProfileScreen}/>
      </Stack.Navigator>
  );
};

export default SettingsNav;
