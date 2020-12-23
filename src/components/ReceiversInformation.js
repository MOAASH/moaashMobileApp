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
        <Text style={{fontSize: 16, marginBottom: 4, fontWeight: '600'}}>
          Shipping Address
        </Text>

        <Text style={{fontSize: 16, marginBottom: 4}}>Hamza Humayun</Text>
        <Text style={{fontSize: 16, marginBottom: 4}}>03331473395</Text>
        <Text style={{fontSize: 16, marginBottom: 4}}>
          House No 318 E Street 1 DHA Phase 5
        </Text>
      </View>
    );
  }
}
