import { FC } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";

const SettingsScreen: FC = () => {
    return (
      <View style={styles.container}>
        <Text>Welcome to settings screen</Text>
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

export default SettingsScreen