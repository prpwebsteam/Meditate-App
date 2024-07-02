import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { addItem, createCheckout, updateItem } from '../../services/checkoutService';
import EmptyCart from '../../images/EmptyCart.png';
import { RouteName } from '../../routes';
import { BottomTabMenu, Container } from '../../components';
import images from '../../images';
import DeleteIcon from '../../components/commonComponents/DeleteIcon';
import { Colors } from '../../utils';
const CartScreen = ({ route, navigation }) => {
  const { Colors } = useTheme();
  const { cart: initialCart = [], quantities: initialQuantities = [], updateCart } = route.params;

  const [cart, setCart] = useState(initialCart);
  const [quantities, setQuantities] = useState(
    initialCart.map((item) => item.quantity || 1)
  );
  const [checkoutId, setCheckoutId] = useState(null);

  useEffect(() => {
    const setupCheckout = async () => {
      const id = await createCheckout();
      setCheckoutId(id);
    };

    setupCheckout();
    if (updateCart) {
      updateCart(cart);
    }
  }, [cart]);

  const handleIncrement = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);
    updateCartQuantities(index, newQuantities[index]);
  };

  const handleDecrement = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 1) {
      newQuantities[index] -= 1;
      setQuantities(newQuantities);
      updateCartQuantities(index, newQuantities[index]);
    }
  };

  const handleRemove = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    const newQuantities = quantities.filter((_, i) => i !== index);
    setCart(newCart);
    setQuantities(newQuantities);
  };

  const updateCartQuantities = async (index, quantity) => {
    if (!cart[index] || !cart[index].id) {
      console.error(`Item at index ${index} is missing or has no id`, cart[index]);
      return;
    }

    const lineItemToUpdate = [
      {
        id: cart[index].id,
        quantity,
      },
    ];
    await updateItem(checkoutId, lineItemToUpdate);
  };

  const proceedToCheckout = async () => {
    try {
      const checkout = await createCheckout();
      console.log('Checkout created with ID:', checkout.id);

      const lineItems = cart.map((item, index) => ({
        variantId: item.id,
        quantity: quantities[index],
      }));

      await addItem(checkout.id, lineItems);
      console.log('Line items added to checkout:', lineItems);

      navigation.navigate('CheckoutScreen', { cart, quantities, checkoutId: checkout.id });
    } catch (error) {
      console.error('Error creating checkout:', error);
      alert('Failed to initiate checkout. Please try again.');
    }
  };

  const truncateText = (text, length) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + '..';
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.productImage }} style={styles.itemImage} resizeMode="contain" />
      <View style={styles.itemDetails}>
        <View style={styles.detailsWrapper}>
          <Text style={styles.itemTitle}>{truncateText(item.productTitle, 16)}</Text>
          <Text style={styles.itemVariant}>{item.title}</Text>
          <Text style={styles.itemPrice}>
            {item.priceV2.amount} {item.priceV2.currencyCode}
          </Text>
        </View>
        <View style={styles.quantityRemoveWrapper}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => handleDecrement(index)}>
              <Text style={styles.quantityButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantities[index]}</Text>
            <TouchableOpacity onPress={() => handleIncrement(index)}>
              <Text style={styles.quantityButton}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => handleRemove(index)} style={styles.removeButton}>
            <DeleteIcon style={styles.removeButtonText}> </DeleteIcon>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <Container>
      <ImageBackground source={images.background1} style={styles.backgroundImage}>
        <View style={styles.overlay} />
        <View style={styles.container}>
          {cart.length === 0 ? (
            <View style={styles.emptyCartContainer}>
              <View></View>
              <View style={styles.wapperDetils}>
                <Image source={EmptyCart} style={styles.EmptyCart} resizeMode="contain" />
                <Text style={styles.emptyCartTextOP}>Oops!</Text>
                <Text style={styles.emptyCartText}> Your cart is currently empty.</Text>
              </View>
              <TouchableOpacity
                style={styles.continueShoppingButton}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.continueShoppingButtonText}>Continue Shopping</Text>
              </TouchableOpacity>
            </View>
          ) : ( 
            <>
              <FlatList
                data={cart}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />
              <TouchableOpacity style={styles.checkoutButton} onPress={proceedToCheckout}>
                <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
              </TouchableOpacity>
            </>
          )}
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
    padding: 10,
    justifyContent: 'space-between',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
  },
  wapperDetils: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  emptyCartTextOP: {
    fontSize: 20,
    marginBottom: 20,
    color: '#fff',
  },
  emptyCartText: {
    fontSize: 14,
    marginBottom: 20,
    color: '#fff',
  },
  EmptyCart: {
    width: 200,
    height: 200,
    tintColor: 'white',
  },
  continueShoppingButton: {
    backgroundColor: Colors.theme_backgound_second,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  continueShoppingButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 10,
    backgroundColor: 'rgba(217, 217, 214, 0.2)',
    borderRadius: 10,
    shadowcolor: '#fff',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsWrapper: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  itemVariant: {
    marginTop: 5,
    fontSize: 14,
    color: '#fff',
  },
  itemPrice: {
    marginTop: 5,
    fontSize: 14,
    color: '#fff',
  },
  quantityRemoveWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    fontSize: 18,
    width: 30,
    textAlign: 'center',
    color: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 6,
    paddingRight: 10,
  },
  checkoutButton: {
    backgroundColor: Colors.theme_backgound_second,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 18,
  },
});

export default CartScreen;
