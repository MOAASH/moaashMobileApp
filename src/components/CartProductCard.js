import React, {Component} from 'react';
import {View, Image, Text} from 'react-native';
import Colors from '../utils/colors';
import Fonts from '../utils/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from '../utils/fontSizeStyling';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class CartProdcutCard extends Component {
  
  
  render() {
    return (
      <View style={{padding: 12, flexDirection: 'row'}}>
        <View>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            style={{width: 100, height: 100}}
            source={{
              uri: this.props.invoiceLineItem.data.attributes.item_details.data
                .attributes.images[0],
              priority: FastImage.priority.normal,
            }}
          />
        </View>
        <View style={{flex: 1, paddingLeft: 4}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 15, fontFamily: Fonts.regular}}>
              {
                this.props.invoiceLineItem.data.attributes.item_details.data
                  .attributes.name
              }
            </Text>
            {this.props.destroy && (
              <TouchableOpacity onPress={() => this.props.delete_invoice_line_item(this.props.invoiceLineItem.data.id)}>
                <Ionicons name="trash" size={20} color={Colors.Gray}/>
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 4,
            }}>
            <Text style={{fontSize: RFValue(10), color: Colors.Gray}}>
              Price
            </Text>
            <Text style={{fontSize: RFValue(10)}}>
              PKR {this.props.invoiceLineItem.data.attributes.sale_price}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 4,
            }}>
            <Text style={{fontSize: RFValue(10), color: Colors.Gray}}>
              Size
            </Text>
            <Text style={{fontSize: RFValue(10)}}>
              {
                this.props.invoiceLineItem.data.attributes.item_details.data
                  .attributes.size
              }
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 4,
            }}>
            <Text style={{fontSize: RFValue(10), color: Colors.Gray}}>
              Quantity
            </Text>
            <Text style={{fontSize: RFValue(10)}}>
              {this.props.invoiceLineItem.data.attributes.quantity}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
