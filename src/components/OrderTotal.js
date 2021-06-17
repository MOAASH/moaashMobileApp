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
import {RFValue} from '../utils/fontSizeStyling';
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
export default class OrderTotal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalAmount:
        parseInt(this.props.totalAmount),
    };
  }
  componentDidMount = async () => {
    // console.log('CHECKING CUSTOMRER S LAST PRICE ', this.props.orderSummary);
  };

  calculateTotalAmount = () => {
    return (
      parseInt(this.props.totalAmount)
    );
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: Colors.white,
          margin: 12,
          borderRadius: 10,
        }}>
        <View
          style={{
            paddingVertical: 4,
            backgroundColor: Colors.white,
            paddingHorizontal: 16,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomWidth: 1,
            borderBottomColor: Colors.lightGray2,
          }}>
          <View style={{paddingTop: 8, flexDirection: 'row'}}>
            <Image
              resizeMode="contain"
              source={require('../../assets/currencyI_icon.png')}
              style={{width: 20, height: 20, alignSelf: 'center'}}
            />
            <Text
              style={{
                fontSize: RFValue(10),
                paddingLeft: 4,
                fontFamily: Fonts.regular,
                color: Colors.balck,
              }}>
              Payment Method
            </Text>
          </View>
          <Text
            style={{
              fontSize: RFValue(10),
              fontFamily: Fonts.regular,
              color: Colors.Gray,
            }}>
            Cash On Delivery
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 4,
            paddingHorizontal: 16,
          }}>
          <Text
            style={{
              fontSize: RFValue(10),
              fontFamily: Fonts.regular,
              color: Colors.Gray,
            }}>
            Product Charges
          </Text>
          <Text style={{fontSize: RFValue(10), fontFamily: Fonts.regular}}>
            PKR {this.props.totalAmount}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingBottom: this.props.orderSummary ? 0 : 12,
            paddingTop: 12,
            borderBottomLeftRadius: this.props.orderSummary ? 0 : 10,
            borderBottomRightRadius: this.props.orderSummary ? 0 : 10,
            alignItems: 'center',
            backgroundColor: Colors.color6,
          }}>
          <Text
            style={{
              fontSize: RFValue(10),
              fontFamily: Fonts.regular,
              color: Colors.color1,
            }}>
            Order Total
          </Text>
          <Text
            style={{
              fontSize: RFValue(10),
              fontFamily: Fonts.regular,
              color: Colors.color1,
            }}>
            PKR {this.calculateTotalAmount()}
          </Text>
        </View>

        {this.props.orderSummary && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              paddingVertical: 12,
              alignItems: 'center',
              flex: 3,
              backgroundColor: Colors.color6,
            }}>
            <Text
              style={{
                fontSize: RFValue(10),
                flex: 2,
                fontFamily: Fonts.regular,
                color: Colors.color1,
              }}>
              Final Customer Price
            </Text>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text
                style={{
                  fontSize: RFValue(10),
                  flex: 1,
                  fontFamily: Fonts.regular,
                  color: Colors.color1,
                }}>
                PKR {this.props.totalCustomerPrice}
              </Text>
            </View>
          </View>
        )}

        {this.props.orderSummary && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              paddingVertical: 12,
              alignItems: 'center',
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              backgroundColor: Colors.white,
            }}>
            <Text
              style={{
                fontSize: RFValue(10),
                fontFamily: Fonts.regular,
                color: 'green',
              }}>
              Margin You Earn
            </Text>
            <Text
              style={{
                fontSize: RFValue(10),
                fontFamily: Fonts.regular,
                color: 'green',
              }}>
              PKR {this.props.totalCustomerPrice - this.calculateTotalAmount()}
            </Text>
          </View>
        )}
      </View>
    );
  }
}
