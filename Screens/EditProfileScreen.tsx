import { FC, useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MyColors from "../themes/myTheme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import UserModel, { User } from "../Model/UserModel";
import Modal from "react-native-modal";
import { useAuth } from "../Contexts/AuthContext";
import { Loading } from "../components/Loading";

const EditProfileScreen: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const auth = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hiddenPass, setHiddenPass] = useState(true);
  const [eyeIcon, setEyeIcon]: any = useState("eye-outline");
  const [modalVisible, setModalVisible] = useState(false);
  const [avatarUri, setAvatarUri] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [imageModified, setImageModified] = useState(false);

  const openCamera = async () => {
    setModalVisible(false);
    try {
      const res = await ImagePicker.launchCameraAsync();
      if (!res.canceled && res.assets.length > 0) {
        const uri = res.assets[0].uri;
        setAvatarUri(uri);
        setImageModified(true);
      }
    } catch (err) {
      console.log("Open camera failed");
    }
  };

  const openGallery = async () => {
    setModalVisible(false);
    try {
      const res = await ImagePicker.launchImageLibraryAsync();
      if (!res.canceled && res.assets.length > 0) {
        const uri = res.assets[0].uri;
        setAvatarUri(uri);
        setImageModified(true);
      }
    } catch (err) {
      console.log("Open gallery failed");
    }
  };

  const onSaveCallback = async () => {
    setLoading(true)
    let res: any;
    let dataJson: Object = {
      username: username,
      name: name,
      email: email,
    };
    if (imageModified) {
      const url = await UserModel.uploadImage(avatarUri)
      if(url == ""){
        ToastAndroid.show("NETWORK_ERROR, TRY AGAIN", ToastAndroid.SHORT)
        setLoading(false)
        return
      }
      Object.assign(dataJson, { avatar_url: url });
    }
    if (password != "") {
      Object.assign(dataJson, { password: password });
    }
    try{
      res = await UserModel.updateUser(dataJson, auth.authData?.accessToken)
      if(res.status == 200){
        ToastAndroid.show("Profile Updated", ToastAndroid.SHORT)
        navigation.goBack()
      }else{
        setError(res.data.error)
      }
      setLoading(false)
    }catch(err){
      console.log("Error updating profile " + err)
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      let user: User;
      try {
        user = await UserModel.getUser(
          auth.authData!.id,
          auth.authData?.accessToken
        );
      } catch (err) {
        console.log("Failed getting user" + err);
      }
      setEmail(user!.email);
      setName(user!.name);
      setUsername(user!.username);
      setAvatarUri(user!.avatar);
      setLoading(false);
    });
    return unsubscribe;
  });

  const hidePass = () => {
    setHiddenPass(!hiddenPass);
    if (hiddenPass == true) {
      setEyeIcon("eye-off-outline");
    } else {
      setEyeIcon("eye-outline");
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <Modal
        isVisible={modalVisible}
        backdropOpacity={0}
        onBackdropPress={() => {
          setModalVisible(false);
        }}
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.modalView}>
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={openGallery}
          >
            <Ionicons name="images" size={80} color={MyColors.background} />
            <Text style={{ color: MyColors.background }}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={openCamera}
          >
            <Ionicons name="camera" size={80} color={MyColors.background} />
            <Text style={{ color: MyColors.background }}>Camera</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <KeyboardAwareScrollView>
        <View style={{ alignItems: "center" }}>
          <View style={styles.addImageView}>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.addImageButton}
            >
              {avatarUri == "" ? (
                <Image
                  source={require("../assets/add_photo.png")}
                  style={styles.addImageButton}
                />
              ) : (
                <Image
                  source={{ uri: avatarUri }}
                  style={styles.addImageButton}
                />
              )}
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
          <Text style={{ color: "red" }}>{error}</Text>
        </View>
      </KeyboardAwareScrollView>
      <View
        style={{
          alignItems: "center",
          marginBottom: 10,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: MyColors.text }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSaveCallback}>
          <Text style={{ color: MyColors.text }}>Save</Text>
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
    flex: 1,
    height: 52,
    margin: 15,
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

export default EditProfileScreen;
