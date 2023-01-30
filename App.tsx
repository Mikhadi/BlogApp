import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./components/HomeScreen";
import ChatScreen from "./components/ChatScreen";
import ProfileScreen from "./components/ProfileScreen";
import SettingsScreen from "./components/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Chat") {
              iconName = focused ? "chatbox-ellipses" : "chatbox-ellipses-outline";
            }
            else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            }
            else if (route.name === "Settings") {
              iconName = focused ? "settings" : "settings-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#a0c1d1",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
