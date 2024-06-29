import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity,ImageBackground, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { SHOPIFY_ACCESS_TOKEN } from '../../../env';
import { useTheme } from '@react-navigation/native';
import { Colors } from '../../utils';
import { Container } from '../../components';
import images from '../../images';
import { color } from 'react-native-reanimated';
import { colors } from 'react-native-elements';
const OrderListScreen = () => {
  const customer = useSelector(state => state.auth);
  const customerId = customer?.customer?.id?.split('/').pop();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const accessToken = SHOPIFY_ACCESS_TOKEN;
  const { Colors } = useTheme();
  console.log(orders,'orders-pppppppppppppppppppppppppppppppppppppppp')
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
    navigation.navigate('OrderDetailsScreen', { orderId: order.id });
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
      <Image source={{ uri: order.image_url || 'https://via.placeholder.com/150' }} style={styles.orderImage} />
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
    <FlatList
      data={orders}
      renderItem={renderOrderItem}
      keyExtractor={order => order.id.toString()}
      contentContainerStyle={styles.container}
      ListEmptyComponent={() => (
        <View style={styles.noOrdersContainer}>
          <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.noOrdersImage} />
          <Text style={styles.noOrdersText}>No orders yet</Text>
          <Text style={styles.noOrdersSubText}>Go to the store to place an order.</Text>
        </View>

      )}
    />
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  container: {
    flexGrow: 1,
    padding: 10,

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
    borderBottomColor:  Colors.border,
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
