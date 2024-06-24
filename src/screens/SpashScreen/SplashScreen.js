import React, { useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import Styles from '../../styles/SplashScreenStyle/SplashScreenStyle';
import images from '../../index';
import RouteName from '../../routes/RouteName';
import { Colors } from '../../utils';
import { Container, LottieIcon } from '../../components';

StatusBar.setBackgroundColor(Colors.theme_backgound);
const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace(RouteName.GET_STARTED_SLIDER_SCREEN)
        }, 2100);
    }, []);
    return (
        <Container>
            <View style={Styles.setbgimage}>
                <LottieIcon
                    style={Styles.iconStyle}
                    source={images.splashScreenIcon}
                />
            </View>
        </Container>
    );
};
export default SplashScreen;
