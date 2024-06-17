import React, { useState, useMemo } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StatusBar, ScrollView, Alert } from 'react-native';
import { Authentication } from '../../../styles/Authentication';
import { Button, Container, Spacing, Input } from '../../../components';
import images from '../../../index';
import { RouteName } from '../../../routes';
import { SH } from '../../../utils';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";
import axios from 'axios';

const SignUpScreen = (props) => {
  const { Colors } = useTheme();
  const Authentications = useMemo(() => Authentication(Colors), [Colors]);
  const { navigation } = props;
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputpassword] = useState('');
  const [inputName, setInputName] = useState('');
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    navigation.navigate(RouteName.LOGIN_SCREEN)
    setLoading(true);
    try {
      const response = await axios.post('https://yourapi.com/signup', {
        name: inputName,
        email: inputEmail,
        password: inputPassword,
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Account created successfully', [
          { text: 'OK', onPress: () => navigation.navigate(RouteName.LOGIN_SCREEN) }
        ]);
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } catch (error) {
      // Handle the error response here
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
              title={t("Name")}
              placeholder={t("Name")}
              onChangeText={setInputName}  
              value={inputName}            
              keyboardType='name-address'  
              autoCompleteType="name"     
              containerStyle={Authentications.PassWordStyle}
            />
            <Spacing space={SH(20)} />
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
            <Spacing space={SH(50)} />
            <View style={Authentications.buttonView}>
              <Button
                title={loading ? t("Signing_Up") : t("Sign_Up")}
                buttonStyle={Authentications.nextButton}
                onPress={handleSignUp}
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

export default SignUpScreen;
