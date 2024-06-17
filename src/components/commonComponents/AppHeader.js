import React, { useMemo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import propTypes from 'prop-types';
import { SF, SH, SW, Fonts } from '../../utils';
import { useTheme } from '@react-navigation/native';
import images from '../../index';
import { GetstartedSliderStyle } from '../../styles/GetstartedSliderscreen';

function AppHeader({ navigation, headerStyle, leftImage, title, rightImage, onLeftPress, onRightPress, titleStyle, LeftComponent = null, headerTitle }) {
    const { Colors } = useTheme();
    const GetstartedSliderStyles = useMemo(() => GetstartedSliderStyle(Colors), [Colors]);

    const styles = useMemo(
        () =>
            StyleSheet.create({
                container: {
                    flexDirection: 'row',
                    paddingVertical: SH(10),
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: Colors.theme_backgound_second,
                    ...headerStyle
                },
                leftView: {
                    width: '15%',
                    justifyContent: 'center',
                    alignItems: 'flex-start'
                },
                leftImageStyle: {
                    height: SH(18),
                    width: SW(18),
                    resizeMode: 'contain'
                },
                titleStyle: {
                    fontSize: SF(18),
                    fontWeight: '400',
                    color: Colors.theme_dark_gray,
                    ...titleStyle
                },
                rightView: {
                    width: '15%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                rightImageStyle: {
                    resizeMode: 'contain',
                    marginLeft: 5
                },
                rightImageStyle2: {
                    resizeMode: 'contain',
                    marginLeft: 5,
                    marginTop: 5,
                    height: 30,
                    width: 20,
                },
                headerTitle: {
                    color: Colors.white,
                    fontSize: SF(22),
                    alignSelf: 'flex-start',
                    fontFamily: Fonts.RobotoCondensed_Bold
                },
                centerView: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                centerImageStyle: {
                    width: 250,
                    height: 30,
                    resizeMode: 'contain'
                }
            }),
        [headerStyle, Colors, titleStyle],
    );

    return (
        <View style={styles.container}>
            <View style={styles.leftView}>
                {leftImage &&
                    <TouchableOpacity disabled={!leftImage} onPress={() => onLeftPress()}>
                        <Image style={styles.leftImageStyle} source={leftImage} />
                    </TouchableOpacity>
                }
            </View>
            <View style={styles.centerView}>
                <Image
                    source={images.logo}
                    style={styles.centerImageStyle}
                />
            </View>
            <View style={styles.rightView}>
                {rightImage &&
                    <TouchableOpacity onPress={() => onRightPress()}>
                        <Image source={rightImage} style={styles.rightImageStyle} />
                    </TouchableOpacity>
                }
            </View>
            <View style={styles.rightView}>
                <TouchableOpacity onPress={() => onRightPress()}>
                    <Image source={images.wishlist} style={styles.rightImageStyle2} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

AppHeader.defaultProps = {
    headerStyle: {},
    leftImage: null,
    LeftComponent: null,
    title: '',
    rightImage: null,
    onLeftPress: () => { },
    headerTitle: ''
};

AppHeader.propTypes = {
    headerStyle: propTypes.shape({}),
    leftImage: propTypes.any,
    LeftComponent: propTypes.any,
    title: propTypes.string,
    rightImage: propTypes.any,
    onLeftPress: propTypes.func,
    headerTitle: propTypes.string
};

export default AppHeader;