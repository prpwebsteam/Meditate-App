import React, { useState, useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { HomeStyle } from '../../styles';
import { Container, Spacing, BottomTabMenu, LottieIcon, MeditionFunction } from '../../components';
import images from '../../index';
import { RouteName } from '../../routes';
import { SH, Meditiondata } from '../../utils';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";

const MeditationScreen = (props) => {
  const { Colors } = useTheme();
  const { t } = useTranslation();
  const HomeStyles = useMemo(() => HomeStyle(Colors), [Colors]);
  const { navigation } = props;
  const [tabIndex, setTabIndex] = useState(1);
  const onpressHandle = () => {
    navigation.navigate(RouteName.WORKOUT_DETAIL_SCREEN)
  }

  return (
    <Container>
      <BottomTabMenu {...props} selected={2} />
      <Spacing space={SH(20)} />
      <View style={HomeStyles.meditationImageView}>
        <LottieIcon source={images.meditationbg} style={HomeStyles.meditationImageicon} />
      </View>
      <View style={HomeStyles.VideoTab}>
        <TouchableOpacity onPress={() => setTabIndex(1)}>
          <Text style={[HomeStyles.VideoTabText, tabIndex == 1 && HomeStyles.activeBorder]}>{t("Yoga_4")}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTabIndex(2)}>
          <Text style={[HomeStyles.VideoTabText, tabIndex == 2 && HomeStyles.activeBorder]}>{t("Skills_Text")}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTabIndex(3)}>
          <Text style={[HomeStyles.VideoTabText, tabIndex == 3 && HomeStyles.activeBorder]}>{t("Master_Text")}</Text>
        </TouchableOpacity>
      </View>
      <Spacing space={SH(20)} />
      <ScrollView>
        <View style={HomeStyles.textcenterview}>
          <View>
            <FlatList
              data={Meditiondata}
              renderItem={({ item, index }) => (<MeditionFunction onPress={() => onpressHandle(index)}
                item={item}
                index={index}
              />)}
              keyExtractor={(item, index) => index.toString()}
              horizontal={false}
            />
          </View>
        </View>
      </ScrollView>
      <Spacing space={SH(80)} />
    </Container>
  );
};
export default MeditationScreen;
