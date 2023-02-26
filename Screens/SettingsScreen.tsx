import { Ionicons } from "@expo/vector-icons";
import { FC, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../Contexts/AuthContext";
import MyColors from "../themes/myTheme";
import Modal from 'react-native-modal'

const SettingsScreen: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const auth = useAuth();
  const logoutPressed = async () => {
    await auth.signOut();
  };

  const [modal, setModal] = useState(false)

  return (
    <View style={styles.container}>
      <Modal
        isVisible={modal}
        onBackdropPress={() => {
          setModal(false);
        }}
        backdropOpacity={0}
        style={{
          justifyContent: 'center',
          alignItems:'center',
        }}>
        <View style={styles.modalView}>
          <Text style={{textAlign: 'center', fontFamily: 'sans-serif'}}>
            App Created by Mikhail Diyachkov
          </Text>
        </View>
      </Modal>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          marginLeft: 10,
          borderBottomWidth: 2,
          borderBottomColor: "white",
          marginRight: 10,
        }}
      >
        <Ionicons name={"create"} color={"white"} size={40} />
        <Text style={{ color: "white", fontSize: 20 }}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
      onPress={() => setModal(true)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          marginLeft: 10,
          borderBottomWidth: 2,
          borderBottomColor: "white",
          marginRight: 10,
        }}
      >
        <Ionicons name={"alert-circle"} color={"white"} size={40} />
        <Text style={{ color: "white", fontSize: 20 }}>About</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={logoutPressed}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          marginLeft: 10,
          borderBottomWidth: 2,
          borderBottomColor: "white",
          marginRight: 10,
        }}
      >
        <Ionicons name={"log-out"} color={"white"} size={40} />
        <Text style={{ color: "white", fontSize: 20 }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MyColors.background,
  },
  modalView: {
    backgroundColor: MyColors.gray,
    height: 100,
    width: 140,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: 'center',
  },
});

export default SettingsScreen;
