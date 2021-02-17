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
import Clipboard from '@react-native-community/clipboard';
import Colors from '../utils/colors';
import Fonts from '../utils/fonts';
import HTML from 'react-native-render-html';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {showMessage} from 'react-native-flash-message';
import {inject} from 'mobx-react';
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
export default class ProductDetailDescription extends Component {
  constructor(props) {
    super(props);
  }

  copyToClipboard = () => {
    console.log('hellor');
    Clipboard.setString(this.props.description.replace(/<[^>]+>/g, '\n'));
    showMessage({
      message: 'The description has been copied.',
      type: 'success',
      icon: 'success',
    });
  };
  render() {
    return (
      <View
        style={{
          backgroundColor: Colors.white,
        }}>
        <View
          style={{
            backgroundColor: Colors.lightGray2,
            padding: 8,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 14, fontFamily: Fonts.regular}}>
              PRODUCT DETAILS
            </Text>
          </View>
          <View>
            <TouchableOpacity
              activeOpacity={0.6}
              style={{
                borderWidth: 1,
                borderColor: Colors.silver,
                paddingVertical: 4,
                paddingHorizontal: 8,
              }}
              onPress={() => this.copyToClipboard()}>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: Fonts.regular,
                  color: Colors.color5,
                }}>
                COPY
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{paddingHorizontal: 12}}>
          <HTML
            source={{
              html: this.props.description,
            }}
            style={{fontSize: 18, color: Colors.Gray}}
            containerStyle={{paddingTop: 12}}
            tagsStyles={{
              div: {
                fontFamily: Fonts.extraLight,
                color: Colors.black,
              },
            }}
          />
        </View>
      </View>
    );
  }
}
