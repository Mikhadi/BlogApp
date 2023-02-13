import {FC} from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import MyColors from '../themes/myTheme';

export const ListItem: FC<{ name: String; id: String; image: any, avatar: any, text: String }> = ({
  name,
  id,
  image,
  avatar,
  text
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Image source={avatar} style={styles.avatar}/>
        <Text style={styles.name}>{name}</Text>
      </View>
      <Image source={image} style={styles.image}/>
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
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    }, 
    avatar: {
        marginLeft: 8,
        width: 30,
        height: 30
    },
    name: {
        marginLeft: 10,
        color: MyColors.text,
    },
    image:{
        margin: 10,
        width: '95%',
        borderRadius: 3,
    },
    text:{
        marginLeft: 10,
        color: MyColors.text,
        marginBottom: 8,
    }
})
