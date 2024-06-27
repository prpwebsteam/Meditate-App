import React, { useState, useMemo } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StatusBar, StyleSheet, ScrollView, Alert } from 'react-native';
import { Authentication } from '../../../styles';
import { Button, Container, Spacing, Input } from '../../../components';
import images from '../../../index';
import { RouteName } from '../../../routes';
import { SH, SF } from '../../../utils';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        username: inputEmail,
        password: inputPassword,
      });

      if (response.status === 200) {
        await AsyncStorage.setItem('authToken', response.data.token);
        Alert.alert('Success', 'Logged in successfully', [
          { text: 'OK', onPress: () => navigation.reset({
            index: 0,
            routes: [{ name: RouteName.HOME_SCREEN }],
          }) }
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

  const styles = StyleSheet.create({ 
    loginButtonContainer: {
      width: '100%',
      alignItems: 'center',
    },
    loginButton: {
      backgroundColor: Colors.theme_backgound_second,
      padding: 10,
      borderRadius: 10,
      width: '87%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginButtonText: {
      color: Colors.btn_color,
      fontWeight: 'bold',
      fontSize: 16,
    },
  })

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
          <View style={Authentications.loginTab}>
            <TouchableOpacity>
              <Text style={[Authentications.loginSignUpText, Authentications.activeBorder]}>{t("Login_Text")}</Text>
            </TouchableOpacity>
          </View>
          <Spacing space={SH(20)} />
          <View style={Authentications.inputView}>
            <Spacing space={SH(20)} />
            <Input
              title={t("Email")}
              placeholder={t("Email")}
              onChangeText={setInputEmail}
              value={inputEmail}
              keyboardType='default'
              autoCompleteType="email"
              inputStyle={{ fontSize: SF(12) }}
            />
            <Input
              title={t("Password_Text")}
              placeholder={t("Password_Text")}
              onChangeText={setInputpassword}
              value={inputPassword}
              secureTextEntry={true}
              inputStyle={{ fontSize: SF(12) }}
            />
            <TouchableOpacity onPress={() => navigation.navigate(RouteName.FORGOT_PASSWORD_SCREEN)}>
              <Text style={Authentications.forgotText}>{t("Forgot_Password")}</Text>
            </TouchableOpacity>
            <Spacing space={SH(30)} />
            <View style={Authentications.buttonView}>
              <Button
                title={loading ? t("Logging_In") : t("Login_Text")}
                buttonStyle={{ ...Authentications.nextButton, width: '100%' }}
                onPress={handleLogin}
                disabled={loading}
              />
            </View>
            <Spacing space={SH(45)} />
            <Text style={{ textAlign: 'center', ...Authentications.signupText }}>
              {t("Don't have an account?")}
            </Text>

            
            <View style={styles.loginButtonContainer}>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => navigation.navigate(RouteName.SIGNUP_SCREEN)}
              >
                <Text style={styles.loginButtonText}>{t("SignUp")}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Spacing space={SH(25)} />
        </ScrollView>
      </ImageBackground>
    </Container>
  );
};

export default LoginScreen;
