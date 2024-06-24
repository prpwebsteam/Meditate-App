import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { HomeStyle } from '../../styles';
import { Spacing } from '../../components';
import { SH } from '../../utils';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";

const videoListView = (props) => {
  const { Colors } = useTheme();
  const HomeStyles = useMemo(() => HomeStyle(Colors), [Colors]);
  const { onPress, item,index } = props;
  const { t } = useTranslation();
  return (
    <TouchableOpacity onPress={() => onPress()} style={[HomeStyles.RecentAllViewBoxYoga, (index == 1 || index == 3 || index == 5) ? HomeStyles.RecentAllViewBoxYogaBoxTopSpace : HomeStyles.RecentAllViewBoxYogaBoxBottomSpace]}>
    <View style={HomeStyles.viewImageBoxYoga}>
      <Spacing space={SH(50)} />
      <View>
        <Image source={item.image} resizeMode='contain' style={HomeStyles.setbgimageYoga} />
      </View>
      <View>
        <Spacing space={SH(30)} />
        <Text style={[HomeStyles.ImageTitleDaySizeYoga]}>{t(item.title)}</Text>
      </View>
    </View>
  </TouchableOpacity>
  );
};
export default videoListView;
