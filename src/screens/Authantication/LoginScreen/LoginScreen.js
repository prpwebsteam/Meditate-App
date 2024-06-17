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

  const handleLogin = async () => {
    navigation.navigate(RouteName.ABOUT_SELF_SCREEN)
    setLoading(true);
    try {
      const response = await axios.post('https://yourapi.com/login', {
        email: inputEmail,
        password: inputPassword,
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Logged in successfully', [
          { text: 'OK', onPress: () => navigation.navigate(RouteName.ABOUT_SELF_SCREEN) }
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
              title={t("Email")}
              placeholder={t("Email")}
              onChangeText={setInputEmail}  
              value={inputEmail}            
              keyboardType='email-address'  
              autoCompleteType="email"     
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
        </View>
      </ScrollView>
    </Container>
  );
};

export default LoginScreen;
