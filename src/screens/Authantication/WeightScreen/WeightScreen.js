import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AgeStyle, Authentication } from '../../../styles';
import { Button, Container, Spacing, VectoreIcons } from '../../../components';
import { RouteName } from '../../../routes';
import { SH, SF } from '../../../utils';
import { Picker } from 'react-native-wheel-pick';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";

const WeightScreen = (props) => {
  const { Colors } = useTheme();
  const Authentications = useMemo(() => Authentication(Colors), [Colors]);
  const AgeStyles = useMemo(() => AgeStyle(Colors), [Colors]);
  const { navigation } = props;
  const { t } = useTranslation();

  const Items = [t("30_kg"), t("40_kg"), t("50_kg"), t("60_kg"), t("70_kg"), t("80_kg"), t("90_kg"), t("100_kg"), t("110_kg")];
  return (
    <Container>
      <View style={Authentications.MainViewSingle}>
        <View>
          <Spacing space={SH(50)} />
          <View style={AgeStyles.textcenterview}>
            <Text style={[AgeStyles.Text, AgeStyles.TextBold]}>
              {t("What_your_weight")}
            </Text>
            <Spacing space={SH(15)} />
            <Text style={[AgeStyles.TextNormal]}>
              {t("Many_Desktop_Publishing")}
            </Text>
          </View>
        </View>
        <View style={AgeStyles.yourAgeMainBox}>
          <Picker
            style={AgeStyles.WeightPickerView}
            selectedValue='70 kg'
            pickerData={Items}
            onValueChange={value => { console.log(value) }}
            textColor={Colors.black_text_color}
            textSize={SF(25)}
            selectTextColor={Colors.theme_background}
            isShowSelectLine={true} // Default is true
            selectLineColor={Colors.theme_background}
            selectLineSize={4} // Default is 4
          />
        </View>
        <View>
          <View style={Authentications.buttonMainView}>
            <View style={Authentications.buttonView}>
              {/* <Button title="" LeftArraow={true} buttonStyle={Authentications.PrevButton} onPress={() => navigation.navigate(RouteName.YOUR_HIGHT_SCREEN)} /> */}
              <TouchableOpacity onPress={() => navigation.navigate(RouteName.AGE_SCREEN)}>
                <VectoreIcons icon="AntDesign" name="arrowleft" size={SF(28)} color={Colors.black_text_color} />
              </TouchableOpacity>
            </View>
            <View style={Authentications.buttonView}>
              <Button title={t("Next_Text")} buttonStyle={Authentications.nextButton} nextArraow={true} onPress={() => navigation.navigate(RouteName.GOAL_SCREEN)} />
            </View>
          </View>
          <Spacing space={SH(25)} />
        </View>
      </View>
    </Container>
  );
};
export default WeightScreen;
