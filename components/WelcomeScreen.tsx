import { FC, useState } from "react";
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity } from "react-native";

const WelcomeScreen: FC = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
      <View style={styles.container}>
        <TextInput style={styles.input} onChangeText={setEmail} value={email} placeholder="Email"/>
        <TextInput style={styles.input} onChangeText={setPassword} value={password} placeholder="Password" secureTextEntry={true}/>
        <TouchableOpacity style={ styles.button }>
            <Text>Login</Text>
        </TouchableOpacity>
        <View style={styles.register}>
            <Text>Not registerd yet, </Text>
            <TouchableOpacity>
                <Text style={{color: "blue"}}>Register</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
    container: {
      marginTop: StatusBar.currentHeight,
      flex: 1,
      justifyContent: "center",
    },
    input: {
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        borderColor: "#a0c1d1",
    },
    button: {
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        borderColor: "grey",
        backgroundColor: "#a0c1d1",
        alignSelf: "center",
    },
    register: {
        flexDirection: 'row',
        alignSelf: "center"
    }
});

export default WelcomeScreen