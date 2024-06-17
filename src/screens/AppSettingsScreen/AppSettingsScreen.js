import React, { useState, useMemo } from 'react';
import { View, Text, Pressable, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { HomeStyle, Settings, LanguageStyles } from '../../styles';
import { SweetAlertModal, Container, Spacing, VectoreIcons, ModalLanguage } from '../../components';
import { SH, SF, } from '../../utils';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";

const AppSettingsScreen = (props) => {
    const { Colors } = useTheme();
    const HomeStyles = useMemo(() => HomeStyle(Colors), [Colors]);
    const Settingss = useMemo(() => Settings(Colors), [Colors]);
    const [isEnabled, setIsEnabled] = useState(false);
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
    return (
        <Container>
            <ScrollView>
                <View style={Settingss.textcenterview}>
                    <View style={Settingss.topspaceview}>
                        <View style={Settingss.minflexview}>
                            <View style={Settingss.togglrswitchflex}>
                                <View>
                                    <Text style={Settingss.cellulardatatext}>{t("Cellular_Data")}</Text>
                                </View>
                            </View>
                            <View style={Settingss.toggleswotchview}>
                                <Text style={Settingss.downlodtoggleswitchtext}>
                                    {t("Cellular_Downnloads")}
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
                            <Text style={Settingss.cellulardatatext}>{t("Video_Downloads")}</Text>
                            <View style={Settingss.righticonminview}>
                                <View>
                                    <Text style={Settingss.standardrecommedtext}>{t("Standard_recommended")}</Text>
                                    <Text style={Settingss.downloadfastertext}>{t("Downnloads_Faster")}</Text>
                                </View>
                                <View>
                                    <VectoreIcons
                                        icon="AntDesign"
                                        size={SF(30)}
                                        name="check"
                                        style={Settingss.chekiconstyle}
                                    />
                                </View>
                            </View>
                            <View style={Settingss.righticonminview}>
                                <View>
                                    <Text style={Settingss.standardrecommedtext}>{t("High_Definition")}</Text>
                                    <Text style={Settingss.downloadfastertext}>{t("Use_Storage")}</Text>
                                </View>
                            </View>
                            <Text style={LanguageStyles.Settingtext}>{t("Select_Your_Language")}</Text>
                            <TouchableOpacity onPress={() => setModalVisible(true)} style={LanguageStyles.SettingStyle}>
                                <Text style={LanguageStyles.SelectText}>{selectLabel}</Text>
                                <View style={LanguageStyles.DropDownIcon}>
                                    <VectoreIcons icon="Feather" name="chevron-down" color={Colors.black_text_color} size={SF(25)} /></View>
                            </TouchableOpacity>
                            <ModalLanguage modalVisible={modalVisible}
                                setModalVisible={() => {
                                    setModalVisible(!modalVisible);
                                }}
                                close={() => setModalVisible(!modalVisible)}
                                OnClose={() => setModalVisible(false)}
                                changeLang={changeLang}
                            />
                            <Text style={Settingss.offlinedoenloadstextset}>{t("Offline_Downloads")}</Text>
                            <View style={Settingss.righticonminview}>
                                <View style={Settingss.bodysettextwidth}>
                                    <Text style={Settingss.standardrecommedtext}>{t("Delete_Completed")}</Text>
                                    <Text style={Settingss.downloadfastertext}>{t("Delete_Completed_1")}</Text>
                                </View>
                                <View>
                                    <VectoreIcons
                                        icon="AntDesign"
                                        size={SF(30)}
                                        name="check"
                                        style={Settingss.chekiconstyle}
                                    />
                                </View>
                            </View>
                            <View style={Settingss.righticonminviewtwo}>
                                <View style={Settingss.bodysettextwidth}>
                                    <Text style={Settingss.deletedownloads}>{t("Delete_All_Downloads")}</Text>
                                    <Text style={Settingss.downloadfastertext}>{t("Delete_All_Downloads_2")}</Text>
                                </View>
                                <Pressable onPress={() => setSuccessModalVisible(true)}>
                                    <VectoreIcons
                                        icon="MaterialCommunityIcons"
                                        size={SF(30)}
                                        name="check"
                                        style={Settingss.chekiconstyle}
                                    />
                                </Pressable>
                            </View>
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
        </Container>
    );
};
export default AppSettingsScreen;
