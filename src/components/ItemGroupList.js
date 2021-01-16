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
export default class ItemGroupList extends Component {
  constructor(props) {
    super(props);
    const {Products} = this.props;
    this.state = {
      id: Products.item.id,
      attributes: Products.item.attributes,
    };
  }
  componentDidMount = async () => {
    console.log('item group images ', this.state.attributes.items_images[0]);
  };
  render() {
    const images = this.state.attributes.items_images;
    return (
      <TouchableOpacity
        style={styles.productCard}
        onPress={() =>
          this.props.navigation.navigate('ItemGroupDetails', {
            groupID: this.state.id,
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
                  + 2
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{marginTop: 20, paddingHorizontal: 16}}>
          <Text style={{fontSize: 18}}>{this.state.attributes.name}</Text>
          <Text style={{fontSize: 16}}>
            Starting from PKR {this.state.attributes.starting_price}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: Colors.lightGray,
              padding: 4,
              width: 150,
            }}>
            <FontAwesome
              name="truck"
              size={40}
              style={{fontWeight: '700'}}
              color={Colors.color2}
            />
            <Text
              style={{
                alignSelf: 'center',
                paddingLeft: 4,
                fontWeight: '600',
              }}>
              Free Delivery
            </Text>
          </View>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              backgroundColor: Colors.color3,
              borderRadius: 5,
              marginTop: 20,
              flexDirection: 'row',
              padding: 12,
            }}
            onPress={() => this.shareProduct()}>
            <FontAwesome
              name="share-square"
              size={20}
              style={{fontWeight: '700'}}
              color={Colors.white}
            />
            <Text style={{fontSize: 18, color: Colors.white, paddingLeft: 12}}>
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
    borderTopWidth: 1,
    borderColor: Colors.color5,
    paddingVertical: 8,
    marginBottom: 8,
  },
});
