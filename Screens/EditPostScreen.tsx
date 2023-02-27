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
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MyColors from "../themes/myTheme";
import * as ImagePicker from "expo-image-picker";
import UserModel from "../Model/UserModel";
import PostModel, { Post } from "../Model/PostModel";
import { useAuth } from "../Contexts/AuthContext";
import Modal  from "react-native-modal"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Loading } from "../components/Loading";

const EditPostScreen: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const postId = route.params.postId;
  const auth = useAuth();

  const [description, setDescription] = useState(postId);
  const [modalVisible, setModalVisible] = useState(false);
  const [photoUri, setPhotoUri] = useState("");
  const [loading, setLoading] = useState(true);
  const [imageUpdated, setImageUpdated] = useState(false);

  const openCamera = async () => {
    setModalVisible(false);
    try {
      const res = await ImagePicker.launchCameraAsync();
      if (!res.canceled && res.assets.length > 0) {
        const uri = res.assets[0].uri;
        setPhotoUri(uri);
        setImageUpdated(true)
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
        setImageUpdated(true)
      }
    } catch (err) {
      console.log("Open gallery failed");
    }
  };

  const savePost = async () => {
    setLoading(true);
    let res: any;
    let url: string = "";
    try {
      if (imageUpdated) {
        url = await UserModel.uploadImage(photoUri);
        if(url == ""){
          ToastAndroid.show("NETWORK_ERROR, TRY AGAIN", ToastAndroid.SHORT)
          setLoading(false)
          return
        }
      } else {
        url = photoUri;
      }
      res = await PostModel.updatePost(
        postId,
        { message: description, image: url },
        auth.authData?.accessToken
      );
    } catch (err) {
      console.log("Failed updating post");
    }
    if (res != null) {
      if (res.status == 200) {
        ToastAndroid.show("Post Updated succesfully", ToastAndroid.SHORT);
        setLoading(false);
        navigation.pop();
      } else {
        console.log("Error updating post");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const post: Post = await PostModel.getPostById(
        postId,
        auth.authData?.accessToken
      );
      setDescription(post.message);
      setPhotoUri(post.image);
      setLoading(false);
    });
    return unsubscribe;
  }, [navigation]);

  if(loading){
    return <Loading/>
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
        {loading ? (
          <Modal 
          backdropOpacity={0.7}
          isVisible={true}
          >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator
              color={MyColors.primary}
              animating={loading}
              size="large"
            />
          </View>
          </Modal>
        ) : (
          <>
          <KeyboardAwareScrollView>
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
                    <Image
                      source={{ uri: photoUri }}
                      style={styles.addImageButton}
                    />
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
            </KeyboardAwareScrollView>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.pop()}
                style={styles.button}
              >
                <Text style={{ color: MyColors.text }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={savePost} style={styles.button}>
                <Text style={{ color: MyColors.text }}>Save</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
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

export default EditPostScreen;
