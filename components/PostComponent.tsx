import { FC, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useAuth } from "../Contexts/AuthContext";
import UserModel, { User } from "../Model/UserModel";
import MyColors from "../themes/myTheme";

export const ListItem: FC<{
  id: String;
  image: any;
  text: String;
  sender: String;
}> = ({ id, image, text, sender }) => {
  const auth = useAuth()

  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");

  const getData = async () => {
    let user: User;
    try {
      user = await UserModel.getUser(sender, auth.authData?.accessToken);
      setAvatar(user.avatar);
      setUsername(user.username);
    } catch (err) {
      console.log("Error getting user" + err);
    }
  };

  getData();

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        {avatar == "" ? (
          <Image style={styles.avatar} source={require('../assets/avatar.png')} />
        ):(
          <Image style={styles.avatar} source={{ uri: avatar }} />
        )}
        <Text style={styles.name}>{username}</Text>
      </View>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  title: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  avatar: {
    marginLeft: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  name: {
    marginLeft: 10,
    color: MyColors.text,
  },
  image: {
    margin: 10,
    width: "95%",
    aspectRatio: 1,
    borderRadius: 3,
  },
  text: {
    marginLeft: 10,
    color: MyColors.text,
    marginBottom: 8,
  },
});
