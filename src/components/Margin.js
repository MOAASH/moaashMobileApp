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
export default class Margin extends Component {
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
          <Text style={{fontSize: 16}}>Your Profit Margin:</Text>
          <TextInput
            style={{
              shadowOpacity: 0.2,
              shadowColor: 'black',
              borderColor: Colors.color2,
              borderBottomWidth: 1,
              paddingVertical: 4,
              borderRadius: 6,
              paddingHorizontal: 16,
              color: 'black',
            }}
            label="Banks"
            mode="outlined"
            keyboardType="numeric"
            returnKeyType="done"
            onChangeText={(text) => this.setState({email: text})}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 12,
            paddingVertical: 4,
            borderTopWidth: 1,
            borderTopColor: Colors.color1,
          }}>
          <Text style={{fontSize: 16, marginBottom: 12, fontWeight: '600'}}>
            Final Price
          </Text>
          <Text style={{fontSize: 16, marginBottom: 12, fontWeight: '600'}}>
            PKR 430
          </Text>
        </View>
      </View>
    );
  }
}
