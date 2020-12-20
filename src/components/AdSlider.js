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

export default class AdSlider extends Component {
  constructor(props) {
    super(props);
    const {AdImage} = this.props;
    this.state = {
      image: AdImage.item,
    };
  }

  render() {
    console.log('Ad data is ', this.state.image);
    return (
      <View style={{alignItems: 'center'}}>
        <Image
          style={{
            width: Dimensions.get('screen').width,
            height: 240,
          }}
          source={require('../../assets/MoaashBanner.png')}
          resizeMode="contain"
        />
      </View>
    );
  }
}
