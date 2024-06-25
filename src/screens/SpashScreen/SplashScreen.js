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
            navigation.replace(RouteName.GET_STARTED_SLIDER_SCREEN)
        }, 2100);
    }, []);
    return (
        <Container>
            <ImageBackground source={images.background1} resizeMode='cover' style={{
                flex: 1,
                width: '100%',
                height: '100%',
            }}>
                <View style={{ 
            ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.7)', }} />
                <View style={Styles.setbgimage}>
                    <Image
                        source={images.slide1}
                        style={[GetstartedSliderStyles.imagesetus, GetstartedSliderStyles.imageSlide1]}
                        resizeMode='contain'
                    />
                </View>
            </ImageBackground>
        </Container>
    );
};
export default SplashScreen;
