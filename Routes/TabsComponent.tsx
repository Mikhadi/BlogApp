import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Image,
} from "react-native";

import HomeScreen from "../Screens/HomeScreen";
import ChatScreen from "../Screens/ChatScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import SettingsScreen from "../Screens/SettingsScreen";
import AddPostScreen from "../Screens/AddPostScreen";
import MyColors from "../themes/myTheme";
import React, { Dispatch, FC, SetStateAction } from "react";
import { StatusBar } from "expo-status-bar";

const customHeader = () => {
  return (
    <View
      style={{
        backgroundColor: MyColors.background,
        alignItems: "center",
        justifyContent: "center",
        height: 60,
      }}
    >
      <Image
        source={require("../assets/Logo.png")}
        style={{
          height: 70,
        }}
        resizeMode={"center"}
      />
    </View>
  );
};

const TabsStack = () => {
  const Tab = createBottomTabNavigator();
  return (
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
        tabBarInactiveTintColor: "rgba(200, 200, 200, 1)",
        headerShown: true,
        tabBarStyle: {
          backgroundColor: "white",
          borderRadius: 15,
          height: 70,
          position: "absolute",
          bottom: 10,
          left: 10,
          right: 10,
        },
        tabBarHideOnKeyboard : true,
        header: customHeader,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Post" component={AddPostScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default TabsStack;
