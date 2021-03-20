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
  Icon,
  AppState,
  FlatList,
  ImageBackground,
} from 'react-native';
import axios from '../utils/axios';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../utils/colors';
import Fonts from '../utils/fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {inject} from 'mobx-react';
import CategoriesList from '../components/CategoriesList';
import AdSlider from '../components/AdSlider';
import QualityBanner from '../components/QualityBanner';
import WhatsappPopup from '../components/WhatsappPopup';
import ItemGroupCard from '../components/ItemGroupCard';
import Loader from '../components/Loader';
import {RFValue} from '../utils/fontSizeStyling';

const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height);
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
@inject('User')
@inject('Products')
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sharing: false,
      loaded: true,
      images: [],
      message: '',
      itemGroups: [],
      itemGroupNumber: 0,
    };
  }

  componentDidMount = () => {
    // AppState.addEventListener('change', () => {
    //   console.log('trying');
    //   console.log(AppState.currentState);
    // });
    // this.props.navigation.addListener('didFocus', async () => {

    //   // this.flatListRef.scrollToOffset({x: 0, y: 0, animated: true});
    // });
    this.getItemGroups();
  };

  getItemGroups = async () => {
    // console.log(
    //   'thisssssss' + JSON.stringify(this.props.User.userInformation.attributes),
    // );
    let gettingItemGroup = await this.props.Products.getShareItemGroups(
      this.props.User.mainUserAuthenticationToken,
    );
    var stateItemGroups = this.state.itemGroups;
    stateItemGroups = stateItemGroups.concat(this.props.Products.sharedGroups);
    await this.setState({itemGroups: stateItemGroups});
    // console.log(stateItemGroups);

    // console.log(
    //   '--------------------->',
    //   this.props.Products.itemGroupLinks.next,
    // );
    this.setState({loaded: false});
  };

  shareProduct = async () => {
    this.setState({sharing: true});
  };
  productImages = async (productImages) => {
    // console.log('My images are: ', productImages);
    this.setState({images: productImages});
  };

  hidePopup = async () => {
    this.setState({sharing: false});
  };

  number = async (number) => {
    // console.log('setting item group number to ', number);
    this.setState({itemGroupNumber: number});
  };
  loading = async (loading) => {
    this.setState({loaded: loading});
  };
  message = async (message) => {
    this.setState({message: message});
  };
  render() {
    const data = [
      require('../../assets/MoaashBanner.png'),
      require('../../assets/Logo.png'),
    ];
    return (
      <SafeAreaView style={styles.container}>
        {!this.state.loaded && (
          <FlatList
            keyExtractor={(item) => item.id}
            data={this.state.itemGroups}
            ref={(ref) => {
              this.flatListRef = ref;
            }}
            ListEmptyComponent={
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <Ionicons
                  name="bookmark"
                  size={100}
                  color={Colors.color5}
                />
                <Text style={{fontSize: RFValue(12), fontFamily: Fonts.medium}}>
                  You have no Shared Products
                </Text>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{
                    padding: 8,
                    backgroundColor: Colors.color3,
                    borderRadius: 5,
                  }}
                  onPress={() => this.props.navigation.navigate('Home')}>
                  <Text
                    style={{
                      fontSize: RFValue(12),
                      fontFamily: Fonts.regular,
                      color: Colors.white,
                    }}>
                    BROWSE PRODUCTS
                  </Text>
                </TouchableOpacity>
              </View>
            }
            renderItem={(item) => (
              <ItemGroupCard
                Products={item}
                scrollEnabled={false}
                navigation={this.props.navigation}
                shareProduct={this.shareProduct}
                productImages={this.productImages}
                message={this.message}
                number={this.number}
                // loading={this.loading}
              />
            )}
          />
        )}
        {this.state.sharing && (
          <WhatsappPopup
            hidePopup={this.hidePopup}
            images={this.state.images}
            message={this.state.message}
            number={this.state.itemGroupNumber}
            // loading={this.loading()}
          />
        )}
        {this.state.loaded && <Loader />}
      </SafeAreaView>
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
