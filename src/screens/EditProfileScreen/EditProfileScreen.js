import React, { useState, useMemo, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Authentication } from '../../styles';
import { Container, Spacing, Input, BottomTabMenu } from '../../components';
import images from '../../images';
import { SH, SW } from '../../utils';
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfileScreen = (props) => {
  const { Colors } = useTheme();
  const Authentications = useMemo(() => Authentication(Colors), [Colors]);
  const { navigation } = props;
  const [inputMobile, setInputMobile] = useState('');
  const [inputFirstName, setInputFirstName] = useState('');
  const [inputLastName, setInputLastName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const { t } = useTranslation();
  const [customerDetail, setCustomerDetail] = useState({});
  const [originalCustomerDetail, setOriginalCustomerDetail] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchCustomerDetail = async () => {
      const customer = JSON.parse(await AsyncStorage.getItem('customer'));
      setCustomerDetail(customer);
      setOriginalCustomerDetail(customer);
      setInputFirstName(customer?.firstName || '');
      setInputLastName(customer?.lastName || '');
      setInputMobile(customer?.mobile || '');
      setInputEmail(customer?.email || '');
    };
    fetchCustomerDetail();
  }, []);

  const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    buttonView: {
      paddingHorizontal: SW(20),
      flexDirection: 'column',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      width: '49%',
      alignItems: 'center',
      paddingVertical: 10,
      borderRadius: 5,
      marginBottom: 20,
    },
    buttonText: {
      color: Colors.white,
      fontSize: 16,
      fontWeight: 'bold',
    },
    inputView: {
      paddingHorizontal: SH(10),
      color: Colors.white,
      marginBottom: 20,
    },
    headerText: {
      paddingHorizontal: SH(10),
      color: Colors.theme_backgound,
      marginBottom: 20,
      fontSize: 22,
      textAlign: 'center'
    },
    table: {
      marginBottom: 20,
    },
    tablebg: {
      marginBottom: 20,
      marginHorizontal: 20,
      paddingHorizontal: 20,
      backgroundColor: 'rgba(217, 217, 214, 0.2)',
      borderRadius: 10
    },
    tableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: Colors.gray,
    },
    tableCell: {
      color: Colors.white,
      fontSize: 16,
    },
    tableCell2: {
      color: Colors.white,
      fontSize: 16,
      fontWeight: 'bold'
    },
    editButton: {
      alignSelf: 'center',
      marginVertical: 10,
      paddingHorizontal: 50,
      paddingVertical: 10,
      backgroundColor: Colors.theme_backgound,
      borderRadius: 5
    },
    inputField: {
      marginBottom: -10,
    }
  });

  const updateProfile = async () => {
    try {
      const payload = {
        firstName: inputFirstName,
        lastName: inputLastName,
        mobile: inputMobile,
        email: inputEmail,
      };
      console.log('Updating profile with:', payload);
      await AsyncStorage.setItem('customer', JSON.stringify(payload));
      setCustomerDetail(payload);
      setOriginalCustomerDetail(payload);
      setIsEditing(false); 
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile.');
    }
  };

  const validateAndUpdate = () => {
    if (!inputFirstName.trim()) {
      alert("First Name is required");
      return;
    }
    if (!inputLastName.trim()) {
      alert("Last Name is required");
      return;
    }
    if (!inputMobile.match(/^\d{10}$/)) {
      alert("Enter a valid 10-digit mobile number");
      return;
    }
    if (!inputEmail.match(/^\S+@\S+\.\S+$/)) {
      alert("Enter a valid email address");
      return;
    }
    updateProfile();
  };

  const cancelEdit = () => {
    setInputFirstName(originalCustomerDetail.firstName);
    setInputLastName(originalCustomerDetail.lastName);
    setInputMobile(originalCustomerDetail.mobile);
    setInputEmail(originalCustomerDetail.email);
    setIsEditing(false);
  };

  return (
    <Container>
      <ImageBackground source={images.background1} resizeMode='cover' style={styles.backgroundImage}>
        <View style={styles.overlay} />
        <BottomTabMenu {...props} selected={4} />
        <ScrollView>
          <View style={Authentications.setbgMainViewtwo}>
            <Spacing space={SH(20)} />
            <Text style={styles.headerText}>Update your profile details</Text>

            {isEditing ? (
              <View style={styles.inputView}>
                <Input
                  title={t("First Name")}
                  placeholder={t("First Name")}
                  onChangeText={setInputFirstName}
                  value={inputFirstName}
                  autoCompleteType="tel"
                  style={styles.inputField}
                />
                <Input
                  title={t("Last Name")}
                  placeholder={t("Last Name")}
                  onChangeText={setInputLastName}
                  value={inputLastName}
                  autoCompleteType="tel"
                  style={styles.inputField}
                />
                <Input
                  title={t("Mobile_Number")}
                  placeholder={t("Mobile_Number")}
                  onChangeText={setInputMobile}
                  value={inputMobile}
                  inputType='numeric'
                  maxLength={10}
                  autoCompleteType="tel"
                  style={styles.inputField}
                />
                <Input
                  title={t("Enter_Email")}
                  placeholder={t("Enter_Email")}
                  onChangeText={setInputEmail}
                  value={inputEmail}
                  autoCompleteType="tel"
                  style={styles.inputField}
                />
              </View>
            ) : (
              <View style={styles.tablebg}>
                <View style={styles.table}>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>First Name:</Text>
                    <Text style={styles.tableCell}>{customerDetail.firstName}</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Last Name:</Text>
                    <Text style={styles.tableCell}>{customerDetail.lastName}</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Mobile:</Text>
                    <Text style={styles.tableCell}>{customerDetail.mobile}</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Email:</Text>
                    <Text style={styles.tableCell}>{customerDetail.email}</Text>
                  </View>
                </View>
              </View>
            )}

            {isEditing ? (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: SW(30) }}>
                <TouchableOpacity style={[styles.button, { backgroundColor: Colors.theme_backgound }]} onPress={validateAndUpdate}>
                  <Text style={styles.buttonText}>{t("Update_Text")}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={cancelEdit}>
                  <Text style={styles.buttonText}>{t("Cancel")}</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={[styles.editButton]}
                onPress={() => setIsEditing(true)}
              >
                <Text style={styles.tableCell2}>Edit Details</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.editButton]}
              onPress={() => navigation.navigate('')}
            >
              <Text style={styles.buttonText}>{t("View Orders")}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </Container>
  );
};

export default EditProfileScreen;
