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
          backgroundColor: Colors.white,
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}>
        <Text style={{fontSize: 16, marginBottom: 12, fontWeight: '600'}}>
          Product Details
        </Text>
        <Text>Shirt Fabric: Cotton</Text>
        <Text>Shirt Color: Red, Yellow, Green</Text>
        <Text>Sizes: Small, Medium, Large</Text>
      </View>
    );
  }
}