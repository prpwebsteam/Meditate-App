import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AgeStyle, Authentication } from '../../../styles';
import { Button, Container, Spacing, VectoreIcons } from '../../../components';
import { RouteName } from '../../../routes';
import { SH, SF } from '../../../utils';
import { Picker } from 'react-native-wheel-pick';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";

const AgeScreen = (props) => {
  const { Colors } = useTheme();
  const Authentications = useMemo(() => Authentication(Colors), [Colors]);
  const AgeStyles = useMemo(() => AgeStyle(Colors), [Colors]);
  const { navigation } = props;
  const { t } = useTranslation();
  const Items = Array.from(Array(100).keys());

  return (
    <Container>
      <View style={Authentications.MainViewSingle}>
        <View>
          <Spacing space={SH(50)} />
          <View style={AgeStyles.textcenterview}>
            <Text style={[AgeStyles.Text, AgeStyles.TextBold]}>
              {t("How_Old_are_you")}
            </Text>
            <Spacing space={SH(15)} />
            <Text style={[AgeStyles.TextNormal]}>
              {t("The_Point_Using")}
            </Text>
          </View>
        </View>
        <View style={AgeStyles.yourAgeMainBox}>
          <Picker
            style={AgeStyles.AgePickerView}
            selectedValue='34'
            pickerData={Items}
            onValueChange={value => { console.log(value) }}
            textColor={Colors.black_text_color}
            textSize={SF(30)}
            selectTextColor={Colors.theme_background}
            isShowSelectLine={true}
            selectLineColor={Colors.theme_backgound_second}
            selectLineSize={4}
          />
        </View>
        <View>
          <View style={Authentications.buttonMainView}>
            <View style={Authentications.buttonView}>
              <TouchableOpacity onPress={() => navigation.navigate(RouteName.ABOUT_SELF_SCREEN)}>
                <VectoreIcons icon="AntDesign" name="leftcircle" size={SF(38)} color={Colors.black_text_color} />
              </TouchableOpacity>
            </View>
            <View style={Authentications.buttonView}>
              <Button title={t("Next_Text")} buttonStyle={Authentications.agebutton} nextArraow={true} onPress={() => navigation.navigate(RouteName.HOME_SCREEN)} />
            </View>
          </View>
          <Spacing space={SH(25)} />
        </View>
      </View>
    </Container>
  );
};
export default AgeScreen;
