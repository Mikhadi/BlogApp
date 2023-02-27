import { FC, useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MyColors from "../themes/myTheme";
import * as ImagePicker from "expo-image-picker";
import UserModel from "../Model/UserModel";
import PostModel from "../Model/PostModel";
import { useAuth } from "../Contexts/AuthContext";
import Modal from "react-native-modal";

const AddPostScreen: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const auth = useAuth();
  
  const [description, setDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [photoUri, setPhotoUri] = useState("");
  const [bottomMargin, setBottomMargin] = useState(80);

  const openCamera = async () => {
    setModalVisible(false);
    try {
      const res = await ImagePicker.launchCameraAsync();
      if (!res.canceled && res.assets.length > 0) {
        const uri = res.assets[0].uri;
        setPhotoUri(uri);
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
        setPhotoUri(uri);
      }
    } catch (err) {
      console.log("Open gallery failed");
    }
  };

  const addPost = async () => {
    let res: any
    let url: string = ""
    try{
      if (photoUri != ""){
        url = await UserModel.uploadImage(photoUri)
      }
      res = await PostModel.addPost(description, url, auth.authData?.accessToken)
    }catch(err){
      console.log("Failed adding post")
    }
    if ( res != null){
      if (res.status == 200){
        ToastAndroid.show("Post Added succesfully", ToastAndroid.LONG)
        setDescription("")
        setPhotoUri("")
      }
      else{
        console.log("Error adding post")
      }
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setBottomMargin(0)
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setBottomMargin(80)
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
      <Modal
          isVisible={modalVisible}
          backdropOpacity={0}
          onBackdropPress={() => {
            setModalVisible(false);
          }}
          style={{
            justifyContent: 'center',
            alignItems:'center',
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
      <View style={{ alignItems: "center" }}>
        <View style={styles.addImageView}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.addImageButton}
          >
            {photoUri == "" ? (
              <Image
                source={require("../assets/add_photo.png")}
                style={styles.addImageButton}
              />
            ) : (
              <Image source={{ uri: photoUri }} style={styles.addImageButton} />
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.inputName}>Description</Text>

        <LinearGradient
          style={styles.linearGradient}
          colors={[MyColors.gradientStart, MyColors.gradientEnd]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
          <TextInput
            style={styles.inputField}
            onChangeText={setDescription}
            value={description}
            autoCapitalize="words"
            autoCorrect={false}
            multiline={true}
          />
        </LinearGradient>
      </View>
      
      <View style={{ alignItems: "center", marginBottom: bottomMargin }}>
        <TouchableOpacity onPress={addPost} style={styles.button}>
          <Text style={{ color: MyColors.text }}>Post</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MyColors.background,
  },
  linearGradient: {
    flexDirection: "row",
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
    width: "70%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: MyColors.gray,
    marginTop: 20,
  },
  addImageButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
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

export default AddPostScreen;
