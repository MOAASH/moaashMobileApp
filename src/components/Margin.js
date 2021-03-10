import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import axios from '../utils/axios';
import Colors from '../utils/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {inject} from 'mobx-react';
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
import {RFValue} from '../utils/fontSizeStyling';
import Fonts from '../utils/fonts';
import Loader from '../components/Loader';
export default class Margin extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   loaded: true,
    // };
  }

  render() {
    // console.log('==========> ', this.props.totalAmount());
    return (
      <View
        style={{
          backgroundColor: Colors.white,
          margin: 12,
          borderRadius: 10,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 4,
            paddingHorizontal: 16,
          }}>
          <View style={{flex: 1}}>
            <Text
              style={{
                fontSize: RFValue(10),
                fontFamily: Fonts.regular,
                color: Colors.black,
              }}>
              Final Customer Price
            </Text>
            <Text
              style={{
                fontSize: RFValue(8),
                fontFamily: Fonts.regular,
                color: Colors.Gray,
              }}>
              (including margin)
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text style={{fontSize: RFValue(10), fontFamily: Fonts.regular}}>
                PKR {this.props.totalAmount}
              </Text>
            </View>
            <View style={{flex: 1}}>
              <TextInput
                style={{
                  flex: 1,
                  shadowColor: 'black',
                  borderColor: Colors.color2,
                  borderBottomWidth: 1,
                  color: Colors.color1,
                }}
                onChangeText={(value) =>
                  this.props.addCustomerPriceValue(value)
                }
                keyboardType="numeric"
                returnKeyType="done"
              />
            </View>
          </View>
        </View>
        {this.props.customerPrice < this.props.totalAmount() &&
          this.props.customerPrice > 0 && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 4,
                paddingHorizontal: 16,
              }}>
              <Text
                style={{
                  fontSize: RFValue(8),
                  color: 'red',
                  fontFamily: Fonts.regular,
                }}>
                Please enter the amount greater or equal to Order Total (PKR{' '}
                {this.props.totalAmount()})
              </Text>
            </View>
          )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 8,
            paddingHorizontal: 16,
          }}>
          <Text
            style={{
              fontSize: RFValue(10),
              fontFamily: Fonts.regular,
              color: 'green',
            }}>
            Margin you Earn
          </Text>
          <Text
            style={{
              fontSize: RFValue(10),
              fontFamily: Fonts.regular,
              color: 'green',
            }}>
            PKR {this.props.marginValue}
          </Text>
        </View>
      </View>
    );
  }
}
