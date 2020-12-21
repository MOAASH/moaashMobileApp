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
          flexDirection: 'row',
          position: 'absolute',
          bottom: 0,

          paddingTop: 1,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.white,
            flexDirection: 'row',
            padding: 8,
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            width: SCREEN_WIDTH / 2,
            borderTopColor: Colors.borderGray,
            borderWidth: 1,
          }}
          onPress={() => this.shareProduct()}>
          <FontAwesome
            name="shopping-cart"
            size={20}
            style={{fontWeight: '700'}}
            color={Colors.color2}
          />
          <Text
            style={{
              fontSize: 18,

              alignSelf: 'center',
              color: Colors.color2,
              paddingLeft: 12,
            }}>
            ADD TO CART
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.color3,
            flexDirection: 'row',
            padding: 8,
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            width: SCREEN_WIDTH / 2,
          }}
          onPress={() => this.props.navigation.navigate('Home')}>
          <FontAwesome
            name="share-square"
            size={20}
            style={{fontWeight: '700'}}
            color={Colors.white}
          />
          <Text
            style={{
              fontSize: 18,

              alignSelf: 'center',
              color: Colors.white,
              paddingLeft: 12,
            }}>
            Share Now
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
