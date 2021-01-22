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
import Fonts from '../utils/fonts'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {inject} from 'mobx-react';

export default class QualityBanner extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: Colors.color5,
          padding: 12,
          marginBottom: 12,
        }}>
        <Text style={{alignSelf: 'center', fontSize: 16, color: Colors.white, fontFamily: Fonts.medium }}>
          Our Quality Assurance team makes sure
        </Text>
        <Text style={{alignSelf: 'center', fontSize: 16, color: Colors.white, fontFamily: Fonts.medium }}>
          that what you see is what you get
        </Text>
      </View>
    );
  }
}
