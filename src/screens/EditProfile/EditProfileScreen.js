import React, { useState, useMemo } from 'react';
import { View, ScrollView } from 'react-native';
import { Authentication } from '../../styles/Authentication';
import { Button, Container, Spacing, Input, BottomTabMenu } from '../../components';
import { RouteName } from '../../routes';
import { SH } from '../../utils';
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';

const EditProfileScreen = (props) => {
  const { Colors } = useTheme();
  const Authentications = useMemo(() => Authentication(Colors), [Colors]);
  const { navigation } = props;
  const [inputMobile, setInputMobile] = useState('');
  const [inputName, setinputName] = useState('');
  const [inputNameemail, setinputNameemail] = useState('');
  const { t } = useTranslation();

  return (
    <Container>
      <BottomTabMenu
        {...props}
        selected={4} />
      <ScrollView>
        <View style={Authentications.setbgMainViewtwo}>
          <Spacing space={SH(20)} />
          <View style={Authentications.inputView}>
            <Input
              title={t("Name_Text")}
              placeholder={t("Name_Text")}
              onChangeText={setinputName}
              value={inputName}
              autoCompleteType="tel"
            />
            <Input
              title={t("Mobile_Number")}
              placeholder={t("Mobile_Number")}
              onChangeText={setInputMobile}
              value={inputMobile}
              inputType='numeric'
              maxLength={10}
              autoCompleteType="tel"
            />
            <Input
              title={t("Enter_Email")}
              placeholder={t("Enter_Email")}
              onChangeText={setinputNameemail}
              value={inputNameemail}
              autoCompleteType="tel"
            />
          </View>
          <Spacing space={SH(30)} />
          <View style={Authentications.buttonView}>
            <Button title={t("Update_Text")} buttonStyle={Authentications.nextButton} onPress={() => navigation.navigate(RouteName.HOME_SCREEN)} />
          </View>
          <Spacing space={SH(25)} />
        </View>
      </ScrollView>
    </Container>
  );
};
export default EditProfileScreen;
