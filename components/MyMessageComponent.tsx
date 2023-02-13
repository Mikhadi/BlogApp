import {FC} from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import MyColors from '../themes/myTheme';

export const MyMessageItem: FC<{id: String; text: String, time: String }> = ({
  id,
  text,
  time
}) => {
  return (
    <View style={styles.container}>
        <View style={styles.messageBox}>
            <Text style={styles.text}>
                {text}
            </Text>
            <Text style={styles.time}>
                {time}
            </Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row-reverse',
        marginBottom: 10,
    },
    title: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    }, 
    avatar: {
        margin: 8,
        width: 30,
        height: 30, 
        borderRadius: 15,
    },
    time: {
        color: MyColors.gray,
        position: 'absolute',
        bottom: 1,
        right: 10,
        fontSize: 10,
    },
    messageBox:{
        width: '70%',
        borderRadius: 15,
        backgroundColor: 'rgba(172, 91, 253, 1)'
    },
    text:{
        margin: 10,
        color: MyColors.text,
        marginBottom: 8,
    }
})
