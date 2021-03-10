import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import axios from '../utils/axios';
import Colors from '../utils/colors';
import Fonts from '../utils/fonts';
import {inject} from 'mobx-react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
import Loader from '../components/Loader';
import FacebookLogo from '../utils/Constants';
import {ScrollView} from 'react-native-gesture-handler';
import OrderTotal from '../components/OrderTotal';
import CartProductCard from '../components/CartProductCard';
import {RFValue} from '../utils/fontSizeStyling';
import SoldBy from '../components/SoldBy';
import LottieView from 'lottie-react-native';
import SenderInformation from '../components/SenderInformation';
import ReceiversInformation from '../components/ReceiversInformation';

const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height);
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);

@inject('Cart')
@inject('User')
export default class OrderSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoiceDetails: null,
      orderplaced: false,
      loaded: true,
    };
  }

  componentDidMount = async () => {
    // console.log('order summary of the app', this.props.Cart.invoiceDetail);
    await this.setState({
      invoiceDetails: this.props.Cart.invoiceDetail,
      loaded: false,
    });
    
  };

  placeOrder = async () => {
    // console.log('order placed');
    // console.log(
    //   'lol',
    //   this.props.User.userInformation.attributes.authentication_token,
    // );
    this.setState({ loaded: true })
    let [placeOrder, errorMessage] = await this.props.Cart.placeOrder(
      this.props.User.userInformation.attributes.authentication_token,
    );
    this.setState({ loaded: false })

    if (placeOrder) {
      this.props.navigation.navigate('OrderPlaced');
    }
  };
  cartItems = (invoice_line_item) => {
    return (
      <CartProductCard invoiceLineItem={invoice_line_item} destroy={false} />
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {this.state.orderplaced && (
            <View
              style={{
                margin: 12,
                borderRadius: 10,
                paddingVertical: 24,
                backgroundColor: Colors.white,
                alignItems: 'center',
              }}>
              <LottieView
                source={require('../../assets/tick.json')}
                autoPlay
                loop={false}
                style={{width: 50, height: 50}}
              />
              <Text style={{fontSize: RFValue(10), fontFamily: Fonts.bold}}>
                ORDER CONFIRMED
              </Text>
              <Text style={{fontSize: RFValue(10), fontFamily: Fonts.regular}}>
                Your ORDER #1 has been placed.
              </Text>
            </View>
          )}
          {this.state.invoiceDetails && (
            <View
              style={{
                margin: 12,
                borderRadius: 10,
                backgroundColor: Colors.white,
              }}>
              <View
                style={{
                  flex: 1,
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  backgroundColor: Colors.lightGray2,
                }}>
                <Text style={{fontSize: RFValue(10), fontFamily: Fonts.light}}>
                  SENDER INFORMATION
                </Text>
              </View>
              <View style={{paddingVertical: 8, paddingHorizontal: 16}}>
                <Text
                  style={{fontSize: RFValue(10), fontFamily: Fonts.regular}}>
                  {this.props.User.userInformation.attributes.name}
                </Text>
                <Text
                  style={{fontSize: RFValue(10), fontFamily: Fonts.regular}}>
                  {this.props.User.userInformation.attributes.phone_number}
                </Text>
              </View>
              <View
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  flexDirection: 'row',
                }}>
                <Ionicons
                  name="information-circle-outline"
                  size={RFValue(10)}
                />
                <Text
                  style={{
                    fontSize: RFValue(8),
                    fontFamily: Fonts.regular,
                    color: Colors.Gray,
                    paddingLeft: 4,
                  }}>
                  This information would be displayed on the package sent to
                  your customer. No mention of MOAASH would be there.
                </Text>
              </View>
            </View>
          )}

          {this.state.invoiceDetails && (
            <OrderTotal
              totalAmount={this.state.invoiceDetails.net_amount}
              shippingCharges={0}
              orderSummary={true}
              totalCustomerPrice={this.state.invoiceDetails.margin}
            />
          )}

          <View
            style={{
              margin: 12,
              borderRadius: 10,
              backgroundColor: Colors.white,
              paddingBottom: 20,
            }}>
            {this.state.invoiceDetails &&
              this.state.invoiceDetails.invoice_line_items.map(
                (invoice_line_item) => {
                  return this.cartItems(invoice_line_item);
                },
              )}
          </View>
          {this.state.invoiceDetails && (
            <View
              style={{
                margin: 12,
                borderRadius: 10,
                backgroundColor: Colors.white,
              }}>
              <View
                style={{
                  flex: 1,
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  backgroundColor: Colors.lightGray2,
                }}>
                <Text style={{fontSize: RFValue(10), fontFamily: Fonts.light}}>
                  SHIPPING ADDRESS
                </Text>
              </View>
              <View style={{paddingVertical: 8, paddingHorizontal: 16}}>
                <Text
                  style={{fontSize: RFValue(10), fontFamily: Fonts.regular}}>
                  {
                    this.state.invoiceDetails.shipping_address.data.attributes
                      .customer_name
                  }
                </Text>
                <Text
                  style={{fontSize: RFValue(10), fontFamily: Fonts.regular}}>
                  {
                    this.state.invoiceDetails.shipping_address.data.attributes
                      .address
                  }
                </Text>
                <Text
                  style={{fontSize: RFValue(10), fontFamily: Fonts.regular}}>
                  {
                    this.state.invoiceDetails.shipping_address.data.attributes
                      .phone_number
                  }
                </Text>
              </View>
            </View>
          )}
          {this.state.invoiceDetails && (
            <SoldBy
              companyName={
                this.state.invoiceDetails.company.data.attributes.name
              }
            />
          )}
        </ScrollView>

        <TouchableOpacity
          style={{
            alignItems: 'center',
            backgroundColor: Colors.color2,
            width: SCREEN_WIDTH,
            borderRadius: 5,
            position: 'absolute',
            bottom: 20,
            padding: 16,
          }}
          onPress={() => this.placeOrder()}>
          <Text style={{fontSize: 20, color: Colors.white}}>Place Order</Text>
        </TouchableOpacity>
        {this.state.loaded && <Loader />}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },

  inputStyle: {
    shadowOpacity: 0.2,
    shadowColor: 'black',
    borderColor: Colors.color2,
    borderWidth: 1,
    paddingVertical: 16,
    borderRadius: 6,
    paddingHorizontal: 8,
    color: 'black',
  },
});
