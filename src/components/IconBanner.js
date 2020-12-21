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
export default class IconBanner extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{backgroundColor: Colors.white}}>
        <View
          style={{
            marginTop: 12,
            paddingVertical: 12,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <View
            style={{
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <FontAwesome
              name="history"
              size={32}
              style={{marginBottom: 12}}
              color={Colors.color2}
            />
            <Text>7 Days Easy </Text>
            <Text>Return</Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <FontAwesome
              name="truck"
              size={32}
              style={{marginBottom: 12}}
              color={Colors.color2}
            />
            <Text>Direct Delivery</Text>
            <Text>To Customer</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 10, color: Colors.color2}}>
            More Information
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
