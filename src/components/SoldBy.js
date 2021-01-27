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
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
export default class SoldBy extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: Colors.white,
          marginBottom: 50,
          marginHorizontal: 12,
          borderRadius: 10
        }}>
        <View style={{ backgroundColor: Colors.lightGray2, padding: 8, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={{fontSize: 14, fontFamily: Fonts.light }}>SOLD BY</Text>
          </View>
        </View>
        <View style={{ padding: 12, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={{fontSize: 14, fontFamily: Fonts.medium }}>{this.props.companyName}</Text>
          </View>
        </View>
      </View>
    );
  }
}
