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

export default class CategoriesListm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <FontAwesome
          name="list-alt"
          size={40}
          style={{fontWeight: '700'}}
          color={Colors.color1}
        />
        <Text style={{alignSelf: 'center', fontSize: 11, color: Colors.color2}}>
          {' '}
          Categories
        </Text>
      </View>
    );
  }
}
