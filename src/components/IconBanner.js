import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import Colors from '../utils/colors';
import Fonts from '../utils/fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
              color={Colors.color4}
            />
            <Text style={{ fontFamily: Fonts.regular, fontSize: 12 }}>7 Days Easy </Text>
            <Text style={{ fontFamily: Fonts.regular, fontSize: 12 }}>Return</Text>
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
              color={Colors.color4}
            />
            <Text style={{ fontFamily: Fonts.regular, fontSize: 12 }}>Direct Delivery</Text>
            <Text style={{ fontFamily: Fonts.regular, fontSize: 12 }}>To Customer</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            paddingBottom: 8,
          }}
          onPress={() =>
            Alert.alert(
              'Return Policy',
              'You can request return of the product within 7 days after delivery of the product. The product should be unused, undamaged and in original condition.',
              [
                {
                  text: 'OK',
                },
              ],
              {cancelable: false},
            )
          }>
          <Text style={{fontSize: 12, color: Colors.color2, fontFamily: Fonts.extraLight}}>
            More Information
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
