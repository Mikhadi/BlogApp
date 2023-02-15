import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import {
  StatusBar,
  StyleSheet,
  View, Text, Image, Dimensions,
} from "react-native";

import HomeScreen from "./HomeScreen";
import ChatScreen from "./ChatScreen";
import ProfileScreen from "./ProfileScreen";
import SettingsScreen from "./SettingsScreen";
import AddPostScreen from "./AddPostScreen";
import MyColors from "../themes/myTheme";
import { FC } from "react";

const customHeader =() => {
  return (
    <View style={{
      backgroundColor: MyColors.background,
      alignItems: 'center',
      justifyContent: 'center',
      height: 80,
    }}>
      <Image source={require('../assets/Logo.png')} 
      style={{
        height: 70,
      }}
      resizeMode={'center'}/>
    </View>
  )
}

const TabsStack: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const Tab = createBottomTabNavigator();

  return (
    <>
      <StatusBar hidden={true} />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName: any;
            let iconSize: any = 25;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Chat") {
              iconName = focused
                ? "chatbox-ellipses"
                : "chatbox-ellipses-outline";
            } else if (route.name === "Post") {
              iconName = "add-circle";
              iconSize = 45;
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "settings" : "settings-outline";
            }
            return <Ionicons name={iconName} size={iconSize} color={color} />;
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: MyColors.primary,
          tabBarInactiveTintColor: 'rgba(200, 200, 200, 1)',
          headerShown: true,
          tabBarStyle: {
            backgroundColor: 'white',
            borderRadius: 15,
            height: 70,
            position: 'absolute',
            bottom: 10,
            left: 10, 
            right: 10,
          },
          header: customHeader
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Post" component={AddPostScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </>
  );
};

export default TabsStack;