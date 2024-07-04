import React, { useState, useEffect, useMemo, useRef } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Image, Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
import { Camera, useCameraDevices, useCodeScanner } from 'react-native-vision-camera';
import { Container, BottomTabMenu } from '../../components';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";
import images from '../../index';

const ScanScreen = (props) => {
  const { Colors } = useTheme();
  const { navigation } = props;
  const { t } = useTranslation();
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;
  const cameraRef = useRef(null);

  const styles = useMemo(() =>
    StyleSheet.create({
      backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
      },
      overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      },
      comingSoonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      comingSoonImage: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
      },
      comingSoonText: {
        fontSize: 18,
        color: '#f79f80',
        marginTop: 10,
        textAlign: 'center',
        fontWeight: 'bold'
      },
    }), [Colors]);

  return (
    <Container>
      <ImageBackground source={images.background1} style={styles.backgroundImage}>
        <View style={styles.overlay} />
        <View style={styles.comingSoonContainer}>
          <Image
            source={images.coming_soon}
            style={styles.comingSoonImage}
          />
        </View>
        <BottomTabMenu {...props} selected={2} />
      </ImageBackground>
    </Container>
  );
};

export default ScanScreen;
