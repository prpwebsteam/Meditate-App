import React, { useEffect, useMemo } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import Styles from '../../styles/SplashScreenStyle/SplashScreenStyle';
import images from '../../index';
import RouteName from '../../routes/RouteName';
import { Colors } from '../../utils';
import { Container } from '../../components';
import { GetstartedSliderStyle } from '../../styles/GetstartedSliderscreen';

StatusBar.setBackgroundColor(Colors.theme_backgound);
const SplashScreen = () => {
  const GetstartedSliderStyles = useMemo(() => GetstartedSliderStyle(Colors), [Colors]);

  return (
    <Container>
      <FastImage 
        source={images.screenbg} 
        style={styles.background} 
        resizeMode={FastImage.resizeMode.cover}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  }
});

export default SplashScreen;
