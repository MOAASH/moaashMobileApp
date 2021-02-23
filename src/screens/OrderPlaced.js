import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Colors from '../utils/colors';
import Fonts from '../utils/fonts';
import {inject} from 'mobx-react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-gesture-handler';
import OrderTotal from '../components/OrderTotal';
import SoldBy from '../components/SoldBy';
import LottieView from 'lottie-react-native';
import CartProductCard from '../components/CartProductCard';
import {RFValue} from '../utils/fontSizeStyling';
import {HeaderBackButton} from 'react-navigation-stack';

const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height);
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);

@inject('Cart')
@inject('User')
export default class OrderPlaced extends Component {
  static navigationOptions = ({navigation}) => ({
    headerLeft: () => (
      <HeaderBackButton
        tintColor={'white'}
        labelVisible={false}
        onPress={() => {
          if (!navigation.state.params) {
            navigation.navigate('Home');
          } else {
            navigation.goBack();
          }
        }}
      />
    ),
  });

  constructor(props) {
    super(props);
    this.state = {
      invoiceDetails: null,
      orderplaced: true,
    };
  }

  componentDidMount = async () => {
    console.log('Starting the app');
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.invoiceDetails
    ) {
      await this.setState({
        invoiceDetails: this.props.navigation.state.params.invoiceDetails,
      });
      console.log('Invoice Details: ', this.state.invoiceDetails);
    } else {
      this.setState({invoiceDetails: this.props.Cart.invoiceDetail});
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {this.state.invoiceDetails && (
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
                Your ORDER #{this.state.invoiceDetails.id} has been placed.
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
                  return (
                    <CartProductCard
                      invoiceLineItem={invoice_line_item}
                      destroy={false}
                    />
                  );
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
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            width: SCREEN_WIDTH,
            position: 'absolute',
            borderRadius: 5,
            bottom: 20,
          }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              backgroundColor: Colors.color2,
              flex: 1,
              padding: 16,
            }}
            onPress={() => this.props.navigation.navigate('Home')}>
            <Text
              style={{
                fontSize: RFValue(12),
                fontFamily: Fonts.regular,
                color: Colors.white,
              }}>
              Back to Home
            </Text>
          </TouchableOpacity>
        </View>
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
