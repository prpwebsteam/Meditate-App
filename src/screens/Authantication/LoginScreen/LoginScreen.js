import React, { useState, useMemo } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StatusBar, ScrollView, Alert } from 'react-native';
import { Authentication } from '../../../styles';
import { Button, Container, Spacing, Input } from '../../../components';
import images from '../../../index';
import { RouteName } from '../../../routes';
import { SH } from '../../../utils';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";
import axios from 'axios';

const LoginScreen = (props) => {
  const { Colors } = useTheme();
  const Authentications = useMemo(() => Authentication(Colors), [Colors]);
  const { navigation } = props;
  const { t } = useTranslation();
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputpassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputName, setInputName] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://chitraguptp85.sg-host.com/wp-json/jwt-auth/v1/token', {
        username: inputName,
        password: inputPassword,
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Logged in successfully', [
          { text: 'OK', onPress: () => navigation.navigate(RouteName.HOME_SCREEN) }
        ]);
      } else {
        Alert.alert('Error', 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ImageBackground source={images.loginBG} resizeMode='cover' style={Authentications.setbgMainView}>
        <StatusBar
          barStyle={'dark-content'}
          translucent
          backgroundColor={'transparent'}
          hidden={false}
        />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={Authentications.ScrollViewStyles}>
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
            <Text style={[Authentications.imageText]}>{t("Sign_In")}</Text>
          </View>
          <View style={Authentications.inputView}>
            <Input
              title={t("Name")}
              placeholder={t("Name")}
              onChangeText={setInputName}
              value={inputName}
              keyboardType='default'
              autoCompleteType="name"
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
            <TouchableOpacity onPress={() => navigation.navigate(RouteName.FORGOT_PASSWORD_SCREEN)}>
              <Text style={Authentications.forgotText}>{t("Forgot_Password")}</Text>
            </TouchableOpacity>
            <Spacing space={SH(20)} />
            <View style={Authentications.buttonView}>
              <Button
                title={loading ? t("Logging_In") : t("Login_Text")}
                buttonStyle={Authentications.nextButton}
                onPress={handleLogin}
                disabled={loading}
              />
            </View>
          </View>
          <Spacing space={SH(25)} />
        </ScrollView>
      </ImageBackground>
    </Container>
  );
};

export default LoginScreen;