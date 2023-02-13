import { Ionicons } from '@expo/vector-icons';
import {FC} from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import MyColors from '../themes/myTheme';

export const ListItem: FC<{ name: String; id: String; image: any, avatar: any, text: String }> = ({
  id,
  image,
  text
}) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image}/>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.buttonsView}>
        <TouchableOpacity style={styles.button}>
            <Ionicons name={'pencil'} color={MyColors.text} size={20}/>
            <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
            <Ionicons name={'trash'} color={MyColors.text} size={20}/>
            <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        borderBottomWidth: 2,
        borderBottomColor: 'black'
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
    },
    buttonsView:{
        flexDirection: 'row-reverse',
    },
    button:{
        backgroundColor: MyColors.primary,
        marginRight: 20,
        marginBottom: 10,
        borderRadius: 4,
        width: 100,
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center'

    },
    buttonText:{
        color: 'white',
        margin: 7,
    }
})
