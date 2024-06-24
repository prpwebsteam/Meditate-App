import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { fetchCheckout } from '../../services/checkoutService';

const CheckoutScreen = ({ route, navigation }) => {
  const { cart, quantities, checkoutId } = route.params || {};
  const [checkout, setCheckout] = useState(null);

  useEffect(() => {
    const loadCheckout = async () => {
      const checkoutData = await fetchCheckout(checkoutId);
      setCheckout(checkoutData);
    };

    loadCheckout();
  }, [checkoutId]);

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.productImage }} style={styles.itemImage} resizeMode="center" />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.productTitle}</Text>
        <Text style={styles.itemVariant}>{item.title}</Text>
        <Text style={styles.itemPrice}>
          Price: {item.priceV2.amount} {item.priceV2.currencyCode}
        </Text>
        <Text style={styles.itemQuantity}>Quantity: {quantities[index]}</Text>
        <Text style={styles.itemTotal}>
          Total: {(item.priceV2.amount * quantities[index]).toFixed(2)} {item.priceV2.currencyCode}
        </Text>
      </View>
    </View>
  );

  const calculateTotal = () => {
    return cart.reduce(
      (acc, item, index) => acc + item.priceV2.amount * quantities[index],
      0
    ).toFixed(2);
  };

  const handleCheckout = () => {
    if (checkout && checkout.webUrl) {
      navigation.navigate('WebViewScreen', { url: checkout.webUrl });
    } else {
      console.error('Checkout URL is missing');

    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Total: {calculateTotal()} {cart[0]?.priceV2.currencyCode}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonContainerbtn}
          title="Checkout"
          onPress={handleCheckout}

        >
          <Text style={styles.CheckoutBTNTEXT}>
            Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  buttonContainerbtn: {
    height: 40,
    color: '#fff',
    textAlign: 'center'
  },
  CheckoutBTNTEXT: {
    color: '#fff',
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
    marginTop: 40,
  },
  itemImage: {
    width: 100,
    height: '100%',
    borderRadius: 8,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
    color: '#000'
  },
  itemTitle: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemVariant: {
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
  },
  itemQuantity: {
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
  },
  itemTotal: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  totalContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  totalText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 0,
    padding: 10,
    backgroundColor: '#6200ee',
    borderRadius: 8,
  },
});

export default CheckoutScreen;

