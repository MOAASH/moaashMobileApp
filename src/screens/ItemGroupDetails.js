import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
  TextInput,
  FlatList,
  ImageBackground,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import axios from '../utils/axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HTML from 'react-native-render-html';

import Colors from '../utils/colors';
import Fonts from '../utils/fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {inject} from 'mobx-react';
import CategoriesList from '../components/CategoriesList';
import AdSlider from '../components/AdSlider';
import QualityBanner from '../components/QualityBanner';
import WhatsappPopup from '../components/WhatsappPopup';
import Loader from '../components/Loader';
import ItemsList from '../components/ItemsList';
import {showMessage} from 'react-native-flash-message';

const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height);
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
@inject('User')
@inject('Products')
export default class ItemGroupDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: true,
      sharing: false,
      itemsData: {},
      itemGroupData: {},
      copied_text: '',
      image: [],
    };
  }

  componentDidMount = async () => {
    this.setState({loaded: true});
    console.log(
      'item group details and items are ',
      this.props.navigation.state.params.groupID,
    );

    await this.getItemGroups();
  };

  getItemGroups = async () => {
    let [
      gettingItem,
      currentItemGroup,
      Items,
    ] = await this.props.Products.getItems(
      this.props.navigation.state.params.groupID,
    );
    console.log('item group data ', currentItemGroup);
    this.setState({
      itemGroupData: currentItemGroup.attributes,
      itemsData: Items,
    });
    this.setState({loaded: false});
    console.log('items data ', this.state.itemsData);
  };

  shareProduct = async () => {
    this.setState({sharing: true});
  };

  hidePopup = async () => {
    this.setState({sharing: false});
  };
  productImages = async (productImages) => {
    console.log('My images are: ', productImages);
    this.setState({images: productImages});
  };

  copyToClipboard = () => {
    Clipboard.setString(
      this.state.itemGroupData.description.replace(/<[^>]+>/g, '\n'),
    );
    showMessage({
      message: 'The description has been copied.',
      type: 'success',
      icon: 'success',
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {!this.state.loaded && (
          <FlatList
            ListHeaderComponent={
              <>
                <View
                  style={{
                    paddingTop: 12,
                    backgroundColor: Colors.white,
                    margin: 8,
                    borderRadius: 10,
                  }}>
                  <View style={{paddingHorizontal: 12}}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: Colors.black,
                        fontFamily: Fonts.regular,
                      }}>
                      {this.state.itemGroupData.name}
                    </Text>
                  </View>
                  <View style={{paddingHorizontal: 12}}>
                    <HTML
                      source={{
                        html: this.state.itemGroupData.description
                          ? this.state.itemGroupData.description
                          : ' ',
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
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      flex: 2,
                    }}>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: Colors.lightGray,
                        flex: 1,
                        padding: 8,
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        style={{flexDirection: 'row', alignItems: 'center'}}
                        onPress={() => this.copyToClipboard()}>
                        <FontAwesome
                          name="copy"
                          size={12}
                          color={Colors.color2}
                        />
                        <Text
                          style={{
                            paddingLeft: 4,
                            fontSize: 12,
                            color: Colors.color2,
                            fontFamily: Fonts.regular,
                          }}>
                          Copy Details
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: Colors.lightGray,
                        flex: 1,
                        padding: 8,
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <FontAwesome
                          name="heart-o"
                          size={12}
                          color={Colors.color2}
                        />
                        <Text
                          style={{
                            paddingLeft: 4,
                            fontSize: 12,
                            color: Colors.color2,
                            fontFamily: Fonts.regular,
                          }}>
                          Wishlist
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </>
            }
            keyExtractor={(item) => item.id}
            data={this.state.itemsData}
            renderItem={(item) => (
              <ItemsList
                Products={item}
                scrollEnabled={false}
                navigation={this.props.navigation}
                shareProduct={this.shareProduct}
                productImages={this.productImages}
              />
            )}
          />
        )}

        {this.state.loaded && <Loader />}
        {this.state.sharing && (
          <WhatsappPopup
            hidePopup={this.hidePopup}
            images={this.state.images}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
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
