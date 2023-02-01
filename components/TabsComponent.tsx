import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from 'react-native'

import HomeScreen from "./HomeScreen";
import ChatScreen from "./ChatScreen";
import ProfileScreen from "./ProfileScreen";
import SettingsScreen from "./SettingsScreen";
import MyColors from "../themes/myTheme";
import { FC } from "react";

const TabsScreen: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) =>  {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <StatusBar hidden={true}/>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: any;
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
          tabBarActiveTintColor: MyColors.primary,
          tabBarInactiveTintColor: MyColors.text,
          headerShown: false,
          tabBarStyle: { backgroundColor: MyColors.background }
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

export default TabsScreen