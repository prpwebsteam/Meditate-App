import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, ActivityIndicator, Image, Linking, FlatList } from 'react-native';
import axios from 'axios';
import { SHOPIFY_ACCESS_TOKEN } from '../../../env';
import { Container } from '../../components';
import images from '../../images';
import { Colors, SH, SW } from '../../utils';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const OrderDetailsScreen = ({ route }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const orderId = route.params.orderId;
  const accessToken = SHOPIFY_ACCESS_TOKEN;
  const { t } = useTranslation();

  const { Colors } = useTheme();
  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const response = await axios({
          url: `https://pw-dawn1.myshopify.com/admin/api/2024-04/orders/${orderId}.json`,
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken,
          }
        });
        setOrder(response.data.order);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#0000ff" />
    );
  }

  if (!order) {
    return (
      <View style={styles.container}>
        <Text>No order details available</Text>
      </View>
    );
  }

  const handleBuyAgain = () => {
    // Implement the buy again functionality here
    // This can be navigating to the product page or adding items to the cart
    console.log("Buy Again clicked");
  };

  const renderShipmentStatus = () => {
    if (!order.fulfillments || order.fulfillments.length === 0) {
      return <Text style={styles.detailText}>No shipment status available</Text>;
    }

    return order.fulfillments.map((fulfillment, index) => (
      <View key={index}>
        <Text style={styles.shipmentStatus}>{fulfillment.status}</Text>
        <Text style={styles.shipmentUpdate}>Updated {new Date(fulfillment.updated_at).toDateString()}</Text>
        {fulfillment.tracking_url && (
          <Text style={styles.shipmentDetail}>
            <Text>Tracking URL: </Text>
            <Text style={styles.trackingLink}>{fulfillment.tracking_url}</Text>
          </Text>
        )}
      </View>
    ));
  };

  const renderPaymentDetails = () => {
    if (!order.payment_gateway_names || order.payment_gateway_names.length === 0) {
      return <Text style={styles.detailText}>No payment details available</Text>;
    }

    return (
      <View>
        <Text style={styles.paymentInfo}>Payment Method: {order.payment_gateway_names.join(', ')}</Text>
        <Text style={styles.paymentInfo}>Financial Status: {order.financial_status}</Text>
      </View>
    );
  };

  const renderShippingDetails = () => {
    if (!order.shipping_lines || order.shipping_lines.length === 0) {
      return <Text style={styles.detailText}>No shipping details available</Text>;
    }

    return order.shipping_lines.map((shippingLine, index) => (
      <View key={index}>
        <Text style={styles.shippingInfo}>Shipping Method: {shippingLine.title}</Text>
        <Text style={styles.shippingInfo}>Price: {order.currency} {shippingLine.price}</Text>
      </View>
    ));
  };

  const renderTaxDetails = () => {
    if (!order.tax_lines || order.tax_lines.length === 0) {
      return <Text style={styles.detailText}>No tax details available</Text>;
    }

    return order.tax_lines.map((taxLine, index) => (
      <View key={index}>
        <Text style={styles.taxInfo}>{taxLine.title}: {order.currency} {taxLine.price}</Text>
      </View>
    ));
  };

  const calculateTotalAmount = () => {
    const subtotal = parseFloat(order.subtotal_price);
    const shipping = order.shipping_lines.reduce((sum, line) => sum + parseFloat(line.price), 0);
    const taxes = order.tax_lines.reduce((sum, line) => sum + parseFloat(line.price), 0);
    return (subtotal + shipping + taxes).toFixed(2);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {/* <Image
        source={{ uri: item.image ? item.image : 'https://via.placeholder.com/50' }}
        style={styles.itemImage}
      /> */}
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
        <Text style={styles.itemPrice}>Price: {order.currency} {item.price}</Text>
      </View>
    </View>
  );

  return (
    <Container>
      <ImageBackground source={images.background1} style={styles.backgroundImage}>
        <View style={styles.overlay} />
        <View style={styles.header2}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={images.backArrow} style={styles.backArrow} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: Colors.white }]}>{t("Order Detail")}</Text>
        </View>
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Order #{order.order_number}</Text>
            <Text style={styles.status}>Confirmed {new Date(order.created_at).toDateString()}</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={handleBuyAgain}>
              <Text style={styles.buttonText}>Buy Again</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(order.order_status_url)}>
              <Text style={styles.buttonText}>View Order Status</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order details</Text>
            <Text style={styles.infoText}>Contact information</Text>
            <Text style={styles.detailText}>{order.customer.first_name} {order.customer.last_name}</Text>
            <Text style={styles.detailText}>{order.contact_email}</Text>

            <Text style={styles.infoText}>Shipping address</Text>
            {order.shipping_address ? (
              <>
                <Text style={styles.detailText}>{order.shipping_address.name}</Text>
                <Text style={styles.detailText}>{order.shipping_address.address1}</Text>
                <Text style={styles.detailText}>{order.shipping_address.city}, {order.shipping_address.province} {order.shipping_address.zip}</Text>
                <Text style={styles.detailText}>{order.shipping_address.country}</Text>
              </>
            ) : (
              <Text style={styles.detailText}>No shipping address available</Text>
            )}

            <Text style={styles.infoText}>Billing address</Text>
            {order.billing_address ? (
              <>
                <Text style={styles.detailText}>{order.billing_address.name}</Text>
                <Text style={styles.detailText}>{order.billing_address.address1}</Text>
                <Text style={styles.detailText}>{order.billing_address.city}, {order.billing_address.province} {order.billing_address.zip}</Text>
                <Text style={styles.detailText}>{order.billing_address.country}</Text>
              </>
            ) : (
              <Text style={styles.detailText}>No billing address available</Text>
            )}

            <Text style={styles.infoText}>Order Items</Text>
            <FlatList
              data={order.line_items}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.itemSlider}
              snapToAlignment={'start'}
              decelerationRate={'fast'}
              snapToInterval={150}
            />

            <Text style={styles.infoText}>Subtotal</Text>
            <Text style={styles.detailText}>{order.currency} {order.subtotal_price}</Text>


            <Text style={styles.infoText}>Taxes</Text>
            {renderTaxDetails()}

            <Text style={styles.infoText}>Total Amount</Text>
            <Text style={styles.detailText}>{order.currency} {calculateTotalAmount()}</Text>

            <Text style={styles.infoText}>Shipping</Text>
            {renderShippingDetails()}

            <Text style={styles.infoText}>Shipment Status</Text>
            {renderShipmentStatus()}


            <Text style={styles.infoText}>Payment Details</Text>
            {renderPaymentDetails()}
          </View>
        </ScrollView>
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
  header2: {
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
  title: {
    fontSize: SH(24),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  container: {
    flex: 1,

  },
  header: {
    padding: 20,
    color: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor:  Colors.border,
  },
  headerText: {
    fontSize: 18,
    color: Colors.white,
    fontWeight: 'bold',
  },
  status: {
    color: Colors.white,
    fontSize: 16,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: Colors.theme_backgound_second,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    color: Colors.white,
    marginHorizontal: 5,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 14,
  },
  section: {
    padding: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.white,
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: Colors.white,
  },
  detailText: {
    fontSize: 16,
    color: Colors.white,
  },
  detailTextLink: {
    fontSize: 16,
    color: Colors.white,
  },
  itemSlider: {
    marginTop: 10,
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    color: Colors.white,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: 10,
    width: 160
  },
  itemImage: {
    width: 140,
    height: 130,
    marginBottom: 10,
    borderRadius: 6
  },
  itemDetails: {
    flex: 1,
    gap: 5,
    color: Colors.white,
    alignItems: 'flex-start'
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    alignItems: 'flex-start',
    textAlign: 'left',
    color: Colors.white,
    marginBottom: 15,
  },
  itemQuantity: {
    fontSize: 12,
    color: Colors.white,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.white,
  },
  shipmentStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
  },
  shipmentUpdate: {
    fontSize: 14,
    color: Colors.white,
  },
  shipmentDetail: {
    fontSize: 14,
    color: Colors.white,
    marginBottom: 10,
  },
  paymentInfo: {
    fontSize: 16,
    color: Colors.white,
    marginBottom: 10,
  },
  shippingInfo: {
    fontSize: 16,
    color: Colors.white,
    marginBottom: 10,
  },
  taxInfo: {
    fontSize: 16,
    color: Colors.white,
    marginBottom: 10,
  },
});

export default OrderDetailsScreen;
