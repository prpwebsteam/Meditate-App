import React, { useState, useEffect, useMemo } from "react";
import { Text, View, ScrollView, KeyboardAvoidingView, TextInput, } from "react-native";
import { HelpStyle, HomeStyle } from '../../styles';
import { Button, Container, SweetAlertModal } from '../../components';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";

const DoctoreHelpScreen = (props) => {
  const { Colors } = useTheme();
  const HomeStyles = useMemo(() => HomeStyle(Colors), [Colors]);
  const HelpStyles = useMemo(() => HelpStyle(Colors), [Colors]);
  const { t } = useTranslation();
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const onPressHandle = () => {
    setSuccessModalVisible(false)
  }

  return (
    <Container>
      <ScrollView>
        <View style={HomeStyles.textcenterview}>
          <View style={HelpStyles.settopspace}>
            <TextInput style={HelpStyles.settextinputwidth} placeholder={t("Type_Message")} placeholderTextColor="black" />
          </View>
          <View>
            <Text style={HelpStyles.settextinputtext}>{t("Deleted_Successfully_1")}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={HelpStyles.textcenterview}>
        <View style={HelpStyles.setbuttonstyle}>
          <Button title={t("Send_Mail")} onPress={() => setSuccessModalVisible(true)} />
        </View>
      </View>
      <SweetAlertModal
        message={t("Email_Has")}
        modalVisible={successModalVisible}
        setModalVisible={setSuccessModalVisible}
        onPress={() => onPressHandle()}
        success={true}
        buttonText={t("OK")}
      />
    </Container>
  );
};
export default DoctoreHelpScreen;
