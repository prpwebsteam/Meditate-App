import React, { useState, useMemo } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { AboutSelfStyle, Authentication } from '../../../styles';
import { Button, Container, LottieIcon, Spacing } from '../../../components';
import images from '../../../index';
import { RouteName } from '../../../routes';
import { SH } from '../../../utils';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";

const AboutSelfScreen = (props) => {
  const { Colors } = useTheme();
  const AboutSelfStyles = useMemo(() => AboutSelfStyle(Colors), [Colors]);
  const Authentications = useMemo(() => Authentication(Colors), [Colors]);
  const { navigation } = props;
  const [activeTab, setActiveTab] = useState("0");
  const { t } = useTranslation();

  return (
    <Container>
      <View style={Authentications.MainViewSingle}>
        <View>
          <Spacing space={SH(50)} />
          <View style={AboutSelfStyles.textcenterview}>
            <Text style={[AboutSelfStyles.Text, AboutSelfStyles.TextBold]}>
              {t("Tell_U_About_Yourself")}
            </Text>
            <Spacing space={SH(15)} />
            <Text style={[AboutSelfStyles.TextNormal]}>
              {t("About_Your_Self_2")}
            </Text>
          </View>
        </View>
        <View style={AboutSelfStyles.yourSelfRoundMainBox}>
          <TouchableOpacity onPress={() => setActiveTab("0")} style={[AboutSelfStyles.yourSelfRoundBox, activeTab == "0" && AboutSelfStyles.yourSelfRoundActiveBox]}>
            {activeTab == "0" &&
              <LottieIcon source={images.selectionRound} Lottiewidthstyle={AboutSelfStyles.selectionRoundBox} loop={false} />
            }
            <Image resizeMode="contain" source={images.male} style={AboutSelfStyles.yourSelfRoundImage} />
            <Spacing space={SH(10)} />
            <Text style={AboutSelfStyles.yourSelfRoundText}>{t("Male_Label")}</Text>
          </TouchableOpacity>
          <Spacing space={SH(30)} />
          <TouchableOpacity onPress={() => setActiveTab("1")} style={[AboutSelfStyles.yourSelfRoundBox, activeTab == "1" && AboutSelfStyles.yourSelfRoundActiveBox]}>
            {activeTab == "1" &&
              <LottieIcon source={images.selectionRound} Lottiewidthstyle={AboutSelfStyles.selectionRoundBox} />
            }
            <Image source={images.female} resizeMode="contain" style={AboutSelfStyles.yourSelfRoundImage} />
            <Spacing space={SH(10)} />
            <Text style={AboutSelfStyles.yourSelfRoundText}>{t("Female_Label")}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={Authentications.buttonView}>
            <Button title={t("Next_Text")} buttonStyle={Authentications.nextButton} onPress={() => navigation.navigate(RouteName.AGE_SCREEN)} />
          </View>
          <Spacing space={SH(25)} />
        </View>
      </View>
    </Container>
  );
};
export default AboutSelfScreen;
