import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import axios from '../utils/axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../utils/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';
import {inject} from 'mobx-react';
import CustomButton from '../components/CustomButton';
import Fonts from '../utils/fonts';
import {RFValue} from '../utils/fontSizeStyling';
import {OrderState} from '../utils/order';
import {titleize} from '../utils/Constants';

const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height);
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);

@inject('Cart')
export default class MainLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoicesList: [],
      cartEmtpy: true,
      refreshing: false,
    };
  }

  componentDidMount = async () => {
    this.props.navigation.addListener('didFocus', async () => {
      await this.fetchInvoicesFromServer();
    });
    await this.fetchInvoicesFromServer();
  };

  fetchInvoicesFromServer = async () => {
    this.setState({refreshing: true});
    let [
      response_fetched,
      error_message,
    ] = await this.props.Cart.fetchInvoicesList();
    if (response_fetched) {
      this.setState({
        invoicesList: this.props.Cart.invoicesList,
        refreshing: false,
      });
    }
  };

  fetchInvoiceDetailsFromServer = async (invoice_id, status) => {
    let [response_fetched, error_message, invoice_details] = await this.props.Cart.fetchInvoiceDetail(invoice_id)
    if (response_fetched){      
      if ( status == OrderState.drafted.name){
        this.props.navigation.navigate('Invoice', {
          invoiceDetails: invoice_details,
          invoiceId: invoice_id
        })
      } else if( status == OrderState.order_placed.name) {
        this.props.navigation.navigate('OrderPlaced', {
          invoiceDetails: invoice_details,
        });
      }
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {true && (
          <FlatList
            keyExtractor={(item) => item.id}
            refreshing={this.state.refreshing}
            onRefresh={() => this.fetchInvoicesFromServer()}
            data={this.state.invoicesList}
            ListEmptyComponent={
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <LottieView
                  source={require('../../assets/empty_cart.json')}
                  autoPlay
                  loop={true}
                  style={{
                    width: SCREEN_WIDTH / 1.5,
                    height: SCREEN_WIDTH / 1.5,
                  }}
                />
                <Text style={{fontSize: RFValue(12), fontFamily: Fonts.medium}}>
                  Your Cart is Empty
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
              <View style={{padding: 4, flexDirection: 'row'}}>
                {/* <View>
                  <FastImage
                    resizeMode={FastImage.resizeMode.contain}
                    style={{width: 100, height: 100}}
                    source={{
                      uri: this.props.invoiceLineItem.data.attributes.item_details.data
                        .attributes.images[0],
                      priority: FastImage.priority.normal,
                    }}
                  />
                </View> */}
                <View
                  style={{
                    flex: 1,
                    padding: 16,
                    borderColor: Colors.lightGray2,
                    borderWidth: 1,
                    backgroundColor: 'white',
                    borderRadius: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{fontSize: 15, fontFamily: Fonts.regular}}>
                      Order# {item.item.id}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontFamily: Fonts.regular,
                        fontStyle: 'italic',
                        color: OrderState[item.item.attributes.state] ? OrderState[item.item.attributes.state].color : Colors.color1,
                      }}>
                      {titleize(item.item.attributes.state)}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 2,
                    }}>
                    <Text style={{fontSize: RFValue(10), color: Colors.Gray}}>
                      PKR {item.item.attributes.net_amount} -{' '}
                      {item.item.attributes.shipping_address
                        ? item.item.attributes.shipping_address.data.attributes
                            .customer_name
                        : null}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 2,
                    }}>
                    <Text style={{fontSize: RFValue(10), color: Colors.Gray}}>
                      {item.item.attributes.updated_at}
                    </Text>
                    {item.item.attributes.state != OrderState.archived.name && (  
                      <TouchableOpacity onPress={() => this.fetchInvoiceDetailsFromServer(item.item.id, item.item.attributes.state)}>
                        <Text style={{fontSize: RFValue(10), color: Colors.color5}}>
                          VIEW DETAILS
                        </Text>
                      </TouchableOpacity>
                    )}
                    
                  </View>
                </View>
              </View>
            )}
          />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
    marginBottom: 75,
  },
  inputStyle: {
    marginHorizontal: 20,
    paddingHorizontal: 10,
    shadowOpacity: 0.2,
    shadowColor: 'black',
    marginTop: 30,
    borderColor: Colors.color2,
    borderWidth: 1,
    paddingVertical: 16,
    borderRadius: 6,
    color: 'black',
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  header: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: Colors.borderGray,
    borderBottomWidth: 1,
  },
});
