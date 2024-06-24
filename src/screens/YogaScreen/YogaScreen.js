import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { HomeStyle } from '../../styles';
import { Container, Spacing, BottomTabMenu, VideoListView } from '../../components';
import { RouteName } from '../../routes';
import { SH, BeginersData, SkillsData, MasterData } from '../../utils';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";

const YogaScreen = (props) => {
  const { Colors } = useTheme();
  const HomeStyles = useMemo(() => HomeStyle(Colors), [Colors]);
  const { navigation } = props;
  const { t } = useTranslation();
  const [tabIndex, setTabIndex] = useState(1);
  const onpressHandle = () => {
    navigation.navigate(RouteName.WORKOUT_DETAIL_SCREEN)
  }

  return (
    <Container>
      <BottomTabMenu {...props} selected={1} />
      <Spacing space={SH(20)} />
      <View style={HomeStyles.VideoTab}>
        <TouchableOpacity onPress={() => setTabIndex(1)}>
          <Text style={[HomeStyles.VideoTabText, tabIndex == 1 && HomeStyles.activeBorder]}>{t("Yoga_4")}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTabIndex(2)}>
          <Text style={[HomeStyles.VideoTabText, tabIndex == 2 && HomeStyles.activeBorder]}>{t("Yoga_5")}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTabIndex(3)}>
          <Text style={[HomeStyles.VideoTabText, tabIndex == 3 && HomeStyles.activeBorder]}>{t("Yoga_6")}</Text>
        </TouchableOpacity>
      </View>
      <Spacing space={SH(20)} />
      <ScrollView>
        <View style={HomeStyles.textcenterview}>
          <View>
            <FlatList
              data={tabIndex == 1 ? BeginersData : tabIndex == 2 ? SkillsData : MasterData}
              renderItem={({ item, index }) => (<VideoListView onPress={() => onpressHandle(index)}
                item={item}
                index={index}
              />)}
              keyExtractor={(item, index) => index.toString()}
              horizontal={false}
              numColumns={2}
            />
          </View>
        </View>
      </ScrollView>
      <Spacing space={SH(80)} />
    </Container>
  );
};
export default YogaScreen;
