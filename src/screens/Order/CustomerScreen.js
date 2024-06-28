import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { SHOPIFY_ACCESS_TOKEN, STOREFRONT_ACCESS_TOKEN } from '../../../env';

const OrderListScreen = () => {
  const customer = useSelector(state => state.auth);
  const customerId = customer?.customer?.id?.split('/').pop();
  console.log(customerId, 'customerId--------------------');

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const accessToken = SHOPIFY_ACCESS_TOKEN;
  useEffect(() => {
    if (!customerId) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios({
          url: `https://pw-dawn1.myshopify.com/admin/api/2024-04/orders.json?customer_id=${customerId}`,
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken,
          }
        });
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [customerId]);

  const handleOrderPress = (order) => {
    navigation.navigate('OrderDetailsScreen', { order });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {orders.length === 0 ? (
        <View style={styles.noOrdersContainer}>
          <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.noOrdersImage} />
          <Text style={styles.noOrdersText}>No orders yet</Text>
          <Text style={styles.noOrdersSubText}>Go to the store to place an order.</Text>
        </View>
      ) : (
        orders.map((order) => (
          <TouchableOpacity key={order.id} onPress={() => handleOrderPress(order)} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderStatus}>Confirmed</Text>
              <Text style={styles.orderDate}>Last updated {new Date(order.updated_at).toLocaleDateString()}</Text>
            </View>
            <Image source={{ uri: order.image_url || 'https://via.placeholder.com/150' }} style={styles.orderImage} />
            { console.log(order.image_url,'dfdfdf')}
            <View style={styles.orderDetails}>
              <Text style={styles.orderText}>Order #{order.order_number}</Text>
              <Text style={styles.orderPrice}>₹{order.current_total_price}</Text>
              <TouchableOpacity style={styles.buyAgainButton}>
                <Text style={styles.buyAgainText}>Buy again</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noOrdersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noOrdersImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  noOrdersText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  noOrdersSubText: {
    fontSize: 16,
    color: '#666',
  },
  orderCard: {
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
  orderHeader: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  orderDate: {
    fontSize: 12,
    color: '#999',
  },
  orderImage: {
    width: '100%',
    height: 200,
  },
  orderDetails: {
    padding: 10,
  },
  orderText: {
    fontSize: 16,
    color: '#444',
  },
  orderPrice: {
    fontSize: 18,
    fontWeight: 'bold', 
    color: '#000',
    marginVertical: 5,
  },
  buyAgainButton: {
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    alignItems: 'center',
  },
  buyAgainText: {
    fontSize: 16,
    color: '#333',
  },
});

export default OrderListScreen;
