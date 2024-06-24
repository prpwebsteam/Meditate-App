import React, { useState, useMemo } from 'react';
import { View, Text, ImageBackground, StyleSheet, ScrollView, Alert } from 'react-native';
import { Authentication } from '../../../styles/Authentication';
import { Button, Container, Spacing, Input, SweetAlertModal } from '../../../components';
import { RouteName } from '../../../routes';
import { SH, SF } from '../../../utils';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";
import images from '../../../index';

const OtpVerifyScreen = (props) => {
  const { Colors } = useTheme();
  const Authentications = useMemo(() => Authentication(Colors), [Colors]);
  const { navigation } = props;
  const { t } = useTranslation();
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [email, setEmail] = useState('');

  const onPressHandle = () => {
    setSuccessModalVisible(false);
    navigation.navigate(RouteName.RESET_PASSWORD_SCREEN);
  };

  const sendCode = async () => {
    try {
      const response = await fetch('https://chitraguptp85.sg-host.com/wp-json/meditate/v2/send-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();

      if (response.ok) {
        setSuccessModalVisible(true);
      } else {
        Alert.alert('Error', result.message || 'Something went wrong, please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to send the code. Please check your network and try again.');
    }
  };

  return (
    <Container>
      <ImageBackground source={images.loginBG} resizeMode='cover' style={Authentications.setbgMainView}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={Authentications.ScrollViewStyles}>
          <View style={Authentications.verifyMainView}>
            <Text style={[styles.forgotPasswordText, Authentications.verificationInputView, Authentications.verificationTextTitle]}>
              {t("Forgot_Password_TWO")}
            </Text>
            <Input
              title={t("Enter_Email")}
              placeholder={t("Enter_Email")}
              onChangeText={(e) => setEmail(e)}
              value={email}
              keyboardType={'email-address'}
              inputStyle={{ fontSize: SF(12) }}
            />
            <View style={Authentications.buttonView}>
              <Button title={t("Send_Text")}
                buttonStyle={{ ...Authentications.nextButton, width: '100%' }} onPress={sendCode} />
            </View>
            <Spacing space={SH(250)} />
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
  forgotPasswordText: {
    width: '100%',
    textAlign: 'center',
  },
});

export default OtpVerifyScreen;
