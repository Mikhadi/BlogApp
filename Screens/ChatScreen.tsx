import { FC, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
} from "react-native";

import MyColors from "../themes/myTheme";
import { MessageItem } from "../components/MessageComponent";
import { MyMessageItem } from "../components/MyMessageComponent";
import { useAuth } from "../Contexts/AuthContext";
import { authService } from "../Services/AuthService";
import { Loading } from "../components/Loading";

type Message = {
  id: String;
  from: String;
  to: String;
  message: String;
  time: Date;
};

const ChatScreen: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const socket = useAuth().authData?.socket;
  const id = useAuth().authData?.id;

  const [message, setMessage] = useState("");
  const [bottomMargin, setBottomMargin] = useState(85);
  const [loading, setLoading] = useState(true);
  const [chat, setChat] = useState<Array<Message>>();
  const [boxHeight, setBoxHeight] = useState(40)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setBottomMargin(15);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setBottomMargin(85);
      }
    );

    return () => {
      keyboardDidHideListener;
      keyboardDidShowListener;
    };
  }, []);

  const sendMessage = () => {
    socket?.emit("chat:send_message", { to: "Global", message: message });
    setMessage("");
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      socket?.emit("chat:get_messages", { to: "Global" });
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    socket?.on("chat:get_messages.response", (arr) => {
      let messages: Message[] = [];
      arr.forEach((elem: any) => {
        const msg: Message = {
          id: elem._id,
          from: elem.from,
          to: elem.to,
          message: elem.message,
          time: new Date(Number(elem.time)),
        };
        messages.push(msg);
      });
      setChat(messages);
      setLoading(false);
    });

    socket?.on("chat:message", (msg) => {
      const message: Message = {
        id: msg._id,
        from: msg.from,
        to: msg.to,
        message: msg.message,
        time: new Date(Number(msg.time)),
      };
      setChat(chat=>[...chat!, message])
    });
  }, [socket]);

  
  const flatlistRef = useRef<FlatList<any>>(null);

  if (loading) {
    return <Loading />;
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <FlatList
        style={{ marginTop: 10 }}
        data={chat}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) =>
          item.from == id ? (
            <MyMessageItem id={item.id} text={item.message} time={item.time} />
          ) : (
            <MessageItem
              id={item.id}
              from={item.from}
              text={item.message}
              time={item.time}
            />
          )
        }
        ref={flatlistRef}
        onContentSizeChange={()=>{
          flatlistRef.current?.scrollToEnd({animated: true})
        }}
      ></FlatList>
      <View style={{ ...styles.sendBox, marginBottom: bottomMargin, height: boxHeight }}>
        <View style={styles.inputMessageBox}>
          <TextInput
            style={styles.messageText}
            onChangeText={setMessage}
            value={message}
            placeholder="Enter message"
            placeholderTextColor={MyColors.text}
            autoCapitalize='sentences'
            autoCorrect={false}
            multiline={true}
            onContentSizeChange={(e)=>{
              setBoxHeight(e.nativeEvent.contentSize.height+20)
            }}
          ></TextInput>
        </View>
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={{ margin: 8 }}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MyColors.background,
  },
  sendBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxHeight: 80
  },
  sendButton: {
    marginRight: 10,
    backgroundColor: MyColors.primary,
    borderRadius: 8,
  },
  inputMessageBox: {
    marginHorizontal: 10,
    flex: 1,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
  },
  messageText: {
    flex: 1,
    color: "white",
    margin: 5,
  },
});

export default ChatScreen;
