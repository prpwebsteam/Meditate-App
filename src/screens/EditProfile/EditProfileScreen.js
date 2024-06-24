import React, { useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet, ImageBackground, Text } from 'react-native';
import { Authentication } from '../../styles/Authentication';
import { Button, Container, Spacing, Input, BottomTabMenu } from '../../components';
import { RouteName } from '../../routes';
import { SH, SW } from '../../utils';
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';
import images from '../../index';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center', 
      alignItems: 'center', 
    },
    nextButton: {
      alignSelf: 'center',
      width: '90%',
    },
    inputView: {
      paddingHorizontal: SH(30),
      color: Colors.white,
      marginBottom: 20,
    },
  });

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
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </Container>
  );
};
export default EditProfileScreen;
