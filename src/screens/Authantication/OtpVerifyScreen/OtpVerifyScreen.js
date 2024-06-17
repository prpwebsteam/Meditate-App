import React, { useState, useMemo } from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import { Authentication } from '../../../styles';
import { Button, Container, Spacing, OTPInput, SweetAlertModal } from '../../../components';
import { RouteName } from '../../../routes';
import { SH } from '../../../utils';
import { useTheme } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { useTranslation } from "react-i18next";

const OtpVerifyScreen = (props) => {
  const { Colors } = useTheme();
  const Authentications = useMemo(() => Authentication(Colors), [Colors]);
  const { navigation } = props;
  const { t } = useTranslation();
  const [code, setCode] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [resendModalVisible, setresendModalVisible] = useState(false);
  const onPressHandle = () => {
    setSuccessModalVisible(false)
    navigation.navigate(RouteName.ABOUT_SELF_SCREEN)
  }
  const resendOTP = () => {
    setresendModalVisible(false)
    navigation.navigate(RouteName.OTP_VERYFY_SCREEN)
  }
  return (
    <Container>
      <View style={Authentications.verifyMainView}>
        <KeyboardAvoidingView enabled>
          <View style={Authentications.verificationInputView}>
            <View >
              <View>
                <Text style={Authentications.verificationTextTitle}>{t("Verification_Text")}</Text>
                <Spacing space={SH(15)} />
                <Text style={Authentications.verificationText}>{t("We_Sent_Otp")}</Text>
                <Spacing space={SH(3)} />
                <Text style={Authentications.verificationText}>{t("On_Number")}</Text>
              </View>
              <Spacing space={SH(100)} />
              <OTPInput
                pinnum={4}
                autoFocusOnLoad={false}
                code={code}
                onCodeChanged={(code) => setCode(code)}
              />
              <Spacing space={SH(40)} />
              <View style={Authentications.FlexRowText}>
                <TouchableOpacity onPress={() => setresendModalVisible(true)}>
                  <Text style={Authentications.ResendTextBold}>{t("Resend")}</Text>
                </TouchableOpacity>
              </View>
              <Spacing space={SH(50)} />
            </View>
          </View>
        </KeyboardAvoidingView>
        <View>
          <View style={Authentications.buttonMainView}>
            <View style={Authentications.buttonView}>
              <Button title="" LeftArraow={true} buttonStyle={Authentications.PrevButton} onPress={() => navigation.navigate(RouteName.LOGIN_SCREEN)} />
            </View>
            <View style={Authentications.buttonView}>
              <Button title={t("Verify_Text")} buttonStyle={Authentications.nextButton} onPress={() => setSuccessModalVisible(true)} />
            </View>
          </View>
          <Spacing space={SH(25)} />
        </View>
        <SweetAlertModal
          message={t("Verification_Success")}
          modalVisible={successModalVisible}
          setModalVisible={setSuccessModalVisible}
          onPress={() => onPressHandle()}
          loginSuccess={true}
          buttonminview={Authentications.buttonotp}
          buttonText={t("OK_Text")}
        />
        <SweetAlertModal
          message={t("OTP_Has_Been_Sent")}
          modalVisible={resendModalVisible}
          setModalVisible={setSuccessModalVisible}
          onPress={() => { resendOTP() }}
          otpsend={true}
          buttonminview={Authentications.buttonotp}
          buttonText={t("OK_Text")}
        />
      </View>
    </Container>
  );
};
export default OtpVerifyScreen;
