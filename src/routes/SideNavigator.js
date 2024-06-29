import React from 'react';
import { RouteName } from '../routes';
import {
  HomeScreen, EditProfileScreen, AppSettingsScreen, HelpScreen, YogaScreen, CategoryScreen, ProductListScreen, MeditationScreen
} from '../screens';
import { AppHeader, ColorPicker } from '../components';
import { Colors, Fonts, SF } from '../utils';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Text } from 'react-native';
import VectorIcon from '../components/commonComponents/VectoreIcons';
import { useTranslation } from "react-i18next";
import { useToggle } from '../utils/ToggleContext';
import ScanScreen from '../screens/ScanScreen/ScanScreen';
import JournalScreen from '../screens/JournalScreen/JournalScreen';
import OrderListScreen from '../screens/Order/CustomerScreen';

const SideNavigator = () => {
  const { t } = useTranslation();
  const Drawer = createDrawerNavigator();
  const { isEnabled } = useToggle(); 
  const styleArray = {
    headerTintColor: Colors.active_color,
    headerStyle: {
      backgroundColor: Colors.theme_backgound_second,
    },
    headerShown: true,
    headerRight: (props) => isEnabled && <ColorPicker {...props} />,
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
        color={focused ? Colors.active_color : Colors.theme_backgound_second}
      />
    )
  }

  const drawerTitle = (focused, title) => {
    return (
      <Text style={{ color: focused ? Colors.active_color : Colors.theme_backgound, fontSize: SF(18), fontFamily: Fonts.RobotoCondensed_Regular }}>{title}</Text>
    )
  }

  return (
    <Drawer.Navigator screenOptions={{
      headerShown: false,
      drawerStyle: {
        backgroundColor: '#141414',
      }
    }} >
      <Drawer.Screen
        name={RouteName.HOME_SCREEN} component={HomeScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <AppHeader {...props} navigation={navigation} headerTitle={t("Home_Text")} />,
          ...styleArray,
          drawerIcon: ({ focused }) => drawerIcon(focused, "home"),
          drawerLabel: ({ focused }) => drawerTitle(focused, t("Home_Text"))
        })}
      />
      <Drawer.Screen
        name={RouteName.MEDITATION_SCREEN} component={MeditationScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <AppHeader {...props} navigation={navigation} headerTitle={t("Meditation_Text")} />,
          ...styleArray,
          drawerIcon: ({ focused }) => drawerIcon(focused, "meditation"),
          drawerLabel: ({ focused }) => drawerTitle(focused, t("Meditation_Text"))
        })}
      />
      <Drawer.Screen
        name={RouteName.YOGA_SCREEN} component={ScanScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <AppHeader {...props} navigation={navigation} headerTitle={t("Yoga_Text")} />,
          ...styleArray,
          drawerIcon: ({ focused }) => drawerIcon(focused, "qrcode-scan"),
          drawerLabel: ({ focused }) => drawerTitle(focused, t("Yoga_Text"))
        })}
      />
      <Drawer.Screen
        name={RouteName.PRODUCTLIST_SCREEN} component={ProductListScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <AppHeader {...props} navigation={navigation} headerTitle={t("Category_Text")} />,
          ...styleArray,
          drawerIcon: ({ focused }) => drawerIcon(focused, "shopping"),
          drawerLabel: ({ focused }) => drawerTitle(focused, t("Category_Text"))
        })}
      />
      <Drawer.Screen
        name={RouteName.EDIT_PROFILE_SCREEN} component={EditProfileScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <AppHeader {...props} navigation={navigation} headerTitle={t("Profile_Text")} />,
          ...styleArray,
          drawerIcon: ({ focused }) => drawerIcon(focused, "account"),
          drawerLabel: ({ focused }) => drawerTitle(focused, t("Profile_Text"))
        })}
      />
      <Drawer.Screen
        name={RouteName.APP_SETTINGS_SCREEN} component={AppSettingsScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <AppHeader {...props} navigation={navigation} headerTitle={t("Settings_Text")} />,
          ...styleArray,
          drawerIcon: ({ focused }) => drawerIcon(focused, "cog"),
          drawerLabel: ({ focused }) => drawerTitle(focused, t("Settings_Text"))
        })}
      />
      <Drawer.Screen
        name={RouteName.JOURNAL_SCREEN} component={JournalScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <AppHeader {...props} navigation={navigation} headerTitle={t("Journal")} />,
          ...styleArray,
          drawerIcon: ({ focused }) => drawerIcon(focused, "notebook"),
          drawerLabel: ({ focused }) => drawerTitle(focused, t("Journal"))
        })}
      />
      <Drawer.Screen
        name={RouteName.CUSTOMER_SCREEN} component={OrderListScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <AppHeader {...props} navigation={navigation} headerTitle={t("Help_Text")} />,
          ...styleArray,
          drawerIcon: ({ focused }) => drawerIcon(focused, "email"),
          drawerLabel: ({ focused }) => drawerTitle(focused, t("Help_Text"))
        })}
      />
    </Drawer.Navigator> 
  );
}
export default SideNavigator;