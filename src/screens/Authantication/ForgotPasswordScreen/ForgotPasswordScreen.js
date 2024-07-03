import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, ScrollView, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { Container, Input, SweetAlertModal } from '../../../components';
import { RouteName } from '../../../routes';
import images from '../../../index';
import { STOREFRONT_ACCESS_TOKEN } from '../../../../env';
import { SH, SF, Fonts, SW } from '../../../utils';

const OtpVerifyScreen = ({ navigation }) => {
  const { Colors } = useTheme();
  const { t } = useTranslation();
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const accessToken = STOREFRONT_ACCESS_TOKEN;

  const sendCode = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter an email address.');
      return;
    }

    setLoading(true);
    try {
      const graphqlQuery = {
        query: `
          mutation customerRecover($email: String!) {
            customerRecover(email: $email) {
              customerUserErrors {
                code
                field
                message
              }
            }
          }
        `,
        variables: {
          email,
        },
      };

      const response = await axios({
        url: 'https://themoonheart.myshopify.com/api/2024-04/graphql.json',
        method: 'post',
        headers: {
          'X-Shopify-Storefront-Access-Token': accessToken,
          'Content-Type': 'application/json',
        },
        data: graphqlQuery,
      });

      const { data } = response;

      if (data.data.customerRecover.customerUserErrors.length === 0) {
        setSuccessModalVisible(true);
      } else {
        const errors = data.data.customerRecover.customerUserErrors.map(err => err.message).join(", ");
        Alert.alert('Error', errors || 'Something went wrong, please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to send the code. Please check your network and try again.');
      console.error('Error sending reset code:', error);
    } finally {
      setLoading(false);
    }
  };

  const onPressHandle = () => {
    setSuccessModalVisible(false);
    navigation.navigate(RouteName.LOGIN_SCREEN);
  };

  return (
    <Container>
      <ImageBackground source={images.loginBG} resizeMode='cover' style={styles.backgroundImage}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.container}>
            <View style={[styles.containerinner]}>
              <Text style={styles.title}>{t("Forgot_Password_TWO")}</Text>
              <Input
                title={t("Enter_Email")}
                placeholder={t("Enter_Email")}
                onChangeText={setEmail}
                value={email}
                keyboardType='email-address'
                inputStyle={styles.input}
              />
                  
              <TouchableOpacity
                style={styles.button}
                onPress={sendCode}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>{t("Send_Text")}</Text>
                )}
              </TouchableOpacity>
            </View>
            <SweetAlertModal
              message={t("Email_Successfull")}
              modalVisible={successModalVisible}
              setModalVisible={setSuccessModalVisible}
              onPress={onPressHandle}
              success={true}
              buttonText={t("Ok")}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </Container>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerinner: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  scrollView: {
    flexGrow: 1,
    width: '100%',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    fontSize: 16,
    width: '100%',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 118,
    backgroundColor: '#f79f80',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OtpVerifyScreen;
