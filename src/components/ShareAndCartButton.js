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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {inject} from 'mobx-react';
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);

@inject('User')
@inject('Products')
export default class QualityBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addToCart: false,
    };
  }
  onButtonPress = async () => {
    if (this.props.checkout === true) {
      this.props.loading(true);
      this.props.navigation.navigate('Checkout');
    } else {
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
              }}>
              ADD TO CART
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}
