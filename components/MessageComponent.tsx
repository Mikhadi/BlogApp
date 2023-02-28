import { FC, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import UserAPI from "../API/UserAPI";
import { useAuth } from "../Contexts/AuthContext";
import UserModel, { User } from "../Model/UserModel";
import MyColors from "../themes/myTheme";

export const MessageItem: FC<{
  id: String;
  from: String;
  text: String;
  time: Date;
}> = ({ id, from, text, time }) => {
  const auth = useAuth();

  const [avatar, setAvatar] = useState("");

  const getAvatar = async () => {
    let user: User;
    try {
      user = await UserModel.getUser(from, auth.authData?.accessToken);
      setAvatar(user.avatar);
    } catch (err) {
      console.log("Error getting user" + err);
    }
  };

  getAvatar();

  function getHoursAndMinutes(date: Date) {
    return (
      padTo2Digits(date.getHours()) + ":" + padTo2Digits(date.getMinutes())
    );
  }

  function padTo2Digits(num: Number) {
    return String(num).padStart(2, "0");
  }

  return (
    <View style={styles.container}>
      {avatar == "" ? (
        <Image source={require("../assets/avatar.png")} style={styles.avatar} />
      ) : (
        <Image source={{ uri: avatar }} style={styles.avatar} />
      )}
      <View style={styles.messageBox}>
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.time}>
          {getHoursAndMinutes(time)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 10,
  },
  title: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  avatar: {
    margin: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  time: {
    color: MyColors.gray,
    position: "absolute",
    bottom: 1,
    right: 10,
    fontSize: 10,
  },
  messageBox: {
    width: "70%",
    borderRadius: 15,
    backgroundColor: "rgba(131, 14, 247, 1)",
  },
  text: {
    margin: 10,
    color: MyColors.text,
    marginBottom: 8,
  },
});
