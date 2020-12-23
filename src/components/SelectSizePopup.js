import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  ScrollView,
  //   Share,
  Linking,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from '../utils/axios';
import Share from 'react-native-share';
import Colors from '../utils/colors';
import {inject} from 'mobx-react';
import files from '../components/imageFile64';

const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height);
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
export default class WhatsappPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };
  }
  componentDidMount = async () => {
    // console.log('Image is  ', files.image1);
  };
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.props.addToCart(false)}>
        <View
          style={{
            backgroundColor: Colors.white,
            paddingVertical: 24,
            width: SCREEN_WIDTH / 1.2,
            paddingHorizontal: 16,
          }}>
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                paddingVertical: 4,
              }}>
              Select Size
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <TouchableOpacity
                style={{
                  borderColor: Colors.color2,
                  borderRadius: 20,
                  borderWidth: 2,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                }}>
                <Text>S</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderColor: Colors.color2,
                  borderRadius: 20,
                  borderWidth: 2,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                }}>
                <Text>M</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderColor: Colors.color2,
                  borderRadius: 20,
                  borderWidth: 2,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                }}>
                <Text>L</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 12,
            }}>
            <Text
              style={{
                fontSize: 18,
                alignSelf: 'center',
                fontWeight: '600',
                paddingTop: 4,
              }}>
              Quantity : {this.state.quantity}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.borderGray,
                  justifyContent: 'space-around',
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                }}
                onPress={() =>
                  this.setState({quantity: this.state.quantity - 1})
                }>
                <Text>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.borderGray,
                  justifyContent: 'space-around',
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                }}
                onPress={() =>
                  this.setState({quantity: this.state.quantity + 1})
                }>
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              backgroundColor: Colors.color2,
              borderRadius: 5,
              padding: 8,
              marginTop: 20,
            }}
            onPress={() => {
              this.props.addToCart(false);
              this.props.addedtoCart(true);
            }}>
            <Text style={{fontSize: 18, color: Colors.white}}>ADD TO CART</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              borderRadius: 5,
              marginTop: 5,
            }}
            onPress={() => this.props.addToCart(false)}>
            <Text
              style={{
                fontSize: 18,
                color: Colors.color3,
                textDecorationLine: 'underline',
                alignSelf: 'center',
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
});
