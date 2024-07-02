import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Modal, AsyncStorage, ImageBackground } from 'react-native';
import { fetchSingleProduct } from '../../services/productService';
import { createCheckout, addItem } from '../../services/checkoutService';
import { Container } from '../../components';
import images from '../../images';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const VariantTabs = ({ options, selectedOption, onSelect }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContainer}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[styles.tabButton, selectedOption && selectedOption.id === option.id && styles.selectedTabButton]}
          onPress={() => onSelect(option)}
        >
          <Text style={styles.tabButtonText}>{option.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const ProductDetailsScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomImageIndex, setZoomImageIndex] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
  
    fetchSingleProduct(productId).then(product => {
      setProduct(product);
      if (product.variants.length > 0) {
        setSelectedVariant(product.variants[0]);
      }
      updateRecentlyViewed(product);
    });
  }, [productId]);

  useEffect(() => {
 
    const loadRecentlyViewed = async () => {
      try {
        const storedProducts = await AsyncStorage.getItem('recentlyViewed');
        if (storedProducts) {
          setRecentlyViewed(JSON.parse(storedProducts));
        }
      } catch (error) {
        console.error('Error loading recently viewed products:', error);
      }
    };
    loadRecentlyViewed();
  }, []);

  const updateRecentlyViewed = async (product) => {
    try {
      const storedProducts = await AsyncStorage.getItem('recentlyViewed');
      let products = storedProducts ? JSON.parse(storedProducts) : [];

      products = products.filter(p => p.id !== product.id);
      
      products.unshift(product);
     
      products = products.slice(0, 10);

      await AsyncStorage.setItem('recentlyViewed', JSON.stringify(products));
      setRecentlyViewed(products);
    } catch (error) {
      console.error('Error updating recently viewed products:', error);
    }
  };

  const handleAddToCart = async () => {
    if (!selectedVariant) {
      console.error('No variant selected');
      return;
    }
    try {
      const checkout = await createCheckout();
      if (!checkout) {
        console.error('Failed to create checkout');
        return;
      }
      await addItem(checkout.id, [{ variantId: selectedVariant.id, quantity }]);
      navigation.navigate('CartScreen', { cart: [{ ...selectedVariant, productTitle: product.title, quantity }], quantities: [quantity], updateCart: () => { } });
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const handleBuyNow = async () => {
    if (!selectedVariant) {
      console.error('No variant selected');
      return;
    }
    try {
      const checkout = await createCheckout();
      if (!checkout) {
        console.error('Failed to create checkout');
        return;
      }
      await addItem(checkout.id, [{ variantId: selectedVariant.id, quantity }]);
      navigation.navigate('CheckoutScreen', { cart: [{ ...selectedVariant, productTitle: product.title, quantity }], quantities: [quantity], checkoutId: checkout.id });
    } catch (error) {
      console.error('Error processing buy now:', error);
    }
  };

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / screenWidth);
    setCurrentIndex(newIndex);
  };

  const openZoomImage = (index) => {
    setZoomImageIndex(index);
  };

  const closeZoomImage = () => {
    setZoomImageIndex(null);
  };

  return (
    <Container>
      <ImageBackground source={images.background1} style={styles.backgroundImage}>
        <View style={styles.overlay} />

        <View style={styles.container}>
          {product ? (
            <>
              <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.imageSlider}>
                  <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                  >
                    {product.images.map((image, index) => (
                      <TouchableOpacity key={index} onPress={() => openZoomImage(index)}>
                        <Image source={{ uri: image.src }} style={styles.productImage} resizeMode="center" />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                  {product.images.length > 1 && (
                    <View style={styles.bulletContainer}>
                      {product.images.map((_, index) => (
                        <View
                          key={index}
                          style={currentIndex === index ? styles.activeBullet : styles.bullet}
                        />
                      ))}
                    </View>
                  )}
                </View>
                <Text style={styles.title}>{product.title}</Text>
                {selectedVariant ? (
                  <>
                    <Text style={styles.price}>
                      {selectedVariant.price.currencyCode} {selectedVariant.price.amount}
                    </Text>
                    <Text style={styles.description}>
                      {showFullDescription
                        ? product.description
                        : product.description.length > 200
                          ? `${product.description.slice(0, 200)}...`
                          : product.description}
                      <Text onPress={() => setShowFullDescription(!showFullDescription)} style={styles.loadMoreText}>
                        {showFullDescription ? ' Load Less' : ' Load More'}
                      </Text>
                    </Text>
                    <VariantTabs
                      options={product.variants}
                      selectedOption={selectedVariant}
                      onSelect={setSelectedVariant}
                    />
                    <View style={styles.quantityContainer}>
                      <Text style={styles.quantityLabel}>Quantity</Text>
                      <View style={styles.quantityControls}>
                        <TouchableOpacity style={styles.quantityButton} onPress={() => setQuantity(Math.max(1, quantity - 1))}>
                          <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{quantity}</Text>
                        <TouchableOpacity style={styles.quantityButton} onPress={() => setQuantity(quantity + 1)}>
                          <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>

 
                    <View style={styles.recentlyViewedContainer}>
                      <Text style={styles.recentlyViewedTitle}>Recently Viewed</Text>
                      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {recentlyViewed.map((item) => (
                          <View key={item.id} style={styles.itemContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('ProductDetailsScreen', { productId: item.id })}>
                              <Image source={{ uri: item.images[0]?.src }} style={styles.itemImage} />
                              <Text style={styles.productName} numberOfLines={2}>
                                {item.title}
                              </Text>
                              <Text style={styles.itemPrice}>{item.variants[0]?.price.currencyCode} {item.variants[0]?.price.amount}</Text>
                            </TouchableOpacity>
                          </View>
                        ))}
                      </ScrollView>
                    </View>

                  </>
                ) : (
                  <Text style={styles.soldOutText}>Sold Out</Text>
                )}
              </ScrollView>
              {zoomImageIndex !== null && (
                <Modal visible={true} transparent={true} onRequestClose={closeZoomImage}>
                  <View style={styles.zoomContainer}>
                    <ScrollView
                      contentContainerStyle={styles.zoomScrollView}
                      minimumZoomScale={1}
                      maximumZoomScale={5}
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                    >
                      <TouchableOpacity onPress={closeZoomImage} style={styles.zoomCloseButton}>
                        <Text style={styles.zoomCloseButtonText}>✕</Text>
                      </TouchableOpacity>
                      <Image source={{ uri: product.images[zoomImageIndex].src }} style={styles.zoomImage} />
                    </ScrollView>
                  </View>
                </Modal>
              )}
            </>
          ) : (
            <Text style={styles.loadingText}>Loading...</Text>
          )}
        </View>
        {selectedVariant && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
              <Text style={styles.buybuttonText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  imageSlider: {
    height: 400,
    marginBottom: 16,
  },
  productImage: {
    width: screenWidth - 32,
    height: 400,
    borderRadius: 10,
    paddingLeft: 4,
  },
  bulletContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bullet: {
    width: 10,
    height: 3,
    borderRadius: 5,
    backgroundColor: '#888',
    marginHorizontal: 4,
  },
  activeBullet: {
    width: 20,
    height: 3,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f79f80',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    paddingBottom: 10,
    color: '#aaa',
  },
  loadMoreText: {
    fontSize: 16,
    color: '#f79f80',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f79f80',
    marginBottom: 16,
  },
  tabsContainer: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    height: 55,
  },
  tabButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#f79f80',
    borderRadius: 5,
    backgroundColor: 'rgba(217, 217, 214, 0.2)',
    marginRight: 8,
  },
  selectedTabButton: {
    backgroundColor: '#f79f80',
  },
  tabButtonText: {
    color: '#fff',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  quantityLabel: {
    fontSize: 16,
    color: '#fff',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(217, 217, 214, 0.2)',
    borderRadius: 5,
  },
  quantityButton: {
    padding: 10,
  },
  quantityButtonText: {
    fontSize: 20,
    color: '#fff',
  },
  quantityText: {
    fontSize: 18,
    color: '#fff',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#121212',
  },
  addToCartButton: {
    backgroundColor: '#f79f80',
    padding: 12,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  buyNowButton: {
    backgroundColor: '#fff',
    color: '#28a745',
    padding: 12,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  buybuttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  soldOutText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
  },
  loadingText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginTop: 16,
  },
  zoomContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomScrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomCloseButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  zoomCloseButtonText: {
    color: 'gray',
    fontSize: 24,
    fontWeight: 'bold',
  },
  zoomImage: {
    width: screenWidth - 10,
    height: screenHeight - 10,
    borderRadius: 10,
  },
  recentlyViewedContainer: {
    marginVertical: 20,
  
    paddingHorizontal: 16,
  },
  recentlyViewedTitle: {
    fontSize: 18,
    color: '#f79f80',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recentlyViewedScroll: {
    flexDirection: 'row',
  },
  itemContainer: {
    borderRadius: 8,
    borderColor: '#f79f80', 
    borderWidth: 1,
    padding:5,
    marginRight: 10,
    alignItems: 'center',
    width: 120,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 5,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
     textAlign: 'left',
    marginBottom: 3,
    color: '#f79f80',
  },
  itemPrice: {
    fontSize: 14,
    color: '#f79f80',
    textAlign: 'left',
  },
});

export default ProductDetailsScreen;
