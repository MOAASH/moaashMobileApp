import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import axios from '../utils/axios';
import Colors from '../utils/colors';
import Fonts from '../utils/fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {inject} from 'mobx-react';
import { showMessage } from "react-native-flash-message";
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);

@inject('User')
@inject('Products')
@inject('Cart')
export default class AddToCartButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addToCart: false,
      checkout: props.checkout
    };
  }
  onButtonPress = async () => {
    console.log('Going to checkout');
    if (this.props.checkout === true) {
      this.props.loading(true);
      let [createInvoice, errorMessage] = await this.props.Cart.addToInvoice(
        this.props.User.userInformation.attributes.authentication_token,
        this.props.Products.companyDetails.id,
        this.props.selectedQuantity,
        this.props.selectedItem,
      );
      this.props.loading(false);
      if (createInvoice) {
        console.log('checkouting jaanu');
        this.props.addToCart(true);

      } else {
        if ('quantity' in errorMessage) {
          console.log("============> YEahh fuck");
          showMessage({
            message: `Quantity ${errorMessage['quantity']}`,
            type: "danger",
            icon: "danger"
          });
        }
        this.props.addToCart(false);
      }
    } else {
      console.log("===================")
      this.props.addToCart(true);
    }
  };
  render() {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          paddingTop: 1,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.color3,
            flexDirection: 'row',
            paddingBottom: 30,
            padding: 8,
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            width: SCREEN_WIDTH,
            borderTopColor: Colors.borderGray,
            borderWidth: 1,
          }}
          onPress={() => this.onButtonPress()}>
          <FontAwesome
            name="shopping-cart"
            size={20}
            style={{fontWeight: '700'}}
            color={Colors.white}
          />
          {this.props.checkout ? (
            <Text
              style={{
                fontSize: 18,
                alignSelf: 'center',
                color: Colors.white,
                paddingLeft: 12,
                fontFamily: Fonts.bold
              }}>
              Proceed To Checkout
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 18,
                alignSelf: 'center',
                color: Colors.white,
                paddingLeft: 12,
                fontFamily: Fonts.bold
              }}>
              ADD TO CART
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}
