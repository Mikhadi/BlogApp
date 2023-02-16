import {View, ActivityIndicator} from 'react-native';
import MyColors from '../themes/myTheme';

export const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: MyColors.background
      }}>
      <ActivityIndicator color={MyColors.primary} animating={true} size="large" />
    </View>
  );
};
