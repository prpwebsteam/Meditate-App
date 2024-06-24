import React, { useState, useMemo } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { Authentication } from '../../../styles/Authentication';
import { Button, Container, Spacing, Input } from '../../../components';
import images from '../../../index';
import { RouteName } from '../../../routes';
import { SH } from '../../../utils';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";

const SignUpScreen = (props) => {
  const { Colors } = useTheme();
  const Authentications = useMemo(() => Authentication(Colors), [Colors]);
  const { navigation } = props;
  const [inputMobile, setInputMobile] = useState('');
  const [inputPassword, setInputpassword] = useState('');
  const { t } = useTranslation();

  return (
    <Container>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor={'transparent'}
        hidden={false}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={Authentications.ScrollViewStyles}>
        <View style={Authentications.setbgMainView}>
          <View style={Authentications.setbgimageView}>
            <ImageBackground source={images.signUp} resizeMode='cover' style={Authentications.setbgimage}>
              <View style={Authentications.loginSignUpTab}>
                <TouchableOpacity onPress={() => navigation.navigate(RouteName.LOGIN_SCREEN)}>
                  <Text style={[Authentications.loginSignUpText]}>{t("Login_Text")}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={[Authentications.loginSignUpText, Authentications.activeBorder]}>{t("Sign_Up")}</Text>
                </TouchableOpacity>
              </View>
              <View style={Authentications.loginSignUpTextView}>
                <Text style={Authentications.imageText}>{t("Welcome_Back")}</Text>
                <Text style={[Authentications.imageText, Authentications.TextBold]}>{t("Sign_Up")}</Text>
              </View>
            </ImageBackground>
          </View>
          <View style={Authentications.inputView}>
            <Spacing space={SH(30)} />
            <Input
              title={t("Mobile_number")}
              placeholder={t("Mobile_number")}
              onChangeText={setInputMobile}
              value={inputMobile}
              inputType='numeric'
              keyboardType='numeric'
              maxLength={10}
              autoCompleteType="tel"
              containerStyle={Authentications.PassWordStyle}
            />
            <Spacing space={SH(20)} />
            <Input
              title={t("Password_Text")}
              placeholder={t("Password_Text")}
              onChangeText={setInputpassword}
              value={inputPassword}
              secureTextEntry={true}
              containerStyle={Authentications.PassWordStyle}
            />
            <Spacing space={SH(50)} />
            <View style={Authentications.buttonView}>
              <Button title={t("Sign_Up")} buttonStyle={Authentications.nextButton} onPress={() => navigation.navigate(RouteName.OTP_VERYFY_SCREEN)} />
            </View>
          </View>
          <Spacing space={SH(25)} />
        </View>
      </ScrollView>
    </Container>
  );
};
export default SignUpScreen;
