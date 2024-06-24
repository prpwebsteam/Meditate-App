import React, { useState, useMemo } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Authentication, WeHelpStyle } from '../../../styles';
import { Button, Container, Spacing, VectoreIcons } from '../../../components';
import images from '../../../index';
import { RouteName } from '../../../routes';
import { SH, SF, dataArray } from '../../../utils';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";

const WeHelpScreen = (props) => {
  const { Colors } = useTheme();
  const WeHelpStyles = useMemo(() => WeHelpStyle(Colors), [Colors]);
  const Authentications = useMemo(() => Authentication(Colors), [Colors]);
  const { navigation } = props;
  const [activeTab, setActiveTab] = useState('1');
  const { t } = useTranslation();
  const onHandleButton = (e) => {
    setActiveTab(e)
  }

  return (
    <Container>
      <View style={Authentications.MainViewSingle}>
        <View>
          <Spacing space={SH(50)} />
          <View style={WeHelpStyles.textcenterview}>
            <Text style={[WeHelpStyles.Text, WeHelpStyles.TextBold]}>
              {t("Welcome_Text")}
            </Text>
            <Spacing space={SH(15)} />
            <Text style={[WeHelpStyles.TextNormal]}>
              {t("Choose_Plane")}
            </Text>
          </View>
        </View>
        <View>
          {dataArray.map((item) => {
            return (
              <>
                <TouchableOpacity onPress={() => onHandleButton(item.id)} style={[WeHelpStyles.MainBox, activeTab == item.id && WeHelpStyles.RoundActiveMainBox]}>
                  <View style={WeHelpStyles.MainBoxTextView}>
                    <Text style={[WeHelpStyles.buttonBigText, activeTab == item.id && WeHelpStyles.buttonBigTextActive]}>{t(item.title)}</Text>
                    <Spacing space={SH(10)} />
                    <Text style={WeHelpStyles.buttonSmallText}>{t(item.content)}</Text>
                  </View>
                  <Image source={images.rightArrow} style={WeHelpStyles.rightImageStyle} resizeMode='cover' />
                </TouchableOpacity>
                <Spacing space={SH(30)} />
              </>
            )
          })
          }
        </View>
        <View>
          <View style={Authentications.buttonMainView}>
            <View style={Authentications.buttonView}>            
              <TouchableOpacity onPress={() => navigation.navigate(RouteName.GOAL_SCREEN)}>
                <VectoreIcons icon="AntDesign" name="arrowleft" size={SF(28)} color={Colors.black_text_color} />
              </TouchableOpacity>
            </View>
            <View style={Authentications.buttonView}>
              <Button title={t("Next_Text")} buttonStyle={Authentications.nextButton} nextArraow={true} onPress={() => navigation.navigate(RouteName.LOGIN_SCREEN)} />
            </View>
          </View>          
          <Spacing space={SH(25)} />
        </View>
      </View>
    </Container>
  );
};
export default WeHelpScreen;
