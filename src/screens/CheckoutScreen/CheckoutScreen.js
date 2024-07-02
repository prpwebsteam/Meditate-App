import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Image, TouchableOpacity,ImageBackground } from 'react-native';
import { fetchCheckout } from '../../services/checkoutService';
import { BottomTabMenu, Container } from '../../components';
import images from '../../images';
import { useTheme } from '@react-navigation/native';
import { Colors } from '../../utils';
const CheckoutScreen = ({ route, navigation }) => {
  const { cart, quantities, checkoutId } = route.params || {};
  const [checkout, setCheckout] = useState(null);
  const { Colors } = useTheme();
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
        <Text style={styles.itemTitle} numberOfLines={2} ellipsizeMode='tail'>{item.productTitle}</Text>
        <Text style={styles.itemVariant}>{item.title}</Text>
        <Text style={styles.itemPrice}>
          Price: {item.priceV2.currencyCode} {item.priceV2.amount} 
        </Text>
        <Text style={styles.itemQuantity}>Quantity: {quantities[index]}</Text>
        <Text style={styles.itemTotal}>
          Total: {item.priceV2.currencyCode} {(item.priceV2.amount * quantities[index]).toFixed(2)} 
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
    if (checkout && checkout?.webUrl) {
      navigation.navigate('WebViewScreen', { url: checkout?.webUrl });
    } else {
      console.error('Checkout URL is missing');

    }
  };

  return (
    <Container>
    <ImageBackground source={images.background1} style={styles.backgroundImage}>
      <View style={styles.overlay} />
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Total: {cart[0]?.priceV2.currencyCode} {calculateTotal()} 
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
    flex: 1,
    padding: 16,
    justifyContent:'space-between',
  },
  buttonContainerbtn: {
    height: 40,
    color: '#fff',
    textAlign: 'center'
  },
  CheckoutBTNTEXT: {
    color: '#fff',
    marginTop: 5,
    fontWeight: '500',
    fontSize: 20,
    textAlign: 'center'
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'rgba(217, 217, 214, 0.2)',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
    marginTop: 10,
  },
  itemImage: {
    width: 160,
    height: '100%',
    borderRadius: 8,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
    color: '#fff'
  },
  itemTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
    marginBottom: 8,
  },
  itemVariant: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  itemQuantity: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  itemTotal: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  totalContainer: {
    padding: 16,
    backgroundColor: 'rgba(217, 217, 214, 0.2)',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  totalText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 0,
    padding: 10,
    backgroundColor: Colors.theme_backgound_second,
    borderRadius: 8,
  },
});

export default CheckoutScreen;

