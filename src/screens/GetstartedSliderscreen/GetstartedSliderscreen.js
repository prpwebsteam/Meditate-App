import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { GetstartedSliderStyle } from '../../styles/GetstartedSliderscreen';
import { Button, Container, LottieIcon, Spacing } from '../../components';
import images from '../../index';
import { RouteName } from '../../routes';
import { useTheme } from '@react-navigation/native';
import { SH, SlideGetData } from '../../utils';
import { useTranslation } from "react-i18next";

const GetstartedSliderscreen = (props) => {
  const { Colors } = useTheme();
  const GetstartedSliderStyles = useMemo(() => GetstartedSliderStyle(Colors), [Colors]);
  const { t } = useTranslation();
  const { navigation } = props;

  const RenderItem = ({ item }) => {
    return (
      <View>
        <View style={[GetstartedSliderStyles.minstyleviewphotograpgy, { backgroundColor: Colors.transpharent }]}>
          <View style={GetstartedSliderStyles.mainInnerView}>
            <View style={GetstartedSliderStyles.smallimagcenter}>
              {item.key == 1 ?
                <LottieIcon source={images.slide1} style={[GetstartedSliderStyles.imagesetus, GetstartedSliderStyles.imageSlide1]} />
                : item.key == 2 ?
                  <LottieIcon source={images.slide2} style={[GetstartedSliderStyles.imagesetus, GetstartedSliderStyles.imageSlide2]} />
                  :
                  <LottieIcon source={images.slide3} style={[GetstartedSliderStyles.imagesetus, GetstartedSliderStyles.imageSlide3]} />
              }
            </View>
            <View style={GetstartedSliderStyles.textcenterview}>
              <Text style={GetstartedSliderStyles.sliderText}>
                {t(item.text)}
              </Text>
              <Text style={[GetstartedSliderStyles.sliderText, GetstartedSliderStyles.sliderTextBold]}>
                {t(item.boldText)}
              </Text>
            </View>
            {item.key == 1 ?
              <Spacing space={SH(30)} />
              : item.key == 2 ?
                <Spacing space={SH(0)} />
                :
                <Spacing space={SH(0)} />
            }
          </View>
        </View>
      </View>
    );
  };
  const _renderDoneButton = () => {
    return (
      <View style={GetstartedSliderStyles.setbgbuttondiv}>
        <View style={GetstartedSliderStyles.buttonCircle}>
          <Button
            title={t("Let_started")}
            onPress={() => navigation.navigate(RouteName.TRLANSTION_SCREEN)}
          />
        </View>
      </View>
    );
  };

  return (
    <Container>
      <AppIntroSlider
        data={SlideGetData}
        renderItem={RenderItem}
        showNextButton={false}
        showSkipButton={false}
        renderDoneButton={_renderDoneButton}
        activeDotStyle={GetstartedSliderStyles.activebutonstyleset}
        dotStyle={GetstartedSliderStyles.dotStyle}
      />
    </Container>
  );
};
export default GetstartedSliderscreen;
