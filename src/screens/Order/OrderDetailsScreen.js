import React, { useEffect, useState ,useSelector} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { SHOPIFY_ACCESS_TOKEN, STOREFRONT_ACCESS_TOKEN } from '../../../env';

const OrderDetailsScreen = ({ route }) => {
  const [order, setOrder] = useState({
    id: 1020,
    date: 'June 26, 2024',
    contactName: 'Punit Pareek',
    contactEmail: 'vadin63585@luravel.com',
    shippingName: 'Punit Pareek',
    shippingAddress: 'Jaipur International Airport (JAI), Airport Road, Sanganer, 302029 Jaipur Rajasthan, India',
    shippingMethod: 'Standard',
    billingAddress: 'Jaipur International Airport (JAI), Airport Road, Sanganer, 302029 Jaipur Rajasthan, India'
  });
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const customer = useSelector(state => state.auth);
  const customerId = customer?.customer?.id?.split('/').pop();
  console.log(customerId, 'customerId--------------------');

  const accessToken = SHOPIFY_ACCESS_TOKEN;
  useEffect(() => {
    if (!customerId) {
      setLoading(false);
      return;
    }

    const fetchAddresses = async () => {
      try {
        const response = await axios({
          url: `https://pw-dawn1.myshopify.com/admin/api/2024-04/customers/${customerId}/addresses.json`,
          method: 'get',
          headers: { 
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken,
          }
        });
        setAddresses(response.data.addresses);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [customerId]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Order #{order.id}</Text>
        <Text style={styles.status}>Confirmed {order.date}</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Buy again</Text>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order details</Text>
        <Text style={styles.infoText}>Contact information</Text>
        <Text style={styles.detailText}>{order.contactName}</Text>
        <Text style={styles.detailText}>{order.contactEmail}</Text>

        <Text style={styles.infoText}>Shipping address</Text>
        <Text style={styles.detailText}>{order.shippingName}</Text>
        <Text style={styles.detailText}>{order.shippingAddress}</Text>

        <Text style={styles.infoText}>Shipping method</Text>
        <Text style={styles.detailText}>{order.shippingMethod}</Text>

        <Text style={styles.infoText}>Billing address</Text>
        <Text style={styles.detailText}>{order.billingAddress}</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Addresses</Text>
          {addresses.map((address, index) => (
            <View key={index} style={styles.addressContainer}>
              <Text style={styles.detailText}>{address.name}</Text>
              <Text style={styles.detailText}>{address.address1}</Text>
              <Text style={styles.detailText}>{address.city}, {address.province} {address.zip}</Text>
              <Text style={styles.detailText}>{address.country}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  status: {
    color: '#666',
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
  },
  detailText: {
    fontSize: 16,
    color: '#444',
  },
  addressContainer: {
    marginBottom: 10,
  },
});

export default OrderDetailsScreen;
