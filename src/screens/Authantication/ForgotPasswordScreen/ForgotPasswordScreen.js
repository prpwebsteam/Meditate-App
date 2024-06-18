import React, { useState, useMemo } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
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

  const onPressHandle = () => {
    setSuccessModalVisible(false);
    navigation.navigate(RouteName.LOGIN_SCREEN);
  }

  const [email, setEmail] = useState('');

  return (
    <Container>
      <ImageBackground source={images.loginBG} resizeMode='cover' style={Authentications.setbgMainView}>
        <View style={Authentications.verifyMainView}>
          <View style={Authentications.verificationInputView}>
            <Text style={[styles.forgotPasswordText, Authentications.verificationTextTitle]}>
              {t("Forgot_Password_TWO")}
            </Text>
            {/* <Spacing space={SH(15)} />
            <Text style={Authentications.verificationText}>{t("We_Well_Sand_Message")}</Text> */}
          </View>
          <Input
            title={t("Enter_Email")}
            placeholder={t("Enter_Email")}
            onChangeText={(e) => setEmail(e)}
            value={email}
            keyboardType={'email-address'}
            inputStyle={{ fontSize: SF(12) }}
          />
          <View style={Authentications.buttonMainView}>
            {/* <View style={Authentications.buttonView}>
                <Button title="" LeftArraow={true} buttonStyle={Authentications.PrevButton} onPress={() => navigation.navigate(RouteName.LOGIN_SCREEN)} />
              </View> */}
            <View style={Authentications.buttonView}>
              <Button title={t("Send_Text")} buttonStyle={Authentications.nextButton} onPress={() => setSuccessModalVisible(true)} />
            </View>
          </View>
          <Spacing space={SH(350)} />
          <SweetAlertModal
            message={t("Email_Successfull")}
            modalVisible={successModalVisible}
            setModalVisible={setSuccessModalVisible}
            onPress={() => onPressHandle()}
            success={true}
            buttonText={t("Ok")}
          />
        </View>
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
