import React, { useState, useMemo } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux';

import { View, Text, ImageBackground, TouchableOpacity, StatusBar, StyleSheet, ScrollView, Alert } from 'react-native';
import { Authentication } from '../../../styles';
import { Button, Container, Spacing, Input, SweetAlertModal } from '../../../components';
import images from '../../../index';
import { RouteName } from '../../../routes';
import { SH, SF } from '../../../utils';
import { setCustomer } from '../../../redux/reducers/AuthReducer';
import { STOREFRONT_ACCESS_TOKEN } from '../../../../env';

const LoginScreen = (props) => {
  const { Colors } = useTheme();
  const Authentications = useMemo(() => Authentication(Colors), [Colors]);
  const { navigation } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const storefrontToken = STOREFRONT_ACCESS_TOKEN;

  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 5;
  };

  const handleLogin = async () => {
    setLoading(true);
    const graphqlQuery = {
      query: `
        mutation SignInWithEmailAndPassword($email: String!, $password: String!) {
          customerAccessTokenCreate(input: { email: $email, password: $password }) {
            customerAccessToken {
              accessToken
              expiresAt
            }
            customerUserErrors {
              code
              message
            }
          }
        }
      `, 
      variables: {
        email: inputEmail,
        password: inputPassword,
      }
    };

    try {
      const response = await axios({
        url: 'https://pw-dawn1.myshopify.com/api/2024-04/graphql.json', 
        method: 'post',
        headers: {
          'X-Shopify-Storefront-Access-Token': storefrontToken,
          'Content-Type': 'application/json'
        },
        data: graphqlQuery
      });

      const { data } = response;
      if (data.data.customerAccessTokenCreate.customerAccessToken) {
        const accessToken = data.data.customerAccessTokenCreate.customerAccessToken.accessToken;
        await AsyncStorage.setItem('authToken', accessToken);

        // Fetch customer details
        const customerQuery = {
          query: `
            query {
              customer(customerAccessToken: "${accessToken}") {
                id
                email
                firstName
                lastName
              }
            }
          `
        };

        const customerResponse = await axios({
          url: 'https://pw-dawn1.myshopify.com/api/2024-04/graphql.json', 
          method: 'post',
          headers: {
            'X-Shopify-Storefront-Access-Token': storefrontToken,
            'Content-Type': 'application/json'
          },
          data: customerQuery
        });

        const customerData = customerResponse.data.data.customer;
        
        dispatch(setCustomer(customerData));

        setSuccessModalVisible(true);
      } else {
        const errors = data.data.customerAccessTokenCreate.customerUserErrors.map(err => err.message).join(", ");
        Alert.alert('Error', errors || 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (email) => {
    setInputEmail(email);
    if (!validateEmail(email)) {
      setEmailError(t("Invalid email address"));
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (password) => {
    setInputPassword(password);
    if (!validatePassword(password)) {
      setPasswordError(t("Password must be at least 5 characters"));
    } else {
      setPasswordError('');
    }
  };

  const isFormValid = () => {
    return validateEmail(inputEmail) && validatePassword(inputPassword);
  };

  const styles = StyleSheet.create({
    loginButtonContainer: {
      width: '100%',
      alignItems: 'center',
    },
    loginButton: {
      backgroundColor: isFormValid() ? Colors.theme_backgound_second : 'gray',
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
    errorText: {
      color: 'red',
      fontSize: SF(12),
      marginTop: -5,
      marginLeft: 5
    }
  });

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
              onChangeText={handleEmailChange}
              value={inputEmail}
              keyboardType='default'
              autoCompleteType="email"
              inputStyle={{ fontSize: SF(12) }}
            />
            <View style={{ paddingLeft: 10, marginTop: -20, marginBottom: 10 }}>
              {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            </View>
            <Input
              title={t("Password_Text")}
              placeholder={t("Password_Text")}
              onChangeText={handlePasswordChange}
              value={inputPassword}
              secureTextEntry={true}
              inputStyle={{ fontSize: SF(12) }}
            />
            <View style={{ paddingLeft: 10, marginTop: -20, marginBottom: 10 }}>
              {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            </View>
            <TouchableOpacity onPress={() => navigation.navigate(RouteName.FORGOT_PASSWORD_SCREEN)}>
              <Text style={Authentications.forgotText}>{t("Forgot_Password")}</Text>
            </TouchableOpacity>
            <Spacing space={SH(30)} />
            <View style={[Authentications.buttonView, {width: '100%'}]}>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={isFormValid() && !loading ? handleLogin : null}
                disabled={loading || !isFormValid()}
              >
                <Text style={styles.loginButtonText}>
                  {loading ? t("Logging_In") : t("Login_Text")}
                </Text>
              </TouchableOpacity>
            </View>
            <Spacing space={SH(45)} />
            <Text style={{ textAlign: 'center', ...Authentications.signupText }}>
              {t("Don't have an account?")}
            </Text>
            <View style={styles.loginButtonContainer}>
              <TouchableOpacity
                style={{ ...styles.loginButton, backgroundColor: Colors.theme_backgound_second }}
                onPress={() => navigation.navigate(RouteName.SIGNUP_SCREEN)}
              >
                <Text style={styles.loginButtonText}>{t("SignUp")}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Spacing space={SH(25)} />
        </ScrollView>
        <SweetAlertModal
          message={t("Logged in successfully")}
          modalVisible={successModalVisible}
          setModalVisible={setSuccessModalVisible}
          onPress={() => navigation.reset({
            index: 0,
            routes: [{ name: RouteName.HOME_SCREEN }],
          })}
          success={true}
          buttonText={t("OK")}
        />
      </ImageBackground>
    </Container>
  );
};

export default LoginScreen;
