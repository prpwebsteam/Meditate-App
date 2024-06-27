import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { fetchAllProducts } from '../../services/productService';
import EmptyCart from '../../components/commonComponents/CartIcon';
import { BottomTabMenu, Container } from '../../components';
import images from '../../images';
import { useNavigation } from '@react-navigation/native';
import { RouteName } from '../../routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');

const ProductListScreen = ({ props }) => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const modalAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);

  const saveCartToStorage = async (cart) => {
    try {
      const jsonValue = JSON.stringify(cart);
      await AsyncStorage.setItem('@cart', jsonValue);
    } catch (e) {
      console.error('Error saving cart to storage', e);
    }
  };

  const loadCartFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@cart');
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error('Error loading cart from storage', e);
      return [];
    }
  };

  const loadCart = async () => {
    const storedCart = await loadCartFromStorage();
    setCart(storedCart);
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const allProducts = await fetchAllProducts();
      setProducts(allProducts);
    } catch (error) {
      Alert.alert('Error', 'Failed to load products');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
    Animated.timing(modalAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(modalAnim, {
      toValue: height,
      duration: 500,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const addToCart = (variant) => {
    const updatedCart = [...cart, variant];
    setCart(updatedCart);
    saveCartToStorage(updatedCart);
    closeModal();
  };

  const updateCart = (newCart) => {
    setCart(newCart);
    saveCartToStorage(newCart);
  };

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size="large" color="#0000ff" />;
  };

  const renderItem = ({ item }) => {
    const price = item.variants?.[0]?.priceV2?.amount;
    const currencyCode = item.variants?.[0]?.priceV2?.currencyCode;
    const discountPercentage = item.discountPercentage;
    const images = item.images || [];
    const sizes = item.sizes || [];
    const variantsLength = item.variants?.length || 0;

    return (

      <View style={styles.productContainer}>
        {discountPercentage && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{discountPercentage}% OFF</Text>
          </View>
        )}
        <View style={styles.imageSliderContainer}>
          <ImageSlider images={images} style={styles.productImage} resizeMode="center" />
        </View>
        <TouchableOpacity
          onPress={() => navigation?.navigate(RouteName.PRODUCTDETAILS_SCREEN, { productId: item.id })} style={styles.containerinner}
        >
          <Text style={styles.productTitle} numberOfLines={2} ellipsizeMode="tail">{item.title}</Text>
          <View style={styles.variantContainerVariant}>
            <Text style={styles.textvariant}>{variantsLength} Variants</Text>
          </View>
          <Text style={styles.productPrice}>{price ? `${currencyCode} ${price}` : 'N/A'}</Text>
        </TouchableOpacity>
        <View style={styles.sizeSelector}>
          {sizes.map((size, index) => (
            <Text key={index} style={styles.sizeText}>{size}</Text>
          ))}
        </View>
        <TouchableOpacity style={styles.addButtonVariant} onPress={() => openModal(item)}>
          <Text style={styles.addButtonTextVariant}>ADD</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Container>
      <ImageBackground source={images.background1} style={styles.backgroundImage}>
        <View style={styles.overlay} />
        <BottomTabMenu {...props} selected={3} />
        <View style={styles.container}>
          <View style={styles.cartButtonContainer}>
            <View style={styles.cartButton} >
              <Text style={styles.shopAllText}>Shop All</Text>
              <TouchableOpacity onPress={() => navigation?.navigate(RouteName.CART_SCREEN, { cart, updateCart })}>
                <View style={styles.cartIconContainer}>
                  <EmptyCart style={styles.cartIcon}></EmptyCart>
                  {cart.length > 0 && <Text style={styles.cartButtonText}>{cart.length}</Text>}
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {loading && products.length === 0 ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <FlatList
              data={products}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              ListFooterComponent={renderFooter}
              numColumns={2}
              columnWrapperStyle={styles.row}
              ListEmptyComponent={<Text style={styles.emptyMessage}>No products available</Text>}
            />
          )}

          {selectedProduct && (
            <Modal
              animationType="none"
              transparent={true}
              visible={modalVisible}
              onRequestClose={closeModal}
              style={styles.modlewapper}
            >

              <Animated.View style={[styles.centeredView, { transform: [{ translateY: modalAnim }] }]}>

                <View style={styles.modalView}>
                  <View style={styles.overlay} />
                  <Text style={styles.modalText}>{selectedProduct.title}</Text>
                  <ScrollView>
                    {selectedProduct.variants.map((variant, index) => (
                      <View key={index} style={styles.variantContainer}>
                        <Image
                          source={{ uri: variant.image?.src }}
                          style={styles.variantImage}
                          resizeMode="contain"
                        />
                        <View style={styles.variantDetails}>
                          <Text style={styles.variantTitle}>
                            {variant.title.length > 10 ? `${variant.title.slice(0, 10)}..` : variant.title}
                          </Text>
                          <Text style={styles.variantPrice}>
                            {variant.priceV2.currencyCode} {variant.priceV2.amount}
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={styles.addButton}
                          onPress={() => addToCart({
                            ...variant,
                            productId: selectedProduct.id,
                            productTitle: selectedProduct.title,
                            productImage: selectedProduct.images[0]?.src,
                          })}
                        >
                          <Text style={styles.addButtonText}>ADD</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </ScrollView>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={closeModal}
                  >
                    <Text style={styles.textStyle}>✕</Text>
                  </Pressable>
                </View>
              </Animated.View>
            </Modal>
          )}
        </View>
      </ImageBackground>
    </Container>
  );
};

const ImageSlider = ({ images }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image
              source={{ uri: image.src }}
              style={styles.productImage}
              resizeMode="contain"
            />
          </View>
        ))}
      </Animated.ScrollView>
      <View style={styles.dotContainer}>
        {images.map((_, index) => {
          const opacity = scrollX.interpolate({
            inputRange: [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          return <Animated.View key={index} style={[styles.dot, { opacity }]} />;
        })}
      </View>
    </View>
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
    marginBottom: 55,

  },
  buttonClose: {
    backgroundColor: '#f79f80',
    width: '100%',
    borderRadius: 10,
  },
  row: {
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  cartButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 5
  },
  shopAllText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f79f80',
    marginRight: 10,
  },
  cartIconContainer: {
    flexDirection: 'row',
  },
  cartIcon: {
    fontSize: 35,
    color: '#000',
    tintColor: '#f79f80',
  },
  cartButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
    backgroundColor: '#f79f80',
    borderRadius: 10,
    padding: 5,
    marginBottom: 5,
  },
  modlewapper: {
    zIndex: 999,

  },
  productContainer: {
    flex: 1,
    marginHorizontal: 5,
    paddingBottom: 18,
    borderRadius: 10,
    backgroundColor: 'rgba(217, 217, 214, 0.2)',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  containerinner: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#1e90ff',
    borderRadius: 4,
    padding: 5,
    zIndex: 1,
  },
  discountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  imageSliderContainer: {
    width: '100%',
    height: 180,
  },
  imageContainer: {
    maxWidth: '100%',
    width: 201,
    height: 180,
    maxHeight: '100%',
    paddingHorizontal: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 6,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 5,
    backgroundColor: '#333',
    marginHorizontal: 2,
    marginVertical: 2,
  },
  productTitle: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#f79f80',
    textAlign: 'left',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  productPrice: {
    marginTop: 5,
    fontSize: 14,
    color: '#f79f80',
  },
  productDescription: {
    marginTop: 5,
    fontSize: 12,
    color: '#f79f80',
    textAlign: 'center',
  },
  sizeSelector: {
    flexDirection: 'row',
    marginTop: 10,
  },
  sizeText: {
    backgroundColor: 'rgba(217, 217, 214, 0.2)',
    borderRadius: 4,
    padding: 5,
    marginHorizontal: 2,
    fontSize: 12,
  },
  addButton: {
    marginTop: 10,
  },
  addButtonText: {
    borderWidth: 1,
    borderColor: '#f79f80',
    borderRadius: 6,
    paddingTop: 8,
    paddingBottom: 10,
    paddingHorizontal: 45,
    color: '#f79f80',
    width: '100%',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  addButtonTextVariant: {
    borderWidth: 1,
    borderColor: '#f79f80',
    borderRadius: 6,
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 45,
    color: '#f79f80',
    width: '100%',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  addButtonVariant: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#f79f80',
    borderRadius: 10,
    padding: 10,
    paddingBottom: 10,
    position: 'relative'
  },
  addButtonVariant: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green'
  },
  variantContainerVariant: {
    borderRadius: 10,
  },
  textvariant: {
    fontSize: 12,
    color: '#f79f80'
  },
  carticon: {
    fontWeight: 'bold',
    fontSize: 30,
    tintColor: '#fff',
    textAlign: 'center',
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 10,
    backgroundColor: '#f79f80',
    textAlign: 'center',
    borderRadius: 100,
    height: 16,
    width: 16,
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#999',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 22,
    zIndex: 999
  },
  modalView: {
    width: '100%',
    height: '70%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    zIndex: 999,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
  variantContainer: {
    width: '100%',
    maxWidth: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  variantImage: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 10,
  },
  variantDetails: {
    padding: 10,
  },
  variantTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  },
  variantPrice: {
    fontSize: 13,
    color: '#fff',
  },
});

export default ProductListScreen;
