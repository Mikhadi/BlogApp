import { FC, useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, StatusBar, FlatList, RefreshControl } from "react-native";
import MyColors from "../themes/myTheme";

import { ListItem } from "../components/PostComponent";
import PostModel, { Post } from "../Model/PostModel";
import { useAuth } from "../Contexts/AuthContext";

const footerComponent = () => {
  return(
    <View style={{height: 80}}/>
  )
}

const HomeScreen: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const auth = useAuth()

  const [posts, setPosts] = useState<Array<Post>>();
  const [refreshing, setRefreshing] = useState(true);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    let userPosts: Post[] = [];
    try {
      userPosts = await PostModel.getAllPosts(
        auth.authData?.accessToken
      );
    } catch (err) {
      console.log("Failed loading posts " + err);
    }
    setPosts(userPosts);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      onRefresh();
    });
    return unsubscribe;
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(post) => post.id.toString()}
        ListFooterComponent={footerComponent}
        renderItem={({ item }) => (
          <ListItem
            id={item.id}
            image={item.image}
            text={item.message}
            sender={item.sender}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
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
