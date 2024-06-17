import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RouteName from './RouteName';
import {
  SplashScreen, GetstartedSliderscreen,
  AboutSelfScreen, AgeScreen,
  LoginScreen, SignUpScreen, OtpVerifyScreen,
  WorkoutDetailScreen,
  ForgotPasswordScreen,
  TranslationScreen,
} from '../screens';
import { Colors } from '../utils';
import SideNavigator from './SideNavigator';
const Stack = createNativeStackNavigator();
import { useSelector } from "react-redux";
import HomeScreen from '../screens/HomeScreen'; 

const RootNavigator = props => {
  const { colorrdata } = useSelector(state => state.commonReducer) || {};
  const MyTheme = {
    ...DefaultTheme,
    Colors: Colors
  };
  const [colorValue, setColorValue] = useState(MyTheme)

  useEffect(() => {
    if (Colors.length != 0 && colorrdata != "") {
      Colors.theme_backgound_second = colorrdata;
      const MyThemeNew = {
        ...DefaultTheme,
        Colors: Colors
      };
      setColorValue(MyThemeNew)
    }
  }, [colorrdata, Colors])

  return (
    <NavigationContainer theme={colorValue}>
      <Stack.Navigator initialRouteName={RouteName.HOME_SCREEN} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={RouteName.SPLSH_SCREEN} component={SplashScreen} />
        <Stack.Screen name={RouteName.GET_STARTED_SLIDER_SCREEN} component={GetstartedSliderscreen} />
        <Stack.Screen name={RouteName.ABOUT_SELF_SCREEN} component={AboutSelfScreen} />
        <Stack.Screen name={RouteName.AGE_SCREEN} component={AgeScreen} />
        <Stack.Screen name={RouteName.LOGIN_SCREEN} component={LoginScreen} />
        <Stack.Screen name={RouteName.FORGOT_PASSWORD_SCREEN} component={ForgotPasswordScreen} />
        <Stack.Screen name={RouteName.SIGNUP_SCREEN} component={SignUpScreen} />
        <Stack.Screen name={RouteName.OTP_VERYFY_SCREEN} component={OtpVerifyScreen} />
        <Stack.Screen name={RouteName.WORKOUT_DETAIL_SCREEN} component={WorkoutDetailScreen} />
        <Stack.Screen name={RouteName.HOME_SCREEN} component={SideNavigator} />
        <Stack.Screen name={RouteName.TRLANSTION_SCREEN} component={TranslationScreen} />
      </Stack.Navigator>
    </NavigationContainer >
  );
}

export default RootNavigator;
