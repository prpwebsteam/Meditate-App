import React, { useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { Authentication } from '../../styles';
import { Button, Container, Spacing, Input, BottomTabMenu } from '../../components';
import images from '../../images';
import { RouteName } from '../../routes';
import { SH, SW } from '../../utils';
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
    inputView: {
      paddingHorizontal: SH(30),
      color: Colors.white,
      marginBottom: 20,
    },
  });

  const updateProfile = async () => {
    try {
      const payload = {
        name: inputName,
        mobile: inputMobile,
        email: inputNameemail,
      };
      console.log('Updating profile with:', payload);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile.');
    }
  };

  const validateAndUpdate = () => {
    if (!inputName.trim()) {
      alert("Name is required");
      return;
    }
    if (!inputMobile.match(/^\d{10}$/)) {
      alert("Enter a valid 10-digit mobile number");
      return;
    }
    if (!inputNameemail.match(/^\S+@\S+\.\S+$/)) {
      alert("Enter a valid email address");
      return;
    }
    updateProfile();
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
                onPress={validateAndUpdate}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </Container>
  );
};

export default EditProfileScreen;