import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AgeStyle, Authentication } from '../../../styles';
import { Button, Container, Spacing, VectoreIcons } from '../../../components';
import { RouteName } from '../../../routes';
import { SH, SF } from '../../../utils';
import { Picker } from 'react-native-wheel-pick';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";

const GoalScreen = (props) => {
  const { Colors } = useTheme();
  const Authentications = useMemo(() => Authentication(Colors), [Colors]);
  const AgeStyles = useMemo(() => AgeStyle(Colors), [Colors]);
  const { navigation } = props;
  const { t } = useTranslation();
  const Items = [t("Lose_Weight"), t("Gain_More"), t("Gain_More"), t("Flexible_Text"), t("Flexible_Text"), t("Get_Filter"), t("Get_Stronger"), t("Keep_Fit")];

  return (
    <Container>
      <View style={Authentications.MainViewSingle}>
        <View>
          <Spacing space={SH(50)} />
          <View style={AgeStyles.textcenterview}>
            <Text style={[AgeStyles.Text, AgeStyles.TextBold]}>
              {t("What_Your_Goal")}
            </Text>
            <Spacing space={SH(15)} />
            <Text style={[AgeStyles.TextNormal]}>
              {t("Various_Versions")}
            </Text>
          </View>
        </View>
        <View style={AgeStyles.yourAgeMainBox}>
          <Picker
            style={AgeStyles.GoalPickerView}
            selectedValue='Get Filter'
            pickerData={Items}
            onValueChange={value => { console.log(value) }}
            textColor={Colors.black_text_color}
            textSize={SF(20)}
            selectTextColor={Colors.theme_background}
            isShowSelectLine={true} // Default is true
            selectLineColor={Colors.theme_background}
            selectLineSize={6} // Default is 4
          />
        </View>
        <View>
          <View style={Authentications.buttonMainView}>
            <View style={Authentications.buttonView}>
              {/* <Button title="" LeftArraow={true} buttonStyle={Authentications.PrevButton} onPress={() => navigation.navigate(RouteName.WEIGHT_SCREEN)} /> */}
              <TouchableOpacity onPress={() => navigation.navigate(RouteName.WEIGHT_SCREEN)}>
                <VectoreIcons icon="AntDesign" name="arrowleft" size={SF(28)} color={Colors.black_text_color} />
              </TouchableOpacity>
            </View>
            <View style={Authentications.buttonView}>
              <Button title={t("Next_Text")} buttonStyle={Authentications.nextButton} nextArraow={true} onPress={() => navigation.navigate(RouteName.WE_HELP_SCREEN)} />
            </View>
          </View>
          <Spacing space={SH(25)} />
        </View>
      </View>
    </Container>
  );
};
export default GoalScreen;
