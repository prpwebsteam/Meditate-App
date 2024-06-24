import React from 'react';
import { RouteName } from '../routes';
import {
  HomeScreen, EditProfileScreen, AppSettingsScreen, HelpScreen, YogaScreen, CategoryScreen, MeditationScreen
} from '../screens';
import { AppHeader, ColorPicker } from '../components';
import { Colors, Fonts, SF } from '../utils';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Text } from 'react-native';
import VectorIcon from '../components/commonComponents/VectoreIcons';
import { useTranslation } from "react-i18next";
import { ProductListScreen } from '../screens/ProductListScreen';

const SideNavigator = props => {
  const { t } = useTranslation();
  const Drawer = createDrawerNavigator();
  const styleArray = {
    headerTintColor: Colors.white_text_color,
    headerStyle: {
      backgroundColor: Colors.theme_backgound_second,
    },
    headerShown: true,
    headerRight: (props) => <ColorPicker {...props} />,
    drawerActiveTintColor: Colors.theme_backgound,
    drawerInactiveTintColor: Colors.white,
    drawerLabelStyle: { color: Colors.theme_backgound, fontSize: SF(18), fontFamily: Fonts.RobotoCondensed_Regular },
    drawerActiveBackgroundColor: Colors.theme_backgound_second,
  };

  const drawerIcon = (focused, icon) => {
    return (
      <VectorIcon
        icon="MaterialCommunityIcons"
        name={icon}
        size={SF(24)}
        color={focused ? Colors.white_text_color : Colors.theme_backgound_second}
      />
    )
  }

  const drawerTitle = (focused, title) => {
    return (
      <Text style={{ color: focused ? Colors.white : Colors.theme_backgound, fontSize: SF(18), fontFamily: Fonts.RobotoCondensed_Regular }}>{title}</Text>
    )
  }

  return (
    <Drawer.Navigator screenOptions={{
      headerShown: false,
      drawerStyle: {
        backgroundColor: Colors.white,
      }
    }} >
      <Drawer.Screen
        name={RouteName.HOME_SCREEN} component={HomeScreen}
        options={{
          headerTitle: (props) => <AppHeader {...props} headerTitle={t("Home_Text")} />,
          ...styleArray,
          drawerIcon: ({ focused }) => drawerIcon(focused, "home"),
          drawerLabel: ({ focused }) => drawerTitle(focused, t("Home_Text"))
        }}

      />
      <Drawer.Screen
        name={RouteName.YOGA_SCREEN} component={YogaScreen}
        options={{
          headerTitle: (props) => <AppHeader {...props} headerTitle={t("Yoga_Text")} />,
          ...styleArray,
          drawerIcon: ({ focused }) => drawerIcon(focused, "yoga"),
          drawerLabel: ({ focused }) => drawerTitle(focused, t("Yoga_Text"))
        }}
      />
      <Drawer.Screen
        name={RouteName.MEDITATION_SCREEN} component={MeditationScreen}
        options={{
          headerTitle: (props) => <AppHeader {...props} headerTitle={t("Meditation_Text")} />,
          ...styleArray,
          drawerIcon: ({ focused }) => drawerIcon(focused, "flower-tulip"),
          drawerLabel: ({ focused }) => drawerTitle(focused, t("Meditation_Text"))
        }}
      /> 
      <Drawer.Screen
        name={RouteName.CATEGORY_SCREEN} component={ProductListScreen}
        options={{
          headerTitle: (props) => <AppHeader {...props} headerTitle={t("Category_Text")} />,
          ...styleArray,
          drawerIcon: ({ focused }) => drawerIcon(focused, "shape"),
          drawerLabel: ({ focused }) => drawerTitle(focused, t("Category_Text"))
        }}
      />
      <Drawer.Screen
        name={RouteName.EDIT_PROFILE_SCREEN} component={EditProfileScreen}
        options={{
          headerTitle: (props) => <AppHeader {...props} headerTitle={t("Profile_Text")} />,
          ...styleArray,
          drawerIcon: ({ focused }) => drawerIcon(focused, "account"),
          drawerLabel: ({ focused }) => drawerTitle(focused, t("Profile_Text"))
        }}
      />
      <Drawer.Screen
        name={RouteName.APP_SETTINGS_SCREEN} component={AppSettingsScreen}
        options={{
          headerTitle: (props) => <AppHeader {...props} headerTitle={t("Settings_Text")} />,
          ...styleArray,
          drawerIcon: ({ focused }) => drawerIcon(focused, "cog"),
          drawerLabel: ({ focused }) => drawerTitle(focused, t("Settings_Text"))
        }}
      />
      <Drawer.Screen
        name={RouteName.HELP_SCREEN} component={HelpScreen}
        options={{
          headerTitle: (props) => <AppHeader {...props} headerTitle={t("Help_Text")} />,
          ...styleArray,
          drawerIcon: ({ focused }) => drawerIcon(focused, "help-box"),
          drawerLabel: ({ focused }) => drawerTitle(focused, t("Help_Text"))
        }}
      />
    </Drawer.Navigator>
  );
}
export default SideNavigator;