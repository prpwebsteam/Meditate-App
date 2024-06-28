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
import { useSelector } from "react-redux";
import { ProductDetailsScreen } from '../screens/ProductDetailsScreen';
import { CheckoutScreen } from '../screens/CheckoutScreen';
import { WebViewScreen } from '../screens/WebViewScreen';
import { CartScreen } from '../screens/CartScreen';
import HomeScreen from '../screens/HomeScreen';
import { SoundProvider } from '../utils/SoundContext';
import ResetPasswordScreen from '../screens/Authantication/ResetPasswordScreen/ResetPasswordScreen';
import AboutUsScreen from '../screens/AboutUsScreen/AboutUsScreen';
import Wishlist from '../screens/WishlistScreen/Wishlist';
import { ToggleProvider } from '../utils/ToggleContext';
import AllCategoryScreen from '../screens/AllCategoryScreen/AllCategoryScreen';
import QuizScreen from '../screens/QuizScreen/QuizScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const SplashScreenNavigator = ({ navigation }) => {
  useEffect(() => {
    const checkAuthToken = async () => {
      const token = await AsyncStorage.getItem('authToken');
      setTimeout(() => {
        if (token) {
          navigation?.replace(RouteName.HOME_SCREEN);
        } else {
          navigation?.replace(RouteName.SIGNUP_SCREEN);
        }
      }, 3000);
    };

    checkAuthToken();
  }, [navigation]);

  return <SplashScreen />;
};

const RootNavigator = () => {
  const { colorrdata } = useSelector(state => state.commonReducer) || {};
  const MyTheme = {
    ...DefaultTheme,
    Colors: Colors
  };
  const [colorValue, setColorValue] = useState(MyTheme);

  useEffect(() => {
    if (Colors.length !== 0 && colorrdata !== "") {
      Colors.theme_backgound_second = colorrdata;
      const MyThemeNew = {
        ...DefaultTheme,
        Colors: Colors
      };
      setColorValue(MyThemeNew);
    }
  }, [colorrdata, Colors]);

  return (
    <ToggleProvider>
      <SoundProvider>
        <NavigationContainer theme={colorValue}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={RouteName.SPLSH_SCREEN} component={SplashScreenNavigator} />
            <Stack.Screen name={RouteName.GET_STARTED_SLIDER_SCREEN} component={GetstartedSliderscreen} />
            <Stack.Screen name={RouteName.ABOUT_SELF_SCREEN} component={AboutSelfScreen} />
            <Stack.Screen name={RouteName.AGE_SCREEN} component={AgeScreen} />
            <Stack.Screen name={RouteName.LOGIN_SCREEN} component={LoginScreen} />
            <Stack.Screen name={RouteName.RESET_PASSWORD_SCREEN} component={ResetPasswordScreen} />
            <Stack.Screen name={RouteName.FORGOT_PASSWORD_SCREEN} component={ForgotPasswordScreen} />
            <Stack.Screen name={RouteName.SIGNUP_SCREEN} component={SignUpScreen} />
            <Stack.Screen name={RouteName.OTP_VERYFY_SCREEN} component={OtpVerifyScreen} />
            <Stack.Screen name={RouteName.WORKOUT_DETAIL_SCREEN} component={WorkoutDetailScreen} />
            <Stack.Screen name={RouteName.HOME_SCREEN} component={SideNavigator} />
            <Stack.Screen name={RouteName.TRLANSTION_SCREEN} component={TranslationScreen} />
            <Stack.Screen name={RouteName.ABOUT_US_SCREEN} component={AboutUsScreen} />
            <Stack.Screen name={RouteName.WISHLIST_SCREEN} component={Wishlist} />
            <Stack.Screen name={RouteName.ALL_CATEGORY_SCREEN} component={AllCategoryScreen} />
            <Stack.Screen name={RouteName.QUIZ_SCREEN} component={QuizScreen} />
            <Stack.Screen name={RouteName.PRODUCTDETAILS_SCREEN} component={ProductDetailsScreen} />
            <Stack.Screen name={RouteName.CHECKOUT_SCREEN} component={CheckoutScreen} />
            <Stack.Screen name={RouteName.WEBVIEW_SCREEN} component={WebViewScreen} />
            <Stack.Screen name={RouteName.CART_SCREEN} component={CartScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SoundProvider>
    </ToggleProvider>
  );
};

export default RootNavigator;
