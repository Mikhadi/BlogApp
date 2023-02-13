import { FC } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import MyColors from "../themes/myTheme";

const AddPostScreen: FC = () => {
    return (
      <View style={styles.container}>
        <Text>Welcome to add post screen</Text>
      </View>
    );
  };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      backgroundColor: MyColors.background
    },
});

export default AddPostScreen