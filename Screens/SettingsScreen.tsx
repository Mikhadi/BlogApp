import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../Contexts/AuthContext";
import MyColors from "../themes/myTheme";

const SettingsScreen: FC<{ route: any; navigation: any}> = ({
  route,
  navigation,
}) => {

  const auth = useAuth();
  const logoutPressed = async () => {
    await auth.signOut();
  }
  
  return (
    <View style={styles.container}>
        <TouchableOpacity
        onPress={logoutPressed}
          style={{flexDirection:'row', alignItems: 'center', marginTop: 20, marginLeft: 10, borderBottomWidth: 2, borderBottomColor: 'white', marginRight: 10}}>
          <Ionicons name={"log-out"} color={"white"} size={40} />
          <Text style={{color: 'white', fontSize: 20}}>Logout</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MyColors.background,
  },
});

export default SettingsScreen;
