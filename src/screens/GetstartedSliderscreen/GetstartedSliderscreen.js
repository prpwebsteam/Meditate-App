import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions, Image, TouchableOpacity, TextInput, FlatList, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import AppIntroSlider from 'react-native-app-intro-slider';
import { GetstartedSliderStyle } from '../../styles/GetstartedSliderscreen';
import images from '../../index';
import { Spacing } from '../../components';
import { RouteName } from '../../routes';
import { useTheme } from '@react-navigation/native';
import { Colors, SH, SlideGetData } from '../../utils';
import { useTranslation } from "react-i18next";
import CustomCheckbox from '../../components/CustomCheckbox';
import Dots from 'react-native-dots-pagination';

const GetstartedSliderscreen = ({ navigation }) => {
  const { Colors } = useTheme();
  const GetstartedSliderStyles = useMemo(() => GetstartedSliderStyle(Colors), [Colors]);
  const { t } = useTranslation();
  const sliderRef = useRef(null);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };


  const handleContinuePress = (index) => {
    const nextIndex = index + 1;
    if (nextIndex < slides.length) {
      sliderRef.current.goToSlide(nextIndex, true);
    } else {
      navigation.navigate(RouteName.LOGIN_SCREEN, { selectedOptions });
    }
  };

  const slides = [
    {
      key: 1,
      text: 'Welcome to our App',
      boldText: 'Get ready to explore!',
      backgroundImage: images.background1,
    },
    {
      key: 2,
      text: 'Discover Features',
      boldText: 'Experience the best we have to offer',
      backgroundImage: images.background2,
    },
    {
      key: 3,
      text: 'Your Preferences',
      boldText: 'Select your interests',
      backgroundImage: images.background3,
    },
  ];

  const RenderItem = ({ item, index }) => (
    <ImageBackground source={item.backgroundImage} style={styles.backgroundImage}>
      <View style={styles.overlay} />
      <View style={styles.slideContainer}>
        <View style={[GetstartedSliderStyles.minstyleviewphotograpgy, { backgroundColor: Colors.transpharent }]}>
          <View style={GetstartedSliderStyles.mainInnerView}>
            <View style={GetstartedSliderStyles.smallimagcenter}>
              <Image
                source={images.slide1}
                style={[GetstartedSliderStyles.imagesetus, GetstartedSliderStyles.imageSlide1]}
                resizeMode='contain'
              />
            </View>
            <View style={GetstartedSliderStyles.textcenterview}>
              <Text style={[GetstartedSliderStyles.sliderText1, GetstartedSliderStyles.sliderTextBold, styles.reducedTextSize, { fontWeight: 'bold', fontSize: 16 }]}>
                {t(item.text)}
              </Text>

              {item.key === 3 ? (
                <View style={styles.checkboxContainer}>
                  <View style={styles.checkbox}>
                    <View style={styles.iconContainer}>
                      <Icon name="lightbulb" type="material-community" color="#794619" />
                    </View>
                    <Text style={[styles.checkboxLabel, { fontSize: 12 }]}>FOCUS AND PRODUCTIVITY</Text>
                    {/* <CustomCheckbox
                      isChecked={selectedOptions.includes('Focus and Productivity')}
                      onPress={() => handleCheckboxChange('Focus and Productivity')}
                    /> */}
                  </View>
                  <View style={styles.checkbox}>
                    <View style={styles.iconContainer}>
                      <Icon name="bed" type="material-community" color="#794619" />
                    </View>
                    <Text style={[styles.checkboxLabel, { fontSize: 12 }]}>QUALITY OF SLEEP</Text>
                    {/* <CustomCheckbox
                      isChecked={selectedOptions.includes('Quality of Sleep')}
                      onPress={() => handleCheckboxChange('Quality of Sleep')}
                    /> */}
                  </View>
                  <View style={styles.checkbox}>
                    <View style={styles.iconContainer}>
                      <Icon name="spa" type="material-community" color="#794619" />
                    </View>
                    <Text style={[styles.checkboxLabel, { fontSize: 12 }]}>RELIEVE STRESS</Text>
                    {/* <CustomCheckbox
                      isChecked={selectedOptions.includes('Relieve Stress')}
                      onPress={() => handleCheckboxChange('Relieve Stress')}
                    /> */}
                  </View>
                  <View style={styles.checkbox}>
                    <View style={styles.iconContainer}>
                      <Icon name="flower" type="material-community" color="#794619" />
                    </View>
                    <Text style={[styles.checkboxLabel, { fontSize: 12 }]}>GROW PERSONALLY</Text>
                    {/* <CustomCheckbox
                      isChecked={selectedOptions.includes('Grow Personally')}
                      onPress={() => handleCheckboxChange('Grow Personally')}
                    /> */}
                  </View>
                  <View style={styles.checkbox}>
                    <View style={styles.iconContainer}>
                      <Icon name="heart" type="material-community" color="#794619" />
                    </View>
                    <Text style={[styles.checkboxLabel, { fontSize: 12 }]}>STRENGTHEN VITALITY</Text>
                    {/* <CustomCheckbox
                      isChecked={selectedOptions.includes('Strengthen Vitality')}
                      onPress={() => handleCheckboxChange('Strengthen Vitality')}
                    /> */}
                  </View>
                </View>
              ) : (
                <Text style={[GetstartedSliderStyles.sliderText, styles.reducedTextSize]}>
                  {t(item.boldText)}
                </Text>
              )}
            </View>
            <Spacing space={item.key === 1 ? SH(30) : SH(0)} />
          </View>
        </View>
        <View style={styles.continueButtonContainer}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => handleContinuePress(index)}
          >
            <Text style={styles.continueButtonText}>{t("CONTINUE")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );

  return (
    <AppIntroSlider
      ref={sliderRef}
      data={slides}
      renderItem={RenderItem}
      showNextButton={false}
      showSkipButton={false}
      showDoneButton={false}
      activeDotStyle={GetstartedSliderStyles.activebutonstyleset}
      dotStyle={GetstartedSliderStyles.dotStyle}
    />
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  slideContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 100,
  },
  checkboxContainer: {
    marginVertical: 20,
    width: '100%',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
    color: '#ffffff',
    flex: 1,
  },
  continueButtonContainer: {
    alignItems: 'center',
    marginBottom: 50,
    borderRadius: 25,
    justifyContent: 'center',
  },
  reducedTextSize: {
    fontSize: 12,
  },
  continueButton: {
    backgroundColor: '#f79f80',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: '80%',
  },
  continueButtonText: {
    color: '#794619',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  iconContainer: {
    backgroundColor: '#f79f80',
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});

export default GetstartedSliderscreen;
