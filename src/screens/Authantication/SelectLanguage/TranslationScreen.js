import React, { useState } from "react";
import '../SelectLanguage/i18n'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Container, LottieIcon, Spacing, VectoreIcons, Button, ModalLanguage } from '../../../components';
import { LanguageStyles } from '../../../styles';
import { RouteName } from '../../../routes';
import images from '../../../index';
import { SH, Colors, SF, } from '../../../utils';
import { useTheme } from '@react-navigation/native';

const Translation = (props) => {
  const { navigation } = props;
  const { Colors } = useTheme();
  const { t, i18n } = useTranslation();
  let englishLanguage = t("English");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectLabel, setSelectLabel] = useState(englishLanguage);

  const changeLang = (e) => {
    setSelectLabel(e)
  }

  return (
    <Container>
      <ScrollView
        keyboardShouldPersistTaps="handled"
      >
        <View style={LanguageStyles.MinView}>
          <LottieIcon source={images.Languageanimation} />
          <Spacing space={SH(450)} />
          <TouchableOpacity onPress={() => setModalVisible(true)} style={LanguageStyles.SelectTagWrap}>
            <Text style={LanguageStyles.SelectText}>{selectLabel}</Text>
            <View style={LanguageStyles.DropDownIcon}>
              <VectoreIcons icon="Feather" name="chevron-down" color={Colors.theme_backgound_second} size={SF(25)} /></View>
          </TouchableOpacity>
          <Spacing space={SH(20)} />
          <ModalLanguage modalVisible={modalVisible}
            setModalVisible={() => {
              setModalVisible(!modalVisible);
            }}
            close={() => setModalVisible(!modalVisible)}
            OnClose={() => setModalVisible(false)}
            changeLang={changeLang}
          />

        </View>
      </ScrollView>
      <View style={LanguageStyles.CenterButtonView}>
        <View style={LanguageStyles.BtnVieStyle}>
          <Button title={t("Confirm_Text")} onPress={() => navigation.navigate(RouteName.LOGIN_SCREEN)} />
        </View>
      </View>
    </Container>
  );
};
export default Translation;