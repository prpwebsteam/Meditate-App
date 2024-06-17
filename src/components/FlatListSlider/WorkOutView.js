import React, { useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { HomeStyle } from '../../styles';
import { Spacing } from '../../components';
import { SH } from '../../utils';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";

const HomeScreen = (props) => {
  const { Colors } = useTheme();
  const HomeStyles = useMemo(() => HomeStyle(Colors), [Colors]);
  const { onPress, item } = props;
  const { t } = useTranslation();

  useEffect(()=>{
    console.log("item:--------",item)
  }, [item])
  return (
    <TouchableOpacity onPress={() => onPress()} style={HomeStyles.RecentAllViewBox}>
      <View style={HomeStyles.viewImageBox}>
        <Image source={item.image} resizeMode='cover' style={HomeStyles.setbgimage} />
        <Spacing space={SH(20)} />
        <Text style={[HomeStyles.ImageTitleDaySize]}>{t(item.title)}</Text>
        <Text style={HomeStyles.ImageTitle}>{t(item.titletext)}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default HomeScreen;
