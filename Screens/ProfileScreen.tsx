import { FC, useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import MyColors from "../themes/myTheme";
import { ListItem } from "../components/MyPostComponent";
import { useAuth } from "../Contexts/AuthContext";
import UserModel, { User } from "../Model/UserModel";
import PostModel, { Post } from "../Model/PostModel";
import { Loading } from "../components/Loading";

const footerComponent = () => {
  return <View style={{ height: 80 }} />;
};

const ProfileScreen: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const auth = useAuth();
  const userId: any = auth.authData?.id;

  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [avatarUri, setAvatarUri] = useState("");
  const [posts, setPosts] = useState<Array<Post>>();
  const [refreshing, setRefreshing] = useState(true);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    let userPosts: Post[] = [];
    try {
      userPosts = await PostModel.getPostsBySender(
        userId,
        auth.authData?.accessToken
      );
    } catch (err) {
      console.log("Failed loading posts " + err);
    }
    setPosts(userPosts);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      let user: User;
      try {
        user = await UserModel.getUser(userId, auth.authData?.accessToken);
      } catch (err) {
        console.log("Failed getting user" + err);
      }
      setEmail(user!.email);
      setName(user!.name);
      setUsername(user!.username);
      setAvatarUri(user!.avatar);
      setLoading(false);
      onRefresh();
    });
    return unsubscribe;
  });

  const onDeletePost = (id: String) => {
    if (id != "") {
      onRefresh();
    } else {
      console.log("Post doesn't exist");
    }
  };

  const onEditPost = async (id: String) => {
    navigation.navigate("Edit Post", { postId: id });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 2,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: avatarUri }}
          style={{ height: 80, width: 80, borderRadius: 40, margin: 20 }}
        />
        <View>
          <Text style={styles.bioText}>{username}</Text>
          <Text style={styles.bioText}>{name}</Text>
          <Text style={[{ marginBottom: 10 }, { ...styles.bioText }]}>
            {email}
          </Text>
        </View>
      </View>
      {posts != undefined && posts.length > 0 ? (
        <FlatList
          data={posts}
          keyExtractor={(post) => post.id.toString()}
          ListFooterComponent={footerComponent}
          renderItem={({ item }) => (
            <ListItem
              id={item.id}
              image={item.image}
              text={item.message}
              onDeletePost={onDeletePost}
              onEditPost={onEditPost}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        ></FlatList>
      ) : (
        <Text
          style={{
            alignSelf: "center",
            fontWeight: "bold",
            fontSize: 28,
            color: MyColors.text,
            marginTop: 15,
          }}
        >
          No Posts
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MyColors.background,
  },
  bioText: {
    marginLeft: 10,
    color: MyColors.text,
  },
});

export default ProfileScreen;
