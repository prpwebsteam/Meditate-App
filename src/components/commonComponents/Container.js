import { SafeAreaView, StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
import propTypes from 'prop-types';
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
function ContainerComponent({
  children,
  fullScreen,
  statusBarPropStyle,
  containerPropStyle,
}) {
  const { Colors } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        statusBarStyle: {
          flex: 0,
          backgroundColor: Colors.transpharent,
        },
        containerStyle: {
          flex: 1,
          backgroundColor: Colors.transpharent,
        },
        linearGradient: {
          flex: 1
        },
      }),
    [Colors],
  );
  return fullScreen ? (
    <View style={[styles.containerStyle, { ...containerPropStyle }]}>
      {children}
    </View>
  ) : (
    <View style={[styles.containerStyle, { ...containerPropStyle }]}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[Colors.theme_linear_gradient_1, Colors.theme_linear_gradient_2, Colors.theme_linear_gradient_3, Colors.theme_linear_gradient_4, Colors.theme_linear_gradient_2, Colors.theme_linear_gradient_4, Colors.theme_linear_gradient_2]}
        style={styles.linearGradient}>
        <SafeAreaView
          style={[
            styles.statusBarStyle,
            { statusBarPropStyle },
          ]}
        />
        <SafeAreaView style={[styles.containerStyle, { ...containerPropStyle }]}>
          {children}
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

ContainerComponent.defaultProps = {
  fullScreen: false,
  statusBarPropStyle: {},
  containerPropStyle: {},
};

ContainerComponent.propTypes = {
  fullScreen: propTypes.bool,
  statusBarPropStyle: propTypes.shape({}),
  containerPropStyle: propTypes.shape({}),
};

export default ContainerComponent;
