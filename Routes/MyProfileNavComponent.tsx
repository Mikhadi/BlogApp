import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileScreen from "../Screens/ProfileScreen";
import EditPostScreen from "../Screens/EditPostScreen";

const Stack = createNativeStackNavigator();

const ProfileNav = () => {
  return (
      <Stack.Navigator
        screenOptions={{
          animation: "slide_from_right",
          headerShown: false,
        }}
      >
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Edit Post" component={EditPostScreen}/>
      </Stack.Navigator>
  );
};

export default ProfileNav;
