import React, { useState, useMemo } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StatusBar, StyleSheet, ScrollView, Alert } from 'react-native';
import { Authentication } from '../../../styles';
import { Button, Container, Spacing, Input } from '../../../components';
import images from '../../../index';
import { RouteName } from '../../../routes';
import { SH, SF, Fonts, SW } from '../../../utils';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";
import axios from 'axios';

const SignUpScreen = (props) => {
  const { Colors } = useTheme();
  const Authentications = useMemo(() => Authentication(Colors), [Colors]);
  const { navigation } = props;
  const { t } = useTranslation();
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputName, setInputName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://chitraguptp85.sg-host.com/wp-json/meditate/v2/register', {
        username: inputName,
        email: inputEmail,
        password: inputPassword,
        gender: gender,
        age: age,
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Account created successfully', [
          { text: 'OK', onPress: () => navigation.navigate(RouteName.LOGIN_SCREEN) }
        ]);
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again.');
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
          <View style={Authentications.SignUpTab}>
            <TouchableOpacity>
              <Text style={[Authentications.loginSignUpText, Authentications.activeBorder]}>{t("Sign_Up")}</Text>
            </TouchableOpacity>
          </View>
          <View style={Authentications.inputView}>
            <Spacing space={SH(30)} />
            <Input
              title={t("Name")}
              placeholder={t("Name")}
              onChangeText={setInputName}
              value={inputName}
              keyboardType='default'
              autoCompleteType="name"
              containerStyle={Authentications.PassWordStyle}
              inputStyle={{ fontSize: SF(12) }}
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
              inputStyle={{ fontSize: SF(12) }}
            />
            <Spacing space={SH(20)} />
            <Input
              title={t("Password_Text")}
              placeholder={t("Password_Text")}
              onChangeText={setInputPassword}
              value={inputPassword}
              secureTextEntry={true}
              containerStyle={Authentications.PassWordStyle}
              inputStyle={{ fontSize: SF(12) }}
            />
            <Spacing space={SH(20)} />
            <Text style={{
              fontSize: SF(16), color: Colors.white,
              fontSize: SF(18),
              color: Colors.white,
              fontFamily: Fonts.Poppins_Medium,
              paddingHorizontal: SW(15),
              fontWeight: '500',
              paddingVertical: SH(2),
            }}>{t("Gender")}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: SH(10), paddingHorizontal: SW(15), }}>
              <TouchableOpacity onPress={() => setGender('Male')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                  width: 24,
                  height: 24,
                  borderRadius: 2,
                  borderWidth: 2,
                  borderColor: gender === 'Male' ? Colors.theme_backgound : Colors.border,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 8
                }}>
                  {gender === 'Male' && <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: Colors.theme_backgound }} />}
                </View>
                <Text style={{ fontSize: SF(12), color: Colors.white }}>{t("Male")}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setGender('Female')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                  width: 24,
                  height: 24,
                  borderRadius: 2,
                  borderWidth: 2,
                  borderColor: gender === 'Female' ? Colors.theme_backgound : Colors.border,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 8
                }}>
                  {gender === 'Female' && <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: Colors.theme_backgound }} />}
                </View>
                <Text style={{ fontSize: SF(12), color: Colors.white }}>{t("Female")}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setGender('Prefer not to say')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                  width: 24,
                  height: 24,
                  borderRadius: 2,
                  borderWidth: 2,
                  borderColor: gender === 'Prefer not to say' ? Colors.theme_backgound : Colors.border,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 8
                }}>
                  {gender === 'Prefer not to say' && <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: Colors.theme_backgound }} />}
                </View>
                <Text style={{ fontSize: SF(12), color: Colors.white }}>{t("Prefer not to say")}</Text>
              </TouchableOpacity>
            </View>
            <Spacing space={SH(20)} />
            <Input
              title={t("How Old Are You?")}
              placeholder={t("Type")}
              onChangeText={setAge}
              value={age}
              keyboardType='numeric'
              containerStyle={Authentications.PassWordStyle}
              inputStyle={{ fontSize: SF(12) }}
            />
            <Spacing space={SH(30)} />
            <View style={Authentications.buttonView}>
              <Button
                title={loading ? t("Signing_Up") : t("Sign_Up")}
                buttonStyle={{ ...Authentications.nextButton, width: '100%' }}
                onPress={handleSignUp}
                disabled={loading}
              />
            </View>
            <Spacing space={SH(45)} />
            <Text style={{ textAlign: 'center', ...Authentications.signupText }}>
              {t("Already have an account?")}{' '}
            </Text>
            <View style={styles.loginButtonContainer}>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => navigation.navigate(RouteName.LOGIN_SCREEN)}
              >
                <Text style={styles.loginButtonText}>{t("Login")}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Spacing space={SH(25)} />
        </ScrollView>
      </ImageBackground>
    </Container>
  );
};

export default SignUpScreen;
