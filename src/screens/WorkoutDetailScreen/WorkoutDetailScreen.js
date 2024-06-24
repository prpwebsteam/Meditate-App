import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { WorkoutDetailStyle } from '../../styles';
import { Button, Container, Spacing, LottieIcon } from '../../components';
import images from '../../index';
import { RouteName } from '../../routes';
import { SH, SW } from '../../utils';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";

const WorkoutDetailScreen = (props) => {
  const { Colors } = useTheme();
  const WorkoutDetailStyles = useMemo(() => WorkoutDetailStyle(Colors), [Colors]);
  const { navigation } = props;
  const { t } = useTranslation();
  return (
    <Container>

      <View>
        <View style={WorkoutDetailStyles.viewImageBoxChallengeInnerView}>
          <View>
            <Spacing space={SH(10)} />
            <View style={WorkoutDetailStyles.leftArrowView}>
              <TouchableOpacity onPress={() => navigation.navigate(RouteName.HOME_SCREEN)}>
                <LottieIcon source={images.leftArrowWhite} style={WorkoutDetailStyles.leftArrow} />
              </TouchableOpacity>
              <Text style={[WorkoutDetailStyles.ImageTitle]}>{t("Breathing_Practices")}</Text>
            </View>
          </View>
          <View style={WorkoutDetailStyles.centerMainView}>
            <View>
              <LottieIcon source={images.lotus_complex} style={WorkoutDetailStyles.imageStyle} />
            </View>
            <Spacing space={SH(20)} />

            <Text style={[WorkoutDetailStyles.boxText]}>{t("Breathing_Practices")}</Text>
            <Spacing space={SH(10)} />
            <Text style={[WorkoutDetailStyles.boxTextLight]}>{t("For_Relaxation")}</Text>
            <Spacing space={SH(40)} />

            <View style={WorkoutDetailStyles.playView}>
              <Image source={images.forward_button} style={WorkoutDetailStyles.playViewIcon} />

              <View style={WorkoutDetailStyles.playCenter}>
                <Image source={images.play} style={[WorkoutDetailStyles.playViewIconCenter]} />
              </View>
              <Image source={images.rewind_button} style={WorkoutDetailStyles.playViewIcon} />
            </View>
            <Spacing space={SH(40)} />
            <View style={WorkoutDetailStyles.playTimeView}>
              <Text style={WorkoutDetailStyles.playTimeText}>3:23</Text>
              <Text style={[WorkoutDetailStyles.playTimeText, WorkoutDetailStyles.off_gray]}>10:00</Text>
            </View>
            <View style={[WorkoutDetailStyles.counterMainViewStart]}>
              <View style={[WorkoutDetailStyles.counterMainViewStartActive, { width: '30%' }]}>

              </View>
            </View>
            <Spacing space={SH(20)} />

          </View>
          <Spacing space={SH(20)} />
          <View style={WorkoutDetailStyles.workoutListMainView}>
            <Button title={t("Explore_Similar")} onPress={() => navigation.navigate(RouteName.HOME_SCREEN)} />
            <Spacing space={SH(20)} />

          </View>
        </View>

      </View>
    </Container>
  );
};
export default WorkoutDetailScreen;
