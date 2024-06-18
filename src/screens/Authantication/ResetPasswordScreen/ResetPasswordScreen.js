import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, ImageBackground } from 'react-native';
import { Authentication } from '../../../styles/Authentication';
import { Button, Container, Input, SweetAlertModal } from '../../../components';
import { RouteName } from '../../../routes';
import { SH, SF } from '../../../utils';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";
import images from '../../../index';

const ResetPasswordScreen = (props) => {
  const { Colors } = useTheme();
  const Authentications = useMemo(() => Authentication(Colors), [Colors]);
  const { navigation, route } = props;
  const { t } = useTranslation();
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const email = route.params?.email; 

  const onPressHandle = () => {
    setSuccessModalVisible(false);
    navigation.navigate(RouteName.LOGIN_SCREEN);
  };

  const resetPassword = async () => {
    try {
      const response = await fetch('https://chitraguptp85.sg-host.com/wp-json/meditate/v2/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, reset_code: resetCode, new_password: newPassword }),
      });
      const result = await response.json();

      if (response.ok) {
        setSuccessModalVisible(true);
      } else {
        Alert.alert('Error', result.message || 'Something went wrong, please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to reset the password. Please check your network and try again.');
    }
  };

  return (
    <Container>
      <ImageBackground source={images.loginBG} resizeMode='cover' style={Authentications.setbgMainView}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={Authentications.ScrollViewStyles}>
        <View style={Authentications.verifyMainView}>
          <Text style={[styles.resetPasswordText, Authentications.verificationInputView, Authentications.verificationTextTitle]}>
            {t("Reset Password")}
          </Text>
          <Input
            title={t("Enter Reset Code")}
            placeholder={t("Enter Reset Code")}
            onChangeText={(e) => setResetCode(e)}
            value={resetCode}
            keyboardType={'default'}
            inputStyle={{ fontSize: SF(12) }}
          />
          <Input
            title={t("Enter New Password")}
            placeholder={t("Enter New Password")}
            onChangeText={(e) => setNewPassword(e)}
            value={newPassword}
            secureTextEntry={true}
            inputStyle={{ fontSize: SF(12) }}
          />
          <View style={Authentications.buttonView}>
            <Button title={t("Reset Password")}
              buttonStyle={{ ...Authentications.nextButton, width: '100%' }} onPress={resetPassword} />
          </View>
          <SweetAlertModal
            message={t("Password Reset Success")}
            modalVisible={successModalVisible}
            setModalVisible={setSuccessModalVisible}
            onPress={() => onPressHandle()}
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
  resetPasswordText: {
    width: '100%',
    textAlign: 'center',
  },
});

export default ResetPasswordScreen;
