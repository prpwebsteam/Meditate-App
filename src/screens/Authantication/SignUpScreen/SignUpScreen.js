import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setCustomerId } from '../../../redux/action/CommonAction';
import { View, Text, ImageBackground, TouchableOpacity, StatusBar, StyleSheet, ScrollView, Alert } from 'react-native';
import { Authentication } from '../../../styles';
import { Button, Container, Spacing, Input } from '../../../components';
import images from '../../../index';
import { RouteName } from '../../../routes';
import { SH, SF, Fonts, SW } from '../../../utils';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { SHOPIFY_ACCESS_TOKEN, STOREFRONT_ACCESS_TOKEN } from '../../../../env';
import FlashNotification from '../../../components/FlashNotification';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const SignUpScreen = (props) => {
  const { Colors } = useTheme();
  const Authentications = useMemo(() => Authentication(Colors), [Colors]);
  const { navigation } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputName, setInputName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const [flashNotification, setFlashNotification] = useState(false);
  const [flashNotificationMessage, setFlashNotificationMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [ageError, setAgeError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 5;
  };

  const handleAgeChange = (ageInput) => {
    setAge(ageInput);
    if (ageInput === '' || (Number(ageInput) >= 1 && Number(ageInput) <= 100)) {
      setAgeError('');
    } else {
      setAgeError(t("Age must be between 1 and 100"));
    }
  };

  const validateForm = () => {
    return (
      inputName.length > 0 &&
      validateEmail(inputEmail) &&
      validatePassword(inputPassword) &&
      gender.length > 0 &&
      age !== '' &&
      !ageError
    );
  };

  const accessToken = SHOPIFY_ACCESS_TOKEN;
  const storefrontToken = STOREFRONT_ACCESS_TOKEN;

  const handleSignUp = async () => {
    setLoading(true);
    const SIGN_UP_MUTATION = `
      mutation RegisterAccount(
        $email: String!, 
        $password: String!,  
        $firstName: String!, 
        $lastName: String!, 
        $acceptsMarketing: Boolean = false,
      ) {
        customerCreate(input: {
            email: $email, 
            password: $password, 
            firstName: $firstName,  
            lastName: $lastName,
            acceptsMarketing: $acceptsMarketing, 
        }) {
            customer {
                id
            }
            customerUserErrors {
                code
                message
            }
        }
      }
    `;

    const variables = {
      email: inputEmail,
      password: inputPassword,
      firstName: inputName.split(" ")[0],
      lastName: inputName.split(" ")[1] || '',
      acceptsMarketing: false,
    };

    try {
      const response = await axios({
        url: 'https://themoonheart.myshopify.com/api/2024-04/graphql.json',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': storefrontToken,
        },
        data: {
          query: SIGN_UP_MUTATION,
          variables: variables,
        }
      });

      if (response.data.data.customerCreate.customer) {
        const customerId = response.data.data.customerCreate.customer.id.split('/').pop();
console.log(customerId,'punit-----------------------');
        await axios({
          url: `https://lilly-paris-shop.myshopify.com/admin/customers/${customerId}/metafields.json`,
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken,
          },
          data: {
            metafield: {
              namespace: "custom",
              key: "gender",
              type: "single_line_text_field",
              value: gender
            }
          }
        });

        await axios({
          url: `https://lilly-paris-shop.myshopify.com/admin/customers/${customerId}/metafields.json`,
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken,
          },
          data: {
            metafield: {
              namespace: "custom",
              key: "age",
              type: "number_integer",
              value: age
            }
          }
        });

        dispatch(setCustomerId(customerId));
        setFlashNotificationMessage(t("Account created successfully"));
        setFlashNotification(true);

        setTimeout(() => {
          setFlashNotification(false);
          navigation.navigate(RouteName.LOGIN_SCREEN);
        }, 2000);
      } else {
        const errors = response.data.data.customerCreate.customerUserErrors.map(error => error.message).join('\n');
        setFlashNotificationMessage(errors || 'Something went wrong. Please try again.hhh');
        setFlashNotification(true);
      }
    } catch (error) {
      console.log(error, "-----------------:error")
      setFlashNotificationMessage(error.response?.data?.errors[0]?.message || 'Account created successfully');
      setFlashNotification(true);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setFlashNotification(false);
      }, 2000);
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

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
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
    signUpButton: {
      backgroundColor: validateForm() ? Colors.theme_backgound_second : 'gray',
      padding: 10,
      borderRadius: 10,
      width: '87%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    signUpButtonText: {
      color: Colors.btn_color,
      fontWeight: 'bold',
      fontSize: 16,
    },
    errorText: {
      color: 'red',
      fontSize: SF(12),
      marginTop: -5,
      marginLeft: 5
    },
    eyeIcon: {
      position: 'absolute',
      top: 43,
      right: 20,
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
              onChangeText={handleEmailChange}
              value={inputEmail}
              keyboardType='email-address'
              autoCompleteType="email"
              containerStyle={Authentications.PassWordStyle}
              inputStyle={{ fontSize: SF(12) }}
            />
            <View style={{ paddingLeft: 10 }}>
              {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            </View>
            <Spacing space={SH(20)} />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Input
                title={t("Password_Text")}
                placeholder={t("Password_Text")}
                onChangeText={handlePasswordChange}
                value={inputPassword}
                secureTextEntry={!passwordVisible}
                containerStyle={Authentications.PassWordStyle}
                inputStyle={{ fontSize: SF(12) }}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={togglePasswordVisibility}
              >
                <Icon
                  name={passwordVisible ? 'visibility' : 'visibility-off'}
                  size={20}
                  color={Colors.white}
                />
              </TouchableOpacity>
            </View>
            <View style={{ paddingLeft: 10 }}>
              {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            </View>
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
              onChangeText={handleAgeChange}
              value={age}
              keyboardType='numeric'
              containerStyle={Authentications.PassWordStyle}
              inputStyle={{ fontSize: SF(12) }}
            />
            {ageError ? <Text style={[styles.errorText, {paddingLeft: 10}]}>{ageError}</Text> : null}
            <Spacing space={SH(30)} />
            <View style={Authentications.buttonView}>
              <TouchableOpacity
                style={styles.signUpButton}
                onPress={validateForm() && !loading ? handleSignUp : null}
                disabled={loading || !validateForm()}
              >
                <Text style={styles.signUpButtonText}>
                  {loading ? t("Signing_Up") : t("Sign_Up")}
                </Text>
              </TouchableOpacity>
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
        <FlashNotification
          falshShow={flashNotification}
          flashMessage={flashNotificationMessage}
        />
      </ImageBackground>
    </Container>
  );
};

export default SignUpScreen;
