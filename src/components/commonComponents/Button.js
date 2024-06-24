import React, { useMemo } from 'react';
import { TouchableOpacity, StyleSheet, Text, Image, View } from 'react-native';
import PropTypes from 'prop-types';
import { SH, SF, SW, Fonts } from '../../utils';
import { useTheme } from '@react-navigation/native';
import LottieIcon from './LottieIcon';
import images from '../../index';

function Button(props) {
  const { title, onPress, buttonStyle, disable, buttonTextStyle, size, iconname, imagesource, iconnametwo, spacedImages,nextArraow,LeftArraow } = props;
  const { Colors } = useTheme();
  const styles = useMemo(() =>
    StyleSheet.create({
      buttonStyle: {
        backgroundColor: Colors.theme_backgound_second,
        alignItems: 'center',
        borderRadius: SW(10),
        justifyContent: 'center',
        width: '100%',
        height: SH(45),
      },
      buttonTextStyle: {
        color: Colors.white,
        fontSize: SF(20),
        fontFamily:Fonts.RobotoCondensed_Regular
      },
      buttonViewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: nextArraow ? 'flex-end' : spacedImages ? 'space-around' : 'center',
        width: '100%',
        
      },

      iconstyle: {
        position: 'relative',
        left: 5,
      },
      iconstyle: {
        position: 'relative',
        left: 5,
        top: 6,
      },
      iconstyletwo: {
        position: 'relative',
        left: 5,
      },
      nextArraowStyle:{
        width:SW(60),
      },
      leftArraowStyle:{
        width:SW(80),
      }
    }),
    [disable, spacedImages, Colors],
  );
  return (
    <TouchableOpacity
      disabled={disable}
      style={[styles.buttonStyle, { ...buttonStyle }]}
      onPress={() => onPress()}>
      <View style={styles.buttonViewStyle}>
      {LeftArraow &&
         <LottieIcon
          style={styles.leftArraowStyle}
          source={images.leftArrowIcon}
          />
        }
        {imagesource ? <Image source={imagesource} style={styles.leftImageStyle} resizeMode='cover' /> : null}
        <Text style={[styles.buttonTextStyle, { ...buttonTextStyle }]}>{title}</Text>
        {nextArraow &&
         <LottieIcon
          style={styles.nextArraowStyle}
          source={images.rightArrowIcon}
          />
        }
        {imagesource ? <View /> : null}
      </View>
    </TouchableOpacity>
  );
}

Button.defaultProps = {
  title: '',
  onPress: () => { },
  buttonStyle: {},
  disable: false,
  imagesource: null,
  buttonTextStyle: {},
  spacedImages: false,
  nextArraow:false,
  LeftArraow:false
};

Button.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  buttonStyle: PropTypes.shape({}),
  disable: PropTypes.bool,
  imagesource: PropTypes.any,
  buttonTextStyle: PropTypes.shape({}),
  spacedImages: PropTypes.bool,
  nextArraow:PropTypes.bool,
  LeftArraow:PropTypes.bool,
};

export default Button;
