import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground,  ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { SHOPIFY_ACCESS_TOKEN } from '../../../env';
import { useTheme } from '@react-navigation/native';
import { Colors, SH, SW } from '../../utils';
import { Container } from '../../components';
import images from '../../images';
import { color } from 'react-native-reanimated';
import { colors } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Noorder from '../../images/noorder.png'
const OrderListScreen = () => {

  const customer = useSelector(state => state.auth);

  console.log(customer,'customerIdcustomerIdcustomerIdcustomerIdcustomerIdcustomerIdcustomerIdcustomerIdcustomerIdcustomerIdcustomerIdcustomerIdcustomerId');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const accessToken = SHOPIFY_ACCESS_TOKEN;
  const { Colors } = useTheme();
  const { t } = useTranslation();
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
  console.log(orders, 'orders-pppppppppppppppppppppppppppppppppppppppp')
  useEffect(() => {
    if (!customerId) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios({
          url: `https://themoonheart.com/admin/api/2024-04/orders.json?customer_id=${customerId}`,
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
    navigation.navigate('OrderDetailsScreen', { orderId: order?.id });
  };

  if (loading) {
    return (
      <Container>
        <ImageBackground source={images.background1} style={styles.backgroundImage}>
          <View style={styles.overlay} />
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        </ImageBackground>
      </Container>
    );
  }

  const renderOrderItem = ({ item: order }) => (
    <TouchableOpacity key={order.id} onPress={() => handleOrderPress(order)} style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderStatus}>Confirmed</Text>
        <Text style={styles.orderDate}>Last updated {new Date(order.updated_at).toLocaleDateString()}</Text>
      </View>
      {/* <Image source={{ uri: order.image_url || 'https://via.placeholder.com/150' }} style={styles.orderImage} /> */}
      <View style={styles.orderDetails}>
        <Text style={styles.orderText}>Order #{order.order_number}</Text>
        <Text style={styles.orderPrice}>{order.currency}{order.current_total_price}</Text>
        <TouchableOpacity style={styles.buyAgainButton} onPress={() => navigation.navigate('ProductListScreen')}>
          <Text style={styles.buyAgainText}>Buy again</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );


  return ( 
    <Container>
    <ImageBackground source={images.background1} style={styles.backgroundImage}>
      <View style={styles.overlay} />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={images.backArrow} style={styles.backArrow} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: Colors.white }]}>{t("All Orders")}</Text>
          </View>
          <FlatList
            data={orders}
            renderItem={renderOrderItem}
            keyExtractor={order => order.id.toString()}
            contentContainerStyle={styles.container}
            ListEmptyComponent={() => (
              <View style={styles.noOrdersContainer}>
                <Image source={Noorder} style={styles.noOrdersImage} />
                <Text style={styles.noOrdersText}>No orders yet</Text>
                <Text style={styles.noOrdersSubText}>Go to the store to place an order.</Text>
              </View>
            )}
          />
        </>
      )}
    </ImageBackground>
  </Container>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.theme_backgound,
    paddingVertical: 10,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  backArrow: {
    width: SH(20),
    height: SH(20),
    marginTop: 3,
    marginRight: SW(10),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: SH(24),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  container: {
    flexGrow: 1,
    padding: 10,
    paddingBottom: 50
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
    width: 200,
    height: 150,
    marginBottom: 20,
    tintColor: Colors.white
  },
  noOrdersText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 10,
  },
  noOrdersSubText: {
    fontSize: 16,
    color: '#666',
  },
  orderCard: {
    marginHorizontal: 15,
    marginVertical: 10,
    backgroundColor: 'rgba(217, 217, 214, 0.2)',

    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'rgba(217, 217, 214, 0.2)',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.white,
  },
  orderDate: {
    fontSize: 12,
    color: Colors.white,
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
    color: Colors.white,
  },
  orderPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
    marginVertical: 5,
  },
  buyAgainButton: {
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: Colors.theme_backgound_second,
    borderRadius: 5,
    alignItems: 'center',
  },
  buyAgainText: {
    fontSize: 16,
    color: Colors.white,
  },
});

export default OrderListScreen;
