import React, { useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { Authentication } from '../../styles';
import { Button, Container, Spacing, Input, BottomTabMenu } from '../../components';
import images from '../../images';
import { RouteName } from '../../routes';
import { SH, SW } from '../../utils';
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfileScreen = (props) => {
  const { Colors } = useTheme();
  const Authentications = useMemo(() => Authentication(Colors), [Colors]);
  const { navigation } = props;
  const [inputMobile, setInputMobile] = useState('');
  const [inputName, setinputName] = useState('');
  const [inputNameemail, setinputNameemail] = useState('');
  const { t } = useTranslation();

  const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    buttonView: {
      paddingHorizontal: SW(40),
      flexDirection: 'column',
      width: '100%',
      justifyContent: 'center', 
      alignItems: 'center', 
    },
    nextButton: {
      alignSelf: 'center',
      width: '90%',
      marginBottom: 20,
    },
    logoutButton: {
      alignSelf: 'center',
      width: '90%',
    },
    inputView: {
      paddingHorizontal: SH(30),
      color: Colors.white,
      marginBottom: 20,
    },
  });

  const onLogout = async () => {
    await AsyncStorage.removeItem('authToken');
    navigation.reset({
      index: 0,
      routes: [{ name: RouteName.LOGIN_SCREEN }],
    });
  };

  return (
    <Container>
      <ImageBackground source={images.background1} resizeMode='cover' style={styles.backgroundImage}>
        <View style={styles.overlay} />
        <BottomTabMenu {...props} selected={4} />
        <ScrollView>
          <View style={Authentications.setbgMainViewtwo}>
            <Spacing space={SH(20)} />
            <View style={styles.inputView}>
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
            <View style={styles.buttonView}>
              <Button
                title={t("Update_Text")}
                buttonStyle={styles.nextButton}
                onPress={() => navigation.navigate(RouteName.HOME_SCREEN)}
              />
              <Button
                title={t("Logout")}
                buttonStyle={styles.logoutButton}
                onPress={onLogout}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </Container>
  );
};

export default EditProfileScreen;
