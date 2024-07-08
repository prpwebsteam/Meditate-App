import React, { useEffect, useMemo } from 'react';
import { View, StatusBar, StyleSheet, Text, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import Styles from '../../styles/SplashScreenStyle/SplashScreenStyle';
import images from '../../index';
import RouteName from '../../routes/RouteName';
import { Colors, Fonts } from '../../utils';
import { Container } from '../../components';
import { GetstartedSliderStyle } from '../../styles/GetstartedSliderscreen';

const SplashScreen = () => {
  const GetstartedSliderStyles = useMemo(() => GetstartedSliderStyle(Colors), [Colors]);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <FastImage 
        source={images.screenbg} 
        style={styles.background} 
        resizeMode={FastImage.resizeMode.cover}
      >
        <View style={styles.overlay}>
          <Image source={images.slide1} style={styles.logo} resizeMode="contain" />
          <View>
            <Text style={styles.text}>Meditate With Music</Text>
            <Text style={styles.text2}>Explore Calming Music For Your Yoga Journey</Text>
          </View>
        </View>
      </FastImage>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  text: {
    fontSize: 28,
    color: Colors.off_white,
    textAlign: 'center',
    fontWeight: 'semibold',
    fontFamily: Fonts.Poppins_Medium,
  },
  text2: {
    fontSize: 12,
    color: Colors.off_white,
    textAlign: 'center',
    fontFamily: Fonts.Poppins_Medium,
  },
});

export default SplashScreen;