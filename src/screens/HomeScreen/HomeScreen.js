import React, { useMemo } from 'react';
import { View, Text, FlatList, ScrollView, Image } from 'react-native';
import { HomeStyle } from '../../styles';
import { Container, Spacing, BottomTabMenu, WorkOutView } from '../../components';
import images from '../../index';
import { RouteName } from '../../routes';
import { SH, WorkoutData } from '../../utils';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";

const HomeScreen = (props) => {
  const { Colors } = useTheme();
  const HomeStyles = useMemo(() => HomeStyle(Colors), [Colors]);
  const { navigation } = props;

  const { t } = useTranslation();
  const onpressHandle = (id) => {
    navigation.navigate(RouteName.WORKOUT_DETAIL_SCREEN)
  }

  return (
    <Container>
      <BottomTabMenu
        {...props}
        selected={0}
      />
      <ScrollView>
        <View style={HomeStyles.textcenterview}>
          <Spacing space={SH(20)} />
          <View style={HomeStyles.userIconView}>
            <View style={HomeStyles.userIconBox}>
              <Image source={images.userIcon} style={HomeStyles.userIcon} resizeMode='cover' />
            </View>
            <Text style={HomeStyles.userTitle}>{t("Hey_Pinal")}</Text>
          </View>
          <Spacing space={SH(30)} />
          <View style={HomeStyles.textView}>
            <Text style={HomeStyles.heading}>{t("your_mood")}</Text>
          </View>
          <Spacing space={SH(40)} />
          <View style={HomeStyles.HomeCommonView}>
            <Text style={HomeStyles.HomeCommonTitle}>{t("Latest_Practices")}</Text>
            <Text style={[HomeStyles.HomeCommonTitle, HomeStyles.viewAllColor]}>{t("View_All")}</Text>
          </View>
          <Spacing space={SH(20)} />
          <View style={HomeStyles.RecentAllView}>
            <FlatList
              data={WorkoutData}
              renderItem={({ item, index }) => (<WorkOutView onPress={() => onpressHandle(index)}
                item={item}
                index={index}
              />)}
              keyExtractor={(item, index) => index.toString()}
              horizontal={false}
              numColumns={2}
            />
          </View>
        </View>
      </ScrollView>
      <Spacing space={SH(80)} />
    </Container>
  );
};
export default HomeScreen;
