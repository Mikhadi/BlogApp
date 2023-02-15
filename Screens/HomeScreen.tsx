import { FC } from "react";
import { View, Text, StyleSheet, StatusBar, FlatList } from "react-native";
import MyColors from "../themes/myTheme";

import { ListItem } from "../components/PostComponent";

type Post = {
  name: String;
  id: String;
  image: any;
  avatar: any;
  text: String;
};

const posts: Array<Post> = [
  {
    name: "Misha",
    id: "1",
    image: require("../assets/postImage.jpg"),
    avatar: require("../assets/avatar.png"),
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    name: "Vasya",
    id: "2",
    image: require("../assets/postImage.jpg"),
    avatar: require("../assets/avatar.png"),
    text: "String",
  },
  {
    name: "Misha",
    id: "3",
    image: require("../assets/postImage.jpg"),
    avatar: require("../assets/avatar.png"),
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    name: "Vasya",
    id: "4",
    image: require("../assets/postImage.jpg"),
    avatar: require("../assets/avatar.png"),
    text: "String",
  },
  {
    name: "Misha",
    id: "5",
    image: require("../assets/postImage.jpg"),
    avatar: require("../assets/avatar.png"),
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    name: "Vasya",
    id: "6",
    image: require("../assets/postImage.jpg"),
    avatar: require("../assets/avatar.png"),
    text: "String",
  },
  {
    name: "Misha",
    id: "7",
    image: require("../assets/postImage.jpg"),
    avatar: require("../assets/avatar.png"),
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    name: "Vasya",
    id: "8",
    image: require("../assets/postImage.jpg"),
    avatar: require("../assets/avatar.png"),
    text: "String",
  },
  {
    name: "Misha",
    id: "9",
    image: require("../assets/postImage.jpg"),
    avatar: require("../assets/avatar.png"),
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    name: "Vasya",
    id: "10",
    image: require("../assets/postImage.jpg"),
    avatar: require("../assets/avatar.png"),
    text: "String",
  },
];

const footerComponent = () => {
  return(
    <View style={{height: 80}}/>
  )
}

const HomeScreen: FC = () => {

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(post) => post.id.toString()}
        ListFooterComponent={footerComponent}
        renderItem={({ item }) => (
          <ListItem
            name={item.name}
            id={item.id}
            image={item.image}
            avatar={item.avatar}
            text={item.text}
          />
        )}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MyColors.background,
  },
});

export default HomeScreen;
