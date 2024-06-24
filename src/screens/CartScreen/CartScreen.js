import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { addItem, createCheckout, updateItem } from '../../services/checkoutService';
import EmptyCart from '../../images/EmptyCart.png'
import { RouteName } from '../../routes';

const CartScreen = ({ route, navigation }) => {
  const { cart: initialCart, updateCart } = route.params;

  const [cart, setCart] = useState(initialCart);
  const [quantities, setQuantities] = useState(initialCart.map(item => 1));
  const [checkoutId, setCheckoutId] = useState(null);

  useEffect(() => {
    const setupCheckout = async () => {
      const id = await createCheckout();
      setCheckoutId(id);
    };

    setupCheckout();
    updateCart(cart);
  }, [cart]);

  const handleIncrement = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);
    updateItemInCheckout(index, newQuantities[index]);
  };

  const handleDecrement = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 1) {
      newQuantities[index] -= 1;
      setQuantities(newQuantities);
      updateItemInCheckout(index, newQuantities[index]);
    }
  };

  const handleRemove = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    const newQuantities = quantities.filter((_, i) => i !== index);
    setCart(newCart);
    setQuantities(newQuantities);
    // Optionally remove item from checkout
  };

  const updateItemInCheckout = async (index, quantity) => {
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
      console.log("Checkout created with ID:", checkout.id);

      const lineItems = cart.map((item, index) => {
        if (!item.id) {
          console.error(`Item at index ${index} is missing a variantId`, item);
        }
        return {
          variantId: item.id, // Ensure you use the correct field for variantId
          quantity: quantities[index],
        };
      }).filter(item => item.variantId); // Filter out items with missing variantId

      if (lineItems.length === 0) {
        console.error('No valid line items to add to checkout');
        alert('No valid items in cart. Please try again.');
        return;
      }

      await addItem(checkout.id, lineItems);
      console.log("Line items added to checkout:", lineItems);

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
            <Text style={styles.removeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <View style={styles.emptyCartContainer}>
             <View>
             </View>
          <View style={styles.wapperDetils}>
            <Image source={EmptyCart} style={styles.EmptyCart} resizeMode="contain" />

          <Text style={styles.emptyCartTextOP}>Oops!</Text>
          <Text style={styles.emptyCartText}> Your cart is currently empty.</Text>
         </View>
         <TouchableOpacity
            style={styles.continueShoppingButton}
            onPress={() => navigation.navigate(RouteName.PRODUCTLIST_SCREEN)}
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
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={proceedToCheckout}
          >
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign:'center'
  },
  wapperDetils:{
flex:1,
justifyContent:'center',
alignItems: 'center',
alignContent:'center',
textAlign:'center'
  },
  emptyCartTextOP: {
    fontSize: 20,
    marginBottom: 20,
    color: '#000'
  },
  emptyCartText: {
    fontSize: 14,
    marginBottom: 20,
    color: '#000'
  },
  EmptyCart:{
width:200,
height:200
  },
  continueShoppingButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width:'100%'
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
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
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
    color: '#000'
  },
  itemVariant: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
  },
  itemPrice: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
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
    color: '#000',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: 16,
    color:'#000',
    fontWeight: 'bold',
  },
  removeButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 6,
    paddingRight: 10, 
  },
  checkoutButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  checkoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default CartScreen;
