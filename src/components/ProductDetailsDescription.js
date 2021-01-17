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
import HTML from 'react-native-render-html';
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
        <Text style={{fontSize: 16, fontWeight: '600'}}>Product Details</Text>
        <HTML
          source={{
            html: this.props.description,
          }}
          contentWidth={SCREEN_WIDTH}
          style={{fontSize: 18, fontWeight: '600'}}
          containerStyle={{paddingTop: 12}}
          tagsStyles={
            (div = {
              textAlign: 'center',
              fontStyle: 'italic',
              color: 'grey',
            })
          }
        />
      </View>
    );
  }
}
