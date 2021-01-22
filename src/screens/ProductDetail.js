import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import axios from '../utils/axios';
import Colors from '../utils/colors';
import Fonts from '../utils/fonts';

import {inject} from 'mobx-react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../components/CustomButton';
import FacebookLogo from '../utils/Constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ShareAndCartButton from '../components/ShareAndCartButton';
import ProductDetailsDescription from '../components/ProductDetailsDescription';
import IconBanner from '../components/IconBanner';
import SelectSizePopup from '../components/SelectSizePopup';
import SoldBy from '../components/SoldBy';
import Loader from '../components/Loader';
import WhatsappPopup from '../components/WhatsappPopup';

const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height);
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);

@inject('User')
@inject('Products')
export default class MainLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addToCart: false,
      added: false,
      sharing: false,
      loaded: true,
      ItemGroupDetail: {},
      ProductDetailsData: {},
      ProductDetailsImages: {},
      price: '',
      name: '',
      sizes: [],
      selectedItem: 0,
      selectedQuantity: 1,
    };
  }
  shareProduct = async () => {
    this.setState({sharing: true});
  };
  hidePopup = async () => {
    this.setState({sharing: false});
  };
  addToCart = async (prop) => {
    console.log('adding' + prop);
    this.setState({addToCart: prop, added: prop});
  };
  
  addedtoCart = async (prop) => {
    if (prop == null){
      this.setState({ added: false })
    } else {
      var index = this.state.sizes.indexOf(prop[1]);
      console.log("--------->",prop)
      this.setState({
        added: prop,
        selectedItem: this.props.navigation.state.params.details.data[index]
          .item_id,
        selectedQuantity: prop[2],
      });
    }
  };

  componentDidMount = async () => {
    this.setState({
      ItemGroupDetail: this.props.Products.currentItemGroup.attributes,
      name: this.props.navigation.state.params.details.name,
      ProductDetailsData: this.props.navigation.state.params.details.data,
      price: this.props.navigation.state.params.details.data[0].price,
      ProductDetailsImages: this.props.navigation.state.params.details.images,
      loaded: false,
    });
    let result = this.props.navigation.state.params.details.data.map(
      (a) => a.size,
    );
    this.setState({sizes: result});
    console.log('result is ', result);
    console.log(
      'item group is ',
      this.props.Products.currentItemGroup.attributes,
    );
  };

  loading = async (loading) => {
    this.setState({loaded: loading});
  };
  render() {
    const images = this.state.ProductDetailsImages;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.lightGray}}>
        <ScrollView style={{marginBottom: SCREEN_HEIGHT / 30}}>
          <View style={styles.productCard}>
            <View>
            <View
          style={{
            flexDirection: 'row',
            height: 220,
            justifyContent: 'space-evenly',
          }}>
          <Image
            resizeMode="contain"
            style={{
              width: Dimensions.get('screen').width,
              height: 210,
              marginTop: 20,
            }}
            source={{uri: images[0]}}
          />
        </View>
        <View style={{marginTop: 20, paddingHorizontal: 12 }}>
          <Text style={{fontSize: 16, paddingVertical: 6, color: Colors.black, fontFamily: Fonts.regular }}>{this.state.name}</Text>
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
            <Text style={{fontSize: 18, color: Colors.color3, paddingLeft: 12, fontFamily: Fonts.regular}}>
              Share Now
            </Text>
          </TouchableOpacity>
        </View>
            </View>
          </View>
          <View
            style={{
              marginTop: 4,
            }}>
            <ProductDetailsDescription
              description={this.state.ItemGroupDetail.description}
            />
          </View>
          <View
            style={{
              marginTop: 8,
            }}>
            <IconBanner />
          </View>
          <View
            style={{
              marginTop: 8,
            }}>
            <SoldBy companyName={this.state.ItemGroupDetail.company} />
          </View>
        </ScrollView>
        <ShareAndCartButton
          addToCart={this.addToCart}
          checkout={this.state.added[0]}
          navigation={this.props.navigation}
          selectedQuantity={this.state.selectedQuantity}
          selectedItem={this.state.selectedItem}
          loading={this.loading}
        />
        {this.state.addToCart && (
          <SelectSizePopup
            addedtoCart={this.addedtoCart}
            addToCart={this.addToCart}
            sizes={this.state.sizes}
          />
        )}
        {this.state.sharing && <WhatsappPopup hidePopup={this.hidePopup} />}
        {this.state.loaded && <Loader />}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
  },
  productCard: {
    backgroundColor: Colors.white,
    paddingBottom: 12,
    marginBottom: 8,
  },
});
