import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Image, StatusBar } from 'react-native';
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
            <View style={Styles.setbgimage}>
                <Image
                    source={images.splashScreenIcon}
                    style={[GetstartedSliderStyles.imagesetus, GetstartedSliderStyles.imageSlide1]}
                    resizeMode='contain'
                />
            </View>
        </Container>
    );
};
export default SplashScreen;
