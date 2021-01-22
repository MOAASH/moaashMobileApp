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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {inject} from 'mobx-react';
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
export default class ItemGroupList extends Component {
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
  componentDidMount = async () => {
    console.log('item group name ', this.props.Products.item.name);
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
          <Image
            style={{
              width: Dimensions.get('screen').width,
              height: 210,
              marginTop: 20,
            }}
            source={{uri: images[0]}}
          />
        </View>
        <View style={{marginTop: 20, paddingHorizontal: 12 }}>
          <Text style={{fontSize: 16, paddingVertical: 6, fontFamily: Fonts.regular }}>{this.state.name}</Text>
          <Text style={{fontSize: 12, paddingVertical: 6, fontFamily: Fonts.light }}>PKR {this.state.price}</Text>
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
                color: Colors.color3
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
            <Text style={{fontSize: 18, color: Colors.color3, fontFamily: Fonts.regular, paddingLeft: 12}}>
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
