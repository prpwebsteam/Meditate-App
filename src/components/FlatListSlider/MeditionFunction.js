import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { HomeStyle } from '../../styles';
import { Spacing } from '../../components';
import { SH } from '../../utils';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";

const MeditionFunction = (props) => {
  const { Colors } = useTheme();
  const HomeStyles = useMemo(() => HomeStyle(Colors), [Colors]);
  const { onPress, item, index } = props;
  const { t } = useTranslation();

  return (
    <TouchableOpacity onPress={() => onPress()} style={[HomeStyles.RecentAllViewBoxMeditation]}>
      <View style={HomeStyles.viewImageBoxMeditation}>

        <Image source={item.image} resizeMode='contain' style={HomeStyles.setbgimageMeditation} />
        <View style={HomeStyles.viewImageBoxTextMeditation}>

          <Text style={[HomeStyles.ImageTitleDaySizeMeditationTime]}>{t(item?.time)}</Text>
          <Spacing space={SH(10)} />

          <Text style={[HomeStyles.ImageTitleDaySizeMeditation]}>{t(item.title)}</Text>
          <Spacing space={SH(10)} />

          <Text style={[HomeStyles.ImageDescriptionMeditation]}>{t(item.titletext)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default MeditionFunction;
