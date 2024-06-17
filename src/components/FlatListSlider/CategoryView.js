import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { HomeStyle } from '../../styles';
import { Spacing } from '../../components';
import { SH } from '../../utils';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";

const CategoryView = (props) => {
  const { Colors } = useTheme();
  const HomeStyles = useMemo(() => HomeStyle(Colors), [Colors]);
  const { onPress, item, index } = props;
  const { t } = useTranslation();

  return (
    <TouchableOpacity onPress={() => onPress()} style={[HomeStyles.RecentAllViewBoxCategory]}>
      <View style={HomeStyles.viewImageBoxCategory}>
        <Spacing space={SH(20)} />
        <View style={HomeStyles.viewImageBoxBgCategory}>
          <Image source={item.image} resizeMode='contain' style={HomeStyles.setbgimageCategory} />
        </View>
        <View>
          <Spacing space={SH(30)} />
          <Text style={[HomeStyles.ImageTitleDaySizeCategory]}>{t(item.title)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default CategoryView;
