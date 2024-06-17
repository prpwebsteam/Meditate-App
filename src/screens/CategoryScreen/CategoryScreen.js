import React, { useMemo } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { HomeStyle } from '../../styles';
import { Container, Spacing, BottomTabMenu, CategoryView } from '../../components';
import { RouteName } from '../../routes';
import { SH, Categorydata } from '../../utils';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";

const CategoryScreen = (props) => {
  const { Colors } = useTheme();
  const HomeStyles = useMemo(() => HomeStyle(Colors), [Colors]);
  const { navigation } = props;
  const { t } = useTranslation();
  const onpressHandle = () => {
    navigation.navigate(RouteName.WORKOUT_DETAIL_SCREEN)
  }

  return (
    <Container>
      <BottomTabMenu {...props} selected={3} />
      <Spacing space={SH(20)} />
      <ScrollView>
        <View style={HomeStyles.textcenterview}>
          <View style={HomeStyles.textViewCategory}>
            <Text style={HomeStyles.heading}>{t("mins_13")}</Text>
          </View>
          <View>
            <FlatList
              data={Categorydata}
              renderItem={({ item, index }) => (<CategoryView onPress={() => onpressHandle(index)}
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
export default CategoryScreen;
