import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  SafeAreaView,
  FlatList,
  Linking,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from '../utils/axios';
import Share from 'react-native-share';
import Colors from '../utils/colors';
import {inject} from 'mobx-react';
import files from '../components/imageFile64';
import SizeCard from '../components/SizeCard';

const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height);
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);

@inject('User')
@inject('Products')
export default class WhatsappPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      choosenSize: '',
      selected: false,
    };
  }
  componentDidMount = async () => {
    console.log('size is  ', this.props.sizes);
  };
  subtract = async () => {
    if (this.state.quantity < 1) {
      this.setState({quantity: 0});
    } else {
      this.setState({quantity: this.state.quantity - 1});
    }
  };
  sizeChoosen = async (item) => {
    console.log('Done baby ', item);
    this.setState({selected: true, choosenSize: item});
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
                paddingVertical: 20,
              }}>
              Select Size
            </Text>
            <FlatList
              numColumns={8}
              data={this.props.sizes}
              renderItem={({item}) => (
                <SizeCard
                  size={item}
                  scrollEnabled={false}
                  navigation={this.props.navigation}
                  sizeChoosen={this.sizeChoosen}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 12,
            }}>
            {this.state.quantity < 0 ? (
              <Text
                style={{
                  fontSize: 18,
                  alignSelf: 'center',
                  fontWeight: '600',
                  paddingTop: 4,
                }}>
                Quantity : 0
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 18,
                  alignSelf: 'center',
                  fontWeight: '600',
                  paddingTop: 4,
                }}>
                Quantity : {this.state.quantity}
              </Text>
            )}
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.borderGray,
                  justifyContent: 'space-around',
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                }}
                onPress={() => this.subtract()}>
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
              this.props.addedtoCart([
                true,
                this.state.choosenSize,
                this.state.quantity,
              ]);
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
