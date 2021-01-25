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
export default class SenderInformation extends Component {
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
          Sender's Information
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 16, marginBottom: 4}}>Name</Text>
          <Text style={{fontSize: 16, marginBottom: 4}}>Hamza</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 16, marginBottom: 4}}>Phone Number</Text>
          <Text style={{fontSize: 16, marginBottom: 4}}>03331473395</Text>
        </View>
      </View>
    );
  }
}
