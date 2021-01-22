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
import Fonts from '../utils/fonts';
import {inject} from 'mobx-react';
import files from '../components/imageFile64';
import SizeCard from '../components/SizeCard';

const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height);
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);

@inject('User')
@inject('Products')
export default class SelectSizePopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      choosenSize: '',
      selected: false,
      isSizeSelected: {}
    };
  }
  componentDidMount = async () => {
    console.log('size is  ', this.props.sizes);
    const container = {};
    let isSizeSelected = this.props.sizes.map( size => {
      container[size] = false;
    });
    await this.setState({ isSizeSelected: container });
    
  };
  subtract = async () => {
    if (this.state.quantity > 1) {
      this.setState({quantity: this.state.quantity - 1});
    }
  };
  sizeChoosen = async (item) => {
    var isSizeSelected = this.state.isSizeSelected;
    isSizeSelected[this.state.choosenSize] = false;
    isSizeSelected[item] = true;
    this.setState({selected: true, choosenSize: item, isSizeSelected: isSizeSelected});
  };
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.props.addToCart(false)}>
        <View
          style={{
            backgroundColor: Colors.white,
            paddingBottom: 12,
            width: SCREEN_WIDTH / 1.2,
            paddingHorizontal: 16,
          }}>
          <View>
            <Text
              style={{
                fontSize: 18,
                fontFamily: Fonts.regular,
                paddingVertical: 20,
              }}>
              Select 1 size only:
            </Text>
            {Object.keys(this.state.isSizeSelected).length > 0 && 
              <FlatList
                numColumns={8}
                data={this.props.sizes}
                renderItem={({item}) => (
                  <SizeCard
                    size={item}
                    scrollEnabled={false}
                    selected={this.state.isSizeSelected[item]}
                    navigation={this.props.navigation}
                    sizeChoosen={this.sizeChoosen}
                  />
                )}
                keyExtractor={(item) => item.id}
              />
            }
            
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 12,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 12,
                  alignSelf: 'center',
                  paddingRight: 10,
                  fontFamily: Fonts.regular
                }}>
                Quantity
              </Text>
              <Text style={{ fontFamily: Fonts.regular }}>{this.state.quantity}</Text>
            </View>
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
            <Text style={{fontSize: 16, color: Colors.white, fontFamily: Fonts.light }}>ADD TO CART</Text>
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
                color: Colors.color2,
                fontFamily: Fonts.light,
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
