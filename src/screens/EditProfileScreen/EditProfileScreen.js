import React, { useState, useMemo, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Authentication } from '../../styles';
import { Container, Spacing, Input, BottomTabMenu } from '../../components';
import images from '../../images';
import { SH, SW } from '../../utils';
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { STOREFRONT_ACCESS_TOKEN, SHOPIFY_ACCESS_TOKEN } from '../../../env';
import CountryPicker from 'react-native-country-picker-modal';
import { useSelector } from 'react-redux';
import { RouteName } from '../../routes';

const EditProfileScreen = (props) => {
  const { Colors } = useTheme();
  const Authentications = useMemo(() => Authentication(Colors), [Colors]);
  const { navigation } = props;
  const [inputMobile, setInputMobile] = useState('');
  const [inputFirstName, setInputFirstName] = useState('');
  const [inputLastName, setInputLastName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+1'); // Default country code
  const [country, setCountry] = useState(null);
  const [isCountryPickerVisible, setIsCountryPickerVisible] = useState(false);
  const { t } = useTranslation();
  const [originalCustomerDetail, setOriginalCustomerDetail] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [apiCustomerDetail, setApiCustomerDetail] = useState({});
  const customer = useSelector(state => state.auth);
  const storefrontToken = STOREFRONT_ACCESS_TOKEN;
  const storeToken = SHOPIFY_ACCESS_TOKEN;

  const [customerDetail, setCustomerDetail] = useState(null);
  const [customerId, setCustomerId] = useState('');

  useEffect(() => {
    const fetchCustomerDetail = async () => {
      try {
        const customerData = await AsyncStorage.getItem('customer');
        if (customerData) {
          const parsedData = JSON.parse(customerData);
          setCustomerDetail(parsedData);
          const id = parsedData.id;
          const extractedId = id.match(/\d+/)[0];
          setCustomerId(extractedId);
        }
      } catch (error) {
        console.error('Error fetching customer detail:', error);
      }
    };

    fetchCustomerDetail();
  }, []);

  useEffect(() => {
    if (customerId) {
      fetchApiCustomerDetail();
    }
  }, [customerId]);

  const fetchApiCustomerDetail = async () => {
    try {
      const response = await axios.get(`https://themoonheart.com/admin/customers/${customerId}.json`, {
        headers: {
          'X-Shopify-Access-Token': storeToken
        }
      });
      const customerData = response.data.customer;
      setApiCustomerDetail(customerData);

      // Extract country code and mobile number
      const phone = customerData.phone || '';
      const phoneMatch = phone.match(/^(\+\d{1,3})(\d{10})$/);
      if (phoneMatch) {
        setCountryCode(phoneMatch[1]);
        setInputMobile(phoneMatch[2]);
      } else {
        setCountryCode('+91'); // default country code
        setInputMobile(phone.replace(/\D/g, ''));
      }

      setInputFirstName(customerData.first_name || '');
      setInputLastName(customerData.last_name || '');
      setInputEmail(customerData.email || '');
    } catch (error) {
      console.error('Failed to fetch customer detail from API:', error);
    }
  };

  const updateProfile = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('authToken');
      if (!accessToken) {
        alert('Authentication token not found');
        return;
      }
  
      const payload = {
        customerAccessToken: accessToken,
        email: inputEmail,
        firstName: inputFirstName,
        lastName: inputLastName,
        phone: `${countryCode}${inputMobile}`,
        acceptsMarketing: false,
      };
  
      const graphqlQuery = {
        query: `
          mutation UpdateCustomerInfo(
            $customerAccessToken: String!,
            $email: String,
            $firstName: String,
            $lastName: String,
            $phone: String,
            $acceptsMarketing: Boolean
          ) {
            customerUpdate(
              customerAccessToken: $customerAccessToken,
              customer: {
                email: $email,
                firstName: $firstName,
                lastName: $lastName,
                phone:  $phone,
                acceptsMarketing: $acceptsMarketing
              }
            ) {
              customer {
                id
              }
              customerUserErrors {
                code
                message
              }
              userErrors {
                message
              }
            }
          }
        `,
        variables: payload,
      };
  
      const response = await axios({
        url: 'https://themoonheart.com/api/2024-04/graphql.json',
        method: 'post',
        headers: {
          'X-Shopify-Storefront-Access-Token': storefrontToken,
          'Content-Type': 'application/json',
        },
        data: graphqlQuery,
      });
  
      console.log('Response:', response);
  
      const data = response.data;
      if (!data || !data.data || !data.data.customerUpdate) {
        throw new Error('Unexpected response structure');
      }
  
      const errors = data.data.customerUpdate.customerUserErrors;
      if (errors.length) {
        const errorMessage = errors.map(err => err.message).join(", ");
        alert(errorMessage);
        return;
      }
  
      const updatedCustomer = data.data.customerUpdate.customer;
      await AsyncStorage.setItem('customer', JSON.stringify(updatedCustomer));
      setCustomerDetail(updatedCustomer);
      setOriginalCustomerDetail(updatedCustomer);
  
      // Update state variables with the new details
      setInputFirstName(updatedCustomer.firstName || '');
      setInputLastName(updatedCustomer.lastName || '');
      setInputMobile(updatedCustomer.phone?.replace(/\D/g, '') || '');
      setInputEmail(updatedCustomer.email || '');
      setCountryCode(updatedCustomer.countryCode || '+91');
  
      setIsEditing(false);
      alert('Profile updated successfully!');
  
      // Fetch customer data again after saving changes
      fetchApiCustomerDetail();
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
    setInputFirstName(originalCustomerDetail.first_name);
    setInputLastName(originalCustomerDetail.last_name);
    
    const phone = originalCustomerDetail.phone || '';
    const phoneMatch = phone.match(/^(\+\d{1,3})(\d{10})$/);
    if (phoneMatch) {
      setCountryCode(phoneMatch[1]);
      setInputMobile(phoneMatch[2]);
      fetchApiCustomerDetail();
    } else {
      setCountryCode('+91'); 
      setInputMobile(phone.replace(/\D/g, ''));
    }

    setInputEmail(originalCustomerDetail.email);
    fetchApiCustomerDetail();
    setIsEditing(false);
  };

  console.log("inputMobile:_______",inputMobile)
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
      width: '48%',
      alignItems: 'center',
      paddingVertical: 10,
      borderRadius: 6,
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
      width: '100%',
      marginBottom: 0,
      maxWidth: 400,
    },
    headerText: {
      paddingHorizontal: SH(10),
      color: Colors.theme_backgound,
      marginBottom: 20,
      fontSize: 22,
      textAlign: 'center',
    },
    table: {
      marginBottom: 20,
    },
    tablebg: {
      marginBottom: 20,
      marginHorizontal: 20,
      paddingHorizontal: 20,
      backgroundColor: 'rgba(217, 217, 214, 0.2)',
      borderRadius: 10,
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
      fontWeight: 'bold',
    },
    cancelButton: {
      width: '48%',
      alignItems: 'center',
      paddingVertical: 10,
      borderRadius: 6,
      backgroundColor: Colors.red,
      marginBottom: 20,
    },
    editButton: {
      width: '48%',
      alignItems: 'center',
      paddingVertical: 10,
      borderRadius: 6,
      backgroundColor: Colors.theme_backgound,
      marginBottom: 20,
    },
    inputField: {
      borderRadius: 10,
      borderColor: Colors.gray,
      borderWidth: 1,
      paddingHorizontal: 15,
      paddingVertical: 10,
      width: '100%',
      maxWidth: '100%',
      color: Colors.white,
    },
    phoneInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      maxWidth: 277,

    },
    phoneLabel: {
      marginLeft: 20,
      color: Colors.white,
      fontSize: 16,
    },

    countryCodeButton: {
      marginVertical: 0,
      marginLeft: 14,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderRadius: 6,
      backgroundColor: Colors.theme_backgound,
    },
    countryCodeText: {
      fontSize: 16,
    },
    phoneInput: {
      flex: 1,
      marginLeft: 10,
      paddingVertical: 10,
      marginBottom: 0,
      borderRadius: 6,
      borderColor: Colors.gray,
      borderWidth: 1,
      color: Colors.white,
    },
  });

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
                  autoCompleteType="name"
                  style={styles.inputField}
                />
                <Input
                  title={t("Last Name")}
                  placeholder={t("Last Name")}
                  onChangeText={setInputLastName}
                  value={inputLastName}
                  autoCompleteType="name"
                  style={styles.inputField}
                />
                <View style={styles.phoneInputContainer}>
                  <TouchableOpacity
                    style={styles.countryCodeButton}
                    onPress={() => setIsCountryPickerVisible(true)}
                  >
                    <Text style={styles.countryCodeText}>{countryCode}</Text>
                  </TouchableOpacity>
                  <Input
                    title={t("Mobile Number")}
                    placeholder={t("Mobile Number")}
                    onChangeText={setInputMobile}
                    value={inputMobile}
                    inputType='numeric'
                    maxLength={10}
                    autoCompleteType="tel"
                    style={styles.phoneInput}
                  />
                </View>
                <CountryPicker
                  withCallingCode
                  withFilter
                  withFlag
                  withCountryNameButton
                  withAlphaFilter
                  withCurrencyButton={false}
                  onSelect={country => {
                    setCountryCode('+' + country.callingCode[0]);
                    setCountry(country);
                    setIsCountryPickerVisible(false);
                  }}
                  visible={isCountryPickerVisible}
                  onClose={() => setIsCountryPickerVisible(false)}
                  style={styles.countryCodeTextcount}
                />
                <Input
                  title={t("Email")}
                  placeholder={t("Email")}
                  onChangeText={setInputEmail}
                  value={inputEmail}
                  keyboardType="email-address"
                  autoCompleteType="email"
                  style={styles.inputField}
                />
              </View>
            ) : (
              <View style={styles.table}>
                <View style={styles.tablebg}>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell2}>First Name:</Text>
                    <Text style={styles.tableCell}>{inputFirstName || '-'}</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell2}>Last Name:</Text>
                    <Text style={styles.tableCell}>{inputLastName || '-'}</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell2}>Mobile Number:</Text>
                    <Text style={styles.tableCell}>{`${countryCode}${inputMobile || '-'}`}</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell2}>Email:</Text>
                    <Text style={styles.tableCell}>{inputEmail || '-'}</Text>
                  </View>
                </View>
              </View>
            )}

            <Spacing space={SH(20)} />
            <View style={styles.buttonView}>
              {isEditing ? (
                <View style={{ flex: 1, flexDirection: 'row', gap: 4 }}>
                  <TouchableOpacity style={[styles.editButton, { marginRight: 8 }]} onPress={validateAndUpdate}>
                    <Text style={styles.buttonText}>Save Changes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cancelButton} onPress={cancelEdit}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={{ flex: 1, flexDirection: 'row', gap: 4 }}>
                  <TouchableOpacity style={[styles.editButton, { marginRight: 8 }]} onPress={() => setIsEditing(true)}>
                    <Text style={styles.buttonText}>Edit Profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate(RouteName.CUSTOMER_SCREEN)}>
                    <Text style={styles.buttonText}>View Orders</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </Container>
  );
};

export default EditProfileScreen;
