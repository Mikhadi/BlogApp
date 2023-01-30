import { FC } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";

const ProfileScreen: FC = () => {
    return (
      <View style={styles.container}>
        <Text>Welcome to profile screen</Text>
      </View>
    );
  };

const styles = StyleSheet.create({
    container: {
      marginTop: StatusBar.currentHeight,
      flex: 1,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    },
});

export default ProfileScreen