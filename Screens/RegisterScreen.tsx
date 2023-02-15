import { FC, useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MyColors from "../themes/myTheme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const RegisterScreen: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hiddenPass, setHiddenPass] = useState(true);
  const [eyeIcon, setEyeIcon]: any = useState("eye-outline");
  const [modalVisible, setModalVisible] = useState(false);

  const loginPressed = () => {
    let reg: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      alert("Email is Not Correct");
    } else {
      alert("Email is Correct");
    }
  };

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
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalView}>
            <TouchableOpacity style={{ alignItems: "center" }}>
              <Ionicons name="images" size={80} color={MyColors.background} />
              <Text style={{ color: MyColors.background }}>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: "center" }}>
              <Ionicons name="camera" size={80} color={MyColors.background} />
              <Text style={{ color: MyColors.background }}>Camera</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <View
          style={{ marginTop: 40, flexDirection: "row", alignItems: "center", marginBottom: 20 }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 10 }}
          >
            <Ionicons
              name={"arrow-back-outline"}
              size={30}
              color={MyColors.text}
            />
          </TouchableOpacity>
          <Text style={styles.loginText}>Registration</Text>
        </View>
        <KeyboardAwareScrollView>
        <View style={{ alignItems: "center" }}>
          <View style={styles.addImageView}>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.addImageButton}
            >
              <Image
                source={require("../assets/add_photo.png")}
                style={styles.addImageButton}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.inputName}>Name</Text>
          <LinearGradient
            style={styles.linearGradient}
            colors={[MyColors.gradientStart, MyColors.gradientEnd]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          >
            <TextInput
              style={styles.inputField}
              onChangeText={setName}
              value={name}
              placeholder="John Doe"
              placeholderTextColor={MyColors.text}
              autoCapitalize="words"
              autoCorrect={false}
            />
          </LinearGradient>
          <Text style={styles.inputName}>Email</Text>
          <LinearGradient
            style={styles.linearGradient}
            colors={[MyColors.gradientStart, MyColors.gradientEnd]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          >
            <TextInput
              style={styles.inputField}
              onChangeText={setEmail}
              value={email}
              placeholder="johndoe@example.com"
              placeholderTextColor={MyColors.text}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
            />
          </LinearGradient>
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
        </View>
        </KeyboardAwareScrollView>
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <TouchableOpacity style={styles.button} onPress={loginPressed}>
            <Text style={{ color: MyColors.text }}>Register</Text>
          </TouchableOpacity>
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
  button: {
    height: 52,
    width: "80%",
    margin: 12,
    borderRadius: 8,
    backgroundColor: MyColors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  addImageView: {
    aspectRatio: 1,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: MyColors.gray,
  },
  addImageButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 75,
    aspectRatio: 1,
    height: 150,
  },
  modalView: {
    flexDirection: "row",
    backgroundColor: MyColors.gray,
    height: 140,
    position: "absolute",
    bottom: 5,
    width: "100%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default RegisterScreen;
