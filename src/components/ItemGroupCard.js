import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import Colors from '../utils/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImgToBase64 from 'react-native-image-base64';
import {inject} from 'mobx-react';
@inject('Products')
export default class ItemGroupCard extends Component {
  constructor(props) {
    super(props);
    const {Products} = this.props;
    this.state = {
      id: Products.item.id,
      attributes: Products.item.attributes,
      sharing: false,
    };
  }
  shareProduct = async () => {
    // console.log('Lets share ', this.state.id);
    this.props.number(this.state.id);
    var myImages = await this.convertImage();
    this.props.productImages(myImages);
    this.props.message(this.state.attributes.shareable_message);
    this.props.shareProduct(true);
  };
  convertImage = async () => {
    let myImages = [];

    for (const item of this.state.attributes.items_images) {
      await ImgToBase64.getBase64String(item)
        .then((base64String) => {
          base64String = 'data:image/png;base64,' + base64String;
          myImages.push(base64String);
        })
        .catch((err) => console.log('My error is ', err));
    }
    return myImages;
  };
  componentDidMount = async () => {
    // console.log('item group description is ', this.state.attributes);
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
              Share Catalogue
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
