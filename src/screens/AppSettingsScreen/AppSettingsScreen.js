import React, { useMemo, useState } from 'react';
import { View, Text, Switch, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { HomeStyle, Settings } from '../../styles';
import { SweetAlertModal, Container, Button, Spacing } from '../../components';
import { SH } from '../../utils';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";
import { useToggle } from '../../utils/ToggleContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import images from '../../images';
import { RouteName } from '../../routes';

const AppSettingsScreen = (props) => {
  const { Colors } = useTheme();
  const HomeStyles = useMemo(() => HomeStyle(Colors), [Colors]);
  const Settingss = useMemo(() => Settings(Colors), [Colors]);
  const { isEnabled, setIsEnabled } = useToggle();
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const { t } = useTranslation();
  const onPressHandle = () => {
    setSuccessModalVisible(false);
  }
  let englishLanguage = t("English");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectLabel, setSelectLabel] = useState(englishLanguage);

  const changeLang = (e) => {
    setSelectLabel(e)
  }

  const onLogout = async () => {
    await AsyncStorage.removeItem('authToken');
    props.navigation.reset({
      index: 0,
      routes: [{ name: RouteName.LOGIN_SCREEN }],
    });
  };

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
      paddingHorizontal: SH(30),
      flexDirection: 'column',
      width: '93%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoutButton: {
      alignSelf: 'center',
      marginTop: 20,
    },
  });

  return (
    <Container>
      <ImageBackground source={images.background1} resizeMode='cover' style={styles.backgroundImage}>
        <View style={styles.overlay} />
        <ScrollView>
          <View style={Settingss.textcenterview}>
            <View style={Settingss.topspaceview}>
              <View style={Settingss.minflexview}>
                <View style={Settingss.togglrswitchflex}>
                  <View>
                    <Text style={Settingss.cellulardatatext}>{t("Color Picker")}</Text>
                  </View>
                </View>
                <View style={Settingss.toggleswotchview}>
                  <Text style={Settingss.downlodtoggleswitchtext}>
                    {t("Enable this to use color picker")}
                  </Text>
                  <View>
                    <Switch
                      trackColor={{ false: "lightgray", true: "lightgray" }}
                      thumbColor={isEnabled ? "hsl(214.3, 83.2%, 51%)" : "white"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.buttonView}>
                <Button
                  title={t("Logout")}
                  buttonStyle={styles.logoutButton}
                  onPress={onLogout}
                />
              </View>
            </View>
          </View>
          <Spacing space={SH(80)} />
        </ScrollView>
        <SweetAlertModal
          message={t("Deleted_Successfully")}
          modalVisible={successModalVisible}
          setModalVisible={setSuccessModalVisible}
          onPress={() => onPressHandle()}
          success={true}
          buttonText={t("Ok")}
        />
      </ImageBackground>
    </Container>
  );
};

export default AppSettingsScreen;
