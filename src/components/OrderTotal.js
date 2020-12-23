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
export default class QualityBanner extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: Colors.lightGray,
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 4,
          }}>
          <Text style={{fontSize: 16}}>Product Charges:</Text>
          <Text style={{fontSize: 16}}>PKR 300</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 4,
          }}>
          <Text style={{fontSize: 16}}>Shipping Charges:</Text>
          <Text style={{fontSize: 16}}>PKR 30</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 4,
            borderTopWidth: 1,
            borderTopColor: Colors.color1,
          }}>
          <Text style={{fontSize: 16, marginBottom: 12, fontWeight: '600'}}>
            Total Amount
          </Text>
          <Text style={{fontSize: 16, marginBottom: 12, fontWeight: '600'}}>
            PKR 330
          </Text>
        </View>
      </View>
    );
  }
}
