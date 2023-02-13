import { FC, useState } from "react";
import { View, Text, StyleSheet, StatusBar, FlatList, TextInput, TouchableOpacity } from "react-native";

import MyColors from "../themes/myTheme";
import { MessageItem } from "./MessageComponent";
import { MyMessageItem } from "./MyMessageComponent";

type Message = {
  id: String;
  avatar: any;
  text: String;
  time: String;
};

const posts: Array<Message> = [
  {
    id: "1",
    avatar: require("../assets/avatar.png"),
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    time: "12:01"
  },
  {
    id: "2",
    avatar: require("../assets/avatar.png"),
    text: "String",
    time: "12:20"
  },
];

const footerComponent = () => {
  return(
    <View style={{height: 80}}/>
  )
}

const ChatScreen: FC = () => {
  const [message, setMessage] = useState("")
    return (
      <View style={styles.container}>
      <FlatList
        style={{marginTop: 10}}
        data={posts}
        keyExtractor={(post) => post.id.toString()}
        ListFooterComponent={footerComponent}
        renderItem={({ item }) => (
          item.id=="2" ? (
          <MyMessageItem
            id={item.id}
            text={item.text}
            time={item.time}
          />):(<MessageItem
            id={item.id}
            avatar={item.avatar}
            text={item.text}
            time={item.time}
          />)
        )}
        snapToOffsets={[40]}
      ></FlatList>
      <View style={styles.sendBox}>
        <View style={styles.inputMessageBox}>
        <TextInput
          style={styles.messageText}
          onChangeText={setMessage}
          value={message}
          placeholder="Enter message"
          placeholderTextColor={MyColors.text}
          autoCapitalize="none"
          autoCorrect={false}
        >
        </TextInput>
        </View>
        <TouchableOpacity style={styles.sendButton}>
          <Text style={{margin: 8}}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
    );
  };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: MyColors.background
    },
    sendBox: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      position: 'absolute',
      bottom: 82,
      alignItems: 'center',
    },
    sendButton:{
      marginRight: 10,
      backgroundColor: MyColors.primary,
      borderRadius: 8,
    },
    inputMessageBox: {
      marginHorizontal: 10,
      flex: 1,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: 'white',
    },
    messageText: {
      flex: 1,
      color: 'white',
      margin: 5,
    }
});

export default ChatScreen