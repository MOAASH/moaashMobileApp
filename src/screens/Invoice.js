import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import axios from '../utils/axios';
import Colors from '../utils/colors';
import {inject} from 'mobx-react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
import FacebookLogo from '../utils/Constants';
import {ScrollView} from 'react-native-gesture-handler';
import OrderTotal from '../components/OrderTotal';
import LottieView from 'lottie-react-native';
import {RFValue} from '../utils/fontSizeStyling';
import SoldBy from '../components/SoldBy';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartProductCard from '../components/CartProductCard';
import Fonts from '../utils/fonts';

const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height);
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
@inject('User')
@inject('Products')
@inject('Cart')
export default class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoiceDetails: null,
      cartEmpty: false,
    };
  }

  componentDidMount = async () => {
    if (this.props.navigation.state.params && this.props.navigation.state.params.invoiceDetails){
      this.setState({invoiceDetails: this.props.navigation.state.params.invoiceDetails});
      await AsyncStorage.setItem('APP:CurrentInvoiceId', this.props.navigation.state.params.invoiceId);
    } else {      
      const invoiceId = await AsyncStorage.getItem('APP:CurrentInvoiceId');
      let [result_fetched, error_message] = await this.props.Cart.fetchInvoice(
        this.props.User.userInformation.attributes.authentication_token,
      );
      if (result_fetched) {
        await this.setState({invoiceDetails: this.props.Cart.invoiceDetail});
        console.log(
          'invoice line item-------------' +
            JSON.stringify(this.state.invoiceDetails.invoice_line_items),
        );
      } else {
        this.setState({cartEmpty: true});
      }
      // console.log('--------> res',res);
    }
  };
  
  delete_invoice_line_item = async (id) => {
    let invoiceParams = this.props.Cart.invoiceParams(this.state.invoiceDetails.company.data.id, [{ id: id, destroy: true}])
    let [updateInvoice, errorMessage] = await this.props.Cart.addToInvoice(
      this.props.User.userInformation.attributes.authentication_token,
      invoiceParams,
    );
    if (updateInvoice){
      if (!this.props.Cart.invoiceDetail){
        this.setState({invoiceDetails: null, cartEmpty: true});
      } else {
        this.setState({invoiceDetails: this.props.Cart.invoiceDetail});
      }
    }
  }

  invoiceLineItemsData = () => {
    return (
      <View
        style={{
          margin: 12,
          borderRadius: 10,
          backgroundColor: Colors.white,
          paddingBottom: 20,
        }}>
        {this.state.invoiceDetails.invoice_line_items.map(
          (invoice_line_item) => {
            return (
              <CartProductCard
                invoiceLineItem={invoice_line_item}
                destroy={true}
                delete_invoice_line_item={this.delete_invoice_line_item}
              />
            );
          },
        )}
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={
            this.state.cartEmpty ? {flexGrow: 1, justifyContent: 'center'} : {}
          }>
          {this.state.cartEmpty && (
            <View style={{alignItems: 'center'}}>
              <LottieView
                source={require('../../assets/empty_cart.json')}
                autoPlay
                loop={true}
                style={{width: SCREEN_WIDTH / 1.5, height: SCREEN_WIDTH / 1.5}}
              />
              <Text style={{fontSize: RFValue(12), fontFamily: Fonts.medium}}>
                Your Cart is Empty
              </Text>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  padding: 8,
                  backgroundColor: Colors.color3,
                  borderRadius: 5,
                }}
                onPress={() => this.props.navigation.navigate('Home')}>
                <Text
                  style={{
                    fontSize: RFValue(12),
                    fontFamily: Fonts.regular,
                    color: Colors.white,
                  }}>
                  BROWSE PRODUCTS
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {this.state.invoiceDetails && (
            <OrderTotal
              totalAmount={this.state.invoiceDetails.net_amount}
              shippingCharges={50}
            />
          )}
          {this.state.invoiceDetails && this.invoiceLineItemsData()}
        </ScrollView>
        {this.state.invoiceDetails && (
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
            onPress={() =>
              this.props.navigation.navigate('AddMargin', {
                invoiceDetails: this.state.invoiceDetails,
              })
            }>
            <Text style={{fontSize: 20, color: Colors.white}}>Continue</Text>
          </TouchableOpacity>
        )}
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
