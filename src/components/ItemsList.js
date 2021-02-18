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
import Fonts from '../utils/fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImgToBase64 from 'react-native-image-base64';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {inject} from 'mobx-react';
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
export default class ItemGroupCard extends Component {
  constructor(props) {
    super(props);
    const {Products} = this.props;
    this.state = {
      name: Products.item.name,
      data: Products.item.data,
      images: Products.item.images,
      price: Products.item.data[0].price,
    };
  }
  shareProduct = async () => {
    this.props.shareProduct(true);
    // this.props.loading(true);
    var myImages = await this.convertTo64();
    console.log('The images of this product are ');
    this.props.productImages(myImages);
  };
  convertTo64 = async () => {
    let myImages = [];

    for (const item of this.state.images) {
      // console.log('item' + item);
      await ImgToBase64.getBase64String(item)
        .then((base64String) => {
          // console.log('Converting' + base64String);
          base64String = 'data:image/png;base64,' + base64String;
          myImages.push(base64String);
        })
        .catch((err) => console.log('My error is ', err));
    }

    return myImages;
  };
  componentDidMount = async () => {
    console.log('item group product details ', this.props.Products);
    console.log('item group price ', this.props.Products.item.images[0]);
  };
  render() {
    const images = this.state.images;
    return (
      <TouchableOpacity
        style={styles.productCard}
        activeOpacity={1}
        onPress={() =>
          this.props.navigation.navigate('ProductDetail', {
            details: this.props.Products.item,
          })
        }>
        <View
          style={{
            flexDirection: 'row',
            height: 220,
            justifyContent: 'space-evenly',
          }}>
          {images.length === 1 && (
            <View
              style={{
                flexDirection: 'row',
                height: 220,
              }}>
              <Image
                style={{
                  width: Dimensions.get('screen').width,
                  height: 210,
                  marginTop: 20,
                }}
                source={{uri: images[0]}}
              />
            </View>
          )}
          {images.length === 2 && (
            <View
              style={{
                flexDirection: 'row',
                height: 220,
                justifyContent: 'space-evenly',
              }}>
              <Image
                style={{
                  width: Dimensions.get('screen').width / 2,
                  height: 210,
                  marginTop: 20,
                }}
                source={{uri: images[0]}}
              />
              <Image
                style={{
                  width: Dimensions.get('screen').width / 2,
                  height: 210,
                  marginTop: 20,
                }}
                source={{uri: images[1]}}
              />
            </View>
          )}
          {images.length > 2 && (
            <View
              style={{
                flexDirection: 'row',
                height: 220,
                justifyContent: 'space-evenly',
              }}>
              <Image
                style={{
                  width: Dimensions.get('screen').width / 2,
                  height: 210,
                  marginTop: 20,
                }}
                source={{uri: images[0]}}
              />
              <View>
                <Image
                  style={{
                    width: Dimensions.get('screen').width / 3,
                    height: 100,
                    marginTop: 20,
                  }}
                  source={{uri: images[1]}}
                />
                <View
                  style={{
                    justifyContent: 'space-around',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{
                      width: Dimensions.get('screen').width / 3,
                      height: 100,
                      marginTop: 10,
                    }}
                    source={{uri: images[2]}}
                  />
                  <View
                    style={{
                      ...StyleSheet.absoluteFillObject,
                      backgroundColor: 'rgba(0,0,0,0.6)',
                    }}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 32,

                        color: Colors.white,
                      }}>
                      +{images.length - 2}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
        <View style={{marginTop: 20, paddingHorizontal: 12}}>
          <Text
            style={{
              fontSize: 16,
              paddingVertical: 6,
              fontFamily: Fonts.regular,
            }}>
            {this.state.name}
          </Text>
          <Text
            style={{fontSize: 12, paddingVertical: 6, fontFamily: Fonts.light}}>
            PKR {this.state.price}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: Colors.white,
            }}>
            <MaterialCommunityIcons
              name="truck-outline"
              size={20}
              color={Colors.color3}
            />
            <Text
              style={{
                paddingLeft: 4,
                color: Colors.color3,
              }}>
              Free Delivery
            </Text>
          </View>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              borderColor: Colors.color3,
              borderRadius: 5,
              borderWidth: 1,
              marginTop: 20,
              flexDirection: 'row',
              padding: 12,
            }}
            onPress={() => this.shareProduct()}>
            <FontAwesome
              name="share-square-o"
              size={20}
              color={Colors.color3}
            />
            <Text
              style={{
                fontSize: 18,
                color: Colors.color3,
                fontFamily: Fonts.regular,
                paddingLeft: 12,
              }}>
              Share Now
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  inputStyle: {
    paddingHorizontal: 10,
    shadowColor: 'black',
    borderColor: Colors.color2,
    borderWidth: 1,
    paddingVertical: 8,
    borderRadius: 6,
    marginHorizontal: 12,
    backgroundColor: Colors.lightGray,
    marginBottom: 8,
    color: 'black',
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  header: {
    borderBottomColor: Colors.borderGray,
    borderBottomWidth: 1,
  },
  productCard: {
    backgroundColor: Colors.white,
    borderColor: Colors.color5,
    paddingVertical: 8,
    marginBottom: 8,
  },
});
