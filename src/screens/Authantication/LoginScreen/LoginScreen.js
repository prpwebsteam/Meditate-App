import React, { useState, useMemo } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { Authentication } from '../../../styles';
import { Button, Container, Spacing, Input } from '../../../components';
import images from '../../../index';
import { RouteName } from '../../../routes';
import { SH } from '../../../utils';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";

const LoginScreen = (props) => {
  const { Colors } = useTheme();
  const Authentications = useMemo(() => Authentication(Colors), [Colors]);
  const { navigation } = props;
  const { t } = useTranslation();
  const [inputMobile, setInputMobile] = useState('');
  const [inputPassword, setInputpassword] = useState('');

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
            <ImageBackground source={images.login} resizeMode='cover' style={Authentications.setbgimage}>
              <View style={Authentications.loginSignUpTab}>
                <TouchableOpacity>
                  <Text style={[Authentications.loginSignUpText, Authentications.activeBorder]}>{t("Login_Text")}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate(RouteName.SIGNUP_SCREEN)}>
                  <Text style={Authentications.loginSignUpText}>{t("Sign_Up")}</Text>
                </TouchableOpacity>
              </View>
              <View style={Authentications.loginSignUpTextView}>
                <Text style={Authentications.imageText}>{t("Welcome_Back")}</Text>
                <Text style={[Authentications.imageText, Authentications.TextBold]}>{t("Sign_In")}</Text>
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
            <Spacing space={SH(5)} />
            <TouchableOpacity onPress={() => navigation.navigate(RouteName
              .FORGOT_PASSWORD_SCREEN)}>
              <Text style={Authentications.forgotText}>{t("Forgot_Password")}</Text>
            </TouchableOpacity>
            <Spacing space={SH(20)} />
            <View style={Authentications.buttonView}>
              <Button title={t("Login_Text")} buttonStyle={Authentications.nextButton} onPress={() => navigation.navigate(RouteName.OTP_VERYFY_SCREEN)} />
            </View>
          </View>
          <Spacing space={SH(25)} />
        </View>
      </ScrollView>
    </Container>
  );
};
export default LoginScreen;
