import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import axios from '../utils/axios';
import Colors from '../utils/colors';
import Fonts from '../utils/fonts';
import {inject} from 'mobx-react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loader from '../components/Loader';
import CustomButton from '../components/CustomButton';
import FacebookLogo from '../utils/Constants';
import {ScrollView} from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import {RFValue, RFPercentage} from '../utils/fontSizeStyling';
const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height);
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);

@inject('User')
@inject('ShippingAddress')
@inject('Cart')
export default class SelectShippingAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shippingAddressList: [],
      selectedAddressIndex: 0,
      selectedAddressId: null,
      loaded: false,
    };
  }

  componentDidMount = async () => {
    // console.log('Starting the app');
    this.props.navigation.addListener('didFocus', async () => {
      let [
        response_fetched,
        error_message,
      ] = await this.props.ShippingAddress.getShippingAddresses();
      if (response_fetched) {
        // console.log(this.props.ShippingAddress.shippingAddressesList)
        if (this.props.ShippingAddress.shippingAddressesList.length > 0){          
          this.setState({
            shippingAddressList: this.props.ShippingAddress.shippingAddressesList,
            selectedAddressId: this.props.ShippingAddress.shippingAddressesList[0]
              .id,
          });
        }
      }
    });
    let [
      response_fetched,
      error_message,
    ] = await this.props.ShippingAddress.getShippingAddresses();
    if (response_fetched) {
      if (this.props.ShippingAddress.shippingAddressesList.length > 0){          
        this.setState({
          shippingAddressList: this.props.ShippingAddress.shippingAddressesList,
          selectedAddressId: this.props.ShippingAddress.shippingAddressesList[0]
            .id,
        });
      }
    }
  };

  changeSelectedAddress = async (index, id) => {
    this.setState({selectedAddressId: id, selectedAddressIndex: index});
  };

  updateInvoice = async () => {
    this.setState({loaded: true});
    let invoiceParams = this.props.Cart.invoiceParams(
      this.props.Cart.invoiceDetail.company.data.id,
      [],
      undefined,
      this.state.selectedAddressId,
    );
    // console.log(invoiceParams);
    let [updateInvoice, errorMessage] = await this.props.Cart.addToInvoice(
      this.props.User.mainUserAuthenticationToken,
      invoiceParams,
    );
    // this.props.loading(false);
    if (updateInvoice) {
      // console.log('checkouting jaanu');
      this.props.navigation.navigate('OrderSummary');
    } else {
      // console.log('============> YEahh fuck');
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            backgroundColor: Colors.white,
            margin: 12,
            flex: 1,
            borderRadius: 10,
          }}>
          {this.state.shippingAddressList && (
            <FlatList
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    height: 1,
                    backgroundColor: Colors.lightGray2,
                  }}
                />
              )}
              data={this.state.shippingAddressList}
              renderItem={(item) => (
                <View style={{padding: 12, flexDirection: 'row'}}>
                  <View>
                    <CheckBox
                      onCheckColor={Colors.color5}
                      disabled={item.index == this.state.selectedAddressIndex}
                      onTintColor={Colors.color5}
                      value={item.index == this.state.selectedAddressIndex}
                      tintColors={{true: Colors.color5, false: Colors.Gray}}
                      onValueChange={() =>
                        this.changeSelectedAddress(item.index, item.item.id)
                      }
                      style={{width: RFPercentage(2), height: RFPercentage(2)}}
                    />
                  </View>
                  <View style={{flex: 1, marginLeft: 20}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontSize: RFValue(12),
                          fontFamily: Fonts.regular,
                        }}>
                        {item.item.attributes.customer_name}
                      </Text>
                      {/* <Ionicons name="trash" size={20} /> */}
                    </View>
                    <View>
                      <Text
                        style={{
                          paddingVertical: 4,
                          fontFamily: Fonts.regular,
                          fontSize: RFValue(10),
                          color: Colors.Gray,
                        }}>
                        {item.item.attributes.address}
                      </Text>
                      <Text
                        style={{
                          paddingVertical: 4,
                          fontFamily: Fonts.regular,
                          fontSize: RFValue(10),
                          color: Colors.Gray,
                        }}>
                        {item.item.attributes.phone_number}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            width: SCREEN_WIDTH,
            position: 'absolute',
            borderRadius: 5,
            bottom: 20,
          }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              borderWidth: 1,
              borderColor: Colors.color2,
              flex: 1,
              padding: 16,
            }}
            onPress={() =>
              this.props.navigation.navigate('AddShippingAddress')
            }>
            <Text
              style={{
                fontSize: RFValue(12),
                fontFamily: Fonts.regular,
                color: Colors.color2,
              }}>
              Add New Address
            </Text>
          </TouchableOpacity>
          { this.state.shippingAddressList.length > 0 && (
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  backgroundColor: Colors.color2,
                  flex: 1,
                  padding: 16,
                }}
                onPress={() => this.updateInvoice()}>
                <Text
                  style={{
                    fontSize: RFValue(12),
                    fontFamily: Fonts.regular,
                    color: Colors.white,
                  }}>
                  Continue
                </Text>
              </TouchableOpacity>
            )}
        </View>
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
    shadowOpacity: 0.2,
    shadowColor: 'black',
    borderColor: Colors.color2,
    borderWidth: 1,
    paddingVertical: 16,
    borderRadius: 6,
    paddingHorizontal: 8,
    color: 'black',
  },
});
