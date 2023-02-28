import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, Image, StatusBar, StyleSheet } from "react-native";

import HomeScreen from "../Screens/HomeScreen";
import ChatScreen from "../Screens/ChatScreen";
import SettingsScreen from "../Screens/SettingsScreen";
import AddPostScreen from "../Screens/AddPostScreen";
import ProfileNav from "./MyProfileNavComponent";
import SettingsNav from "./SettingsNavComponent";
import MyColors from "../themes/myTheme";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useAuth } from "../Contexts/AuthContext";
import { useEffect } from "react";

const customHeader = () => {
  return (
    <View
      style={{
        backgroundColor: MyColors.background,
        alignItems: "center",
        justifyContent: "center",
        height: 80,
      }}
    >
      <Image
        source={require("../assets/Logo.png")}
        style={{
          height: 70,
          marginTop: StatusBar.currentHeight,
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
          } else if (route.name === "ProfileNav") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "SettingsNav") {
            iconName = focused ? "settings" : "settings-outline";
          }
          return <Ionicons name={iconName} size={iconSize} color={color} />;
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: MyColors.primary,
        tabBarInactiveTintColor: "rgba(200, 200, 200, 1)",
        headerShown: true,
        tabBarStyle: styles.tabBar,
        tabBarHideOnKeyboard: true,
        header: customHeader,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Post" component={AddPostScreen} />
      <Tab.Screen name="ProfileNav" component={ProfileNav} 
      options={({ route }) => ({
        tabBarStyle: ((route) => {
          const routeName = getFocusedRouteNameFromRoute(route);
          if (routeName == "Edit Post") {
            return { display: "none" };
          }
          else{
            return styles.tabBar
          }
        })(route),
      })}/>
      <Tab.Screen
        name="SettingsNav"
        component={SettingsNav}
        options={({ route }) => ({
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route);
            if (routeName == "Edit Profile") {
              return { display: "none" };
            }
            else {
              return styles.tabBar
            }
          })(route),
        })}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "white",
    borderRadius: 15,
    height: 70,
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
  },
});

export default TabsStack;
