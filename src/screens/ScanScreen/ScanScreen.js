import React, { useState, useEffect, useMemo, useRef } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { HomeStyle } from '../../styles';
import { Container, BottomTabMenu } from '../../components';
import { RouteName } from '../../routes';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";
import images from '../../index';

const ScanScreen = (props) => {
  const { Colors } = useTheme();
  const HomeStyles = useMemo(() => HomeStyle(Colors), [Colors]);
  const { navigation } = props;
  const { t } = useTranslation();
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') {
        const status = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
        console.log('Initial permission status:', status ? 'authorized' : 'denied');
        setHasPermission(status);
      } else {
        const status = await Camera.getCameraPermissionStatus();
        console.log('Initial permission status:', status);
        setHasPermission(status === 'authorized');
      }
    })();
  }, []);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "This app needs access to your camera to scan barcodes",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      console.log('Permission status after request:', granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setHasPermission(true);
      } else {
        Alert.alert(
          'Permission Denied',
          'Camera permission is required to scan barcodes. Please enable it in the app settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
          ],
        );
      }
    } else {
      const status = await Camera.requestCameraPermission();
      console.log('Permission status after request:', status);
      if (status === 'authorized' || status === 'limited') {
        setHasPermission(true);
      } else {
        Alert.alert(
          'Permission Denied',
          'Camera permission is required to scan barcodes. Please enable it in the app settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
          ],
        );
      }
    }
  };

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
      cameraContainer: {
        width: '100%',
        height: 500, 
        justifyContent: 'center',
        alignItems: 'center',
      },
      camera: {
        width: '90%',
        height: '90%', 
        borderRadius: 10,
        overflow: 'hidden',
        borderColor: '#fff',
        borderWidth: 2
      },
      capture: {
        flex: 0,
        backgroundColor: '#f79f80',
        borderRadius: 5,
        color: '#794619',
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
      },
      permissionButton: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
      },
      permissionButtonText: {
        fontSize: 16,
        color: '#794619',
      },
    }), [Colors]);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePhoto({
        qualityPrioritization: 'speed',
      });
      console.log("Photo path:------", photo.path);
    }
  };

  return (
    <Container>
      <ImageBackground source={images.background1} style={styles.backgroundImage}>
        <View style={styles.overlay} />
        {!hasPermission ? (
          <TouchableOpacity onPress={requestCameraPermission} style={styles.permissionButton}>
            <Text style={styles.permissionButtonText}>Request Camera Permission</Text>
          </TouchableOpacity>
        ) : (
          device != null && (
            <View style={styles.cameraContainer}>
              <Camera
                style={styles.camera}
                device={device}
                isActive={true}
                photo={true}
                ref={cameraRef}
              >
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                </View>
              </Camera>
            </View>
          )
        )}
        <TouchableOpacity onPress={takePicture} style={styles.capture}>
          <Text style={{ fontSize: 18, color: '#794619', fontWeight: 'bold', paddingHorizontal: 50 }}> Scan </Text>
        </TouchableOpacity>
        <BottomTabMenu {...props} selected={2} />
      </ImageBackground>
    </Container>
  );
};

export default ScanScreen;
