import { Dispatch, FC, SetStateAction, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
  ToastAndroid
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MyColors from "../themes/myTheme";
import UserModel from "../Model/UserModel";

const facebookPressed = () => {
  alert("Facebook presed");
};

const googlePressed = () => {
  alert("Google presed");
};

const WelcomeScreen: FC<{ route: any; navigation: any}> = ({
  route,
  navigation,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hiddenPass, setHiddenPass] = useState(true);
  const [eyeIcon, setEyeIcon]: any = useState("eye-outline");
  const [error, setError] = useState("")

  const loginPressed = async () => {
    let res: any
    try{
      res = await UserModel.login(username, password)
    }catch(err){
      console.log("Failed login user")
    }
    if (res.status == 200){
      Alert.alert("Success", "Access token - "+res.data.refreshToken)
    }else{
      setError(res.data.error)
    }
  }

  const hidePass = () => {
    setHiddenPass(!hiddenPass);
    if (hiddenPass == true) {
      setEyeIcon("eye-off-outline");
    } else {
      setEyeIcon("eye-outline");
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "flex-start", marginTop: 40 }}>
        <Text style={styles.loginText}>Welcome</Text>
        <Text style={styles.loginText}>to BlogApp</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.inputName}>Username</Text>
        <LinearGradient
          style={styles.linearGradient}
          colors={[MyColors.gradientStart, MyColors.gradientEnd]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
          <TextInput
            style={styles.inputField}
            onChangeText={setUsername}
            value={username}
            placeholder="johndoe"
            placeholderTextColor={MyColors.text}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </LinearGradient>
        <Text style={styles.inputName}>Password</Text>
        <LinearGradient
          style={styles.linearGradient}
          colors={[MyColors.gradientStart, MyColors.gradientEnd]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
          <TextInput
            style={styles.inputField}
            onChangeText={setPassword}
            value={password}
            placeholder="******"
            placeholderTextColor={MyColors.text}
            secureTextEntry={hiddenPass}
          />
          <TouchableOpacity
            style={{ alignSelf: "center", marginRight: 12 }}
            onPress={hidePass}
          >
            <Ionicons name={eyeIcon} size={25} color={MyColors.text} />
          </TouchableOpacity>
        </LinearGradient>
        <Text style={{color: 'red'}}>{error}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "80%",
            height: 60,
          }}
        >
          <View
            style={{ flex: 1, height: 1, backgroundColor: MyColors.text }}
          />
          <View>
            <Text
              style={{
                marginLeft: 10,
                marginRight: 10,
                textAlign: "center",
                color: MyColors.text,
              }}
            >
              or
            </Text>
          </View>
          <View
            style={{ flex: 1, height: 1, backgroundColor: MyColors.text }}
          />
        </View>
        <View style={[styles.register, { width: "85%" }]}>
          <TouchableOpacity
            style={{
              margin: 12,
              flex: 1,
              alignItems: "center",
              backgroundColor: MyColors.facebookButton,
              padding: 10,
              borderRadius: 8,
            }}
            onPress={facebookPressed}
          >
            <Ionicons name="logo-facebook" size={40} color={MyColors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              margin: 12,
              flex: 1,
              alignItems: "center",
              backgroundColor: MyColors.googleButton,
              padding: 10,
              borderRadius: 8,
            }}
            onPress={googlePressed}
          >
            <Ionicons name="logo-google" size={40} color={MyColors.text} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <TouchableOpacity style={styles.button} onPress={loginPressed}>
          <Text style={{ color: MyColors.text }}>Login</Text>
        </TouchableOpacity>
        <View style={styles.register}>
          <Text style={{ color: MyColors.text }}>I'm a new user, </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: MyColors.primary }}>Registration</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: MyColors.background,
  },
  loginText: {
    color: MyColors.text,
    fontSize: 40,
    fontWeight: "bold",
    marginStart: "10%",
  },
  linearGradient: {
    flexDirection: "row",
    height: 52,
    width: "80%",
    borderRadius: 8,
  },
  inputName: {
    alignSelf: "flex-start",
    color: MyColors.gray,
    fontSize: 12,
    marginLeft: "13%",
    marginTop: 12,
    marginBottom: 5,
  },
  inputField: {
    flex: 1,
    padding: 10,
    color: MyColors.text,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: MyColors.text,
  },
  button: {
    height: 52,
    width: "80%",
    margin: 12,
    borderRadius: 8,
    backgroundColor: MyColors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  register: {
    flexDirection: "row",
  },
});

export default WelcomeScreen;
