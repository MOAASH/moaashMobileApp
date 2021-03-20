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
} from 'react-native';
import Colors from '../utils/colors';
import {inject} from 'mobx-react';
import {ScrollView} from 'react-native-gesture-handler';
import OrderTotal from '../components/OrderTotal';
import Loader from '../components/Loader';
import CartProductCard from '../components/CartProductCard';
import Margin from '../components/Margin';

const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height);
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);

@inject('User')
@inject('Cart')
export default class AddMargin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoiceDetails: null,
      customerPrice: null,
      loaded: false,
    };
  }

  componentDidMount = async () => {
    this.setState({
      invoiceDetails: this.props.navigation.state.params.invoiceDetails,
    });
  };

  addCustomerPriceValue = (value) => {
    this.setState({customerPrice: value > 0 ? value : null});
  };

  totalAmount = () => {
    return parseInt(this.state.invoiceDetails.net_amount);
  };

  marginValue = () => {
    if (this.state.customerPrice == null) {
      return 0;
    }
    return this.state.customerPrice - this.totalAmount();
  };

  updateInvoice = async () => {
    this.setState({loaded: true});
    let invoiceParams = this.props.Cart.invoiceParams(
      this.state.invoiceDetails.company.data.id,
      [],
      this.state.customerPrice,
    );
    let [updateInvoice, errorMessage] = await this.props.Cart.addToInvoice(
      this.props.User.mainUserAuthenticationToken,
      invoiceParams,
    );
    // this.props.loading(false);
    if (updateInvoice) {
      // console.log('checkouting jaanu');
      this.setState({loaded: false});
      this.props.navigation.navigate('SelectShippingAddress');
    } else {
      // console.log('============> YEahh fuck');
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {this.state.invoiceDetails && (
            <Margin
              addCustomerPriceValue={this.addCustomerPriceValue}
              customerPrice={this.state.customerPrice}
              totalAmount={this.totalAmount}
              marginValue={this.marginValue()}
            />
          )}
          {this.state.invoiceDetails && (
            <OrderTotal
              totalAmount={this.state.invoiceDetails.net_amount}
              shippingCharges={0}
            />
          )}
          <View
            style={{
              margin: 12,
              borderRadius: 10,
              backgroundColor: Colors.white,
              paddingBottom: 20,
            }}>
            {this.state.invoiceDetails &&
              this.state.invoiceDetails.invoice_line_items.map(
                (invoice_line_item) => {
                  return (
                    <CartProductCard
                      invoiceLineItem={invoice_line_item}
                      destroy={false}
                    />
                  );
                },
              )}
          </View>
        </ScrollView>
        <TouchableOpacity
          disabled={this.marginValue() < 0 || this.state.customerPrice == null}
          style={{
            alignItems: 'center',
            backgroundColor: Colors.color2,
            width: SCREEN_WIDTH,
            borderRadius: 5,
            position: 'absolute',
            bottom: 20,
            padding: 16,
          }}
          onPress={() => this.updateInvoice()}>
          <Text style={{fontSize: 20, color: Colors.white}}>Continue</Text>
        </TouchableOpacity>
        {this.state.loaded && <Loader />}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
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
