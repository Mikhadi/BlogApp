import { FC } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";

const AddPostScreen: FC = () => {
    return (
      <View style={styles.container}>
        <Text>Welcome to add post screen</Text>
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

export default AddPostScreen