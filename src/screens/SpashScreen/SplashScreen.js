import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Image, StatusBar, StyleSheet, ImageBackground } from 'react-native';
import Styles from '../../styles/SplashScreenStyle/SplashScreenStyle';
import images from '../../index';
import RouteName from '../../routes/RouteName';
import { Colors } from '../../utils';
import { Container } from '../../components';
import { GetstartedSliderStyle } from '../../styles/GetstartedSliderscreen';

StatusBar.setBackgroundColor(Colors.theme_backgound);
const SplashScreen = ({ navigation }) => {
    const GetstartedSliderStyles = useMemo(() => GetstartedSliderStyle(Colors), [Colors]);
    useEffect(() => {
        setTimeout(() => {
            navigation.replace(RouteName.SIGNUP_SCREEN)
        }, 2000);
    }, []);
    return (
        <Container>
            <ImageBackground source={images.screenbg} resizeMode='cover' style={{
                flex: 1,
                width: '100%',
                height: '100%',
            }}>
            </ImageBackground>
        </Container>
    );
};
export default SplashScreen;
