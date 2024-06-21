import React, { useState, useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground, FlatList, ScrollView, StyleSheet } from 'react-native';
import { HomeStyle } from '../../styles';
import { Container, Spacing, BottomTabMenu, VideoListView } from '../../components';
import { RouteName } from '../../routes';
import { SH, BeginersData, SkillsData, MasterData } from '../../utils';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";
import images from '../../index';

const ScanScreen = (props) => {
  const { Colors } = useTheme();
  const HomeStyles = useMemo(() => HomeStyle(Colors), [Colors]);
  const { navigation } = props;
  const { t } = useTranslation();
  const [tabIndex, setTabIndex] = useState(1);
  const onpressHandle = () => {
    navigation.navigate(RouteName.WORKOUT_DETAIL_SCREEN)
  }

  const styles = useMemo(() =>
    StyleSheet.create({
      backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
      },
      overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      },
    }), [Colors]);

  return (
    <Container>
      <ImageBackground source={images.background1} style={styles.backgroundImage}>
        <View style={styles.overlay} />
        <BottomTabMenu {...props} selected={2} />
      </ImageBackground>
    </Container>
  );
};
export default ScanScreen;
