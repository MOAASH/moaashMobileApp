import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import axios from '../utils/axios';
import Colors from '../utils/colors';
import {inject} from 'mobx-react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
import FacebookLogo from '../utils/Constants';
import {ScrollView} from 'react-native-gesture-handler';
import OrderTotal from '../components/OrderTotal';
import SoldBy from '../components/SoldBy';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartProductCard from '../components/CartProductCard';
import Fonts from '../utils/fonts';

const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height);
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
@inject('User')
@inject('Products')
@inject('Cart')
export default class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoiceDetails: null
    };
  }

  componentDidMount = async () => {
    const invoiceId = await AsyncStorage.getItem('APP:CurrentInvoiceId');
    let [result_fetched, error_message] = await this.props.Cart.fetchInvoice(this.props.User.userInformation.attributes.authentication_token);
    if (result_fetched) {
      await this.setState({ invoiceDetails: this.props.Cart.invoiceDetail });
      console.log('-------------',this.state.invoiceDetails.invoice_line_items)
    }
    // console.log('--------> res',res);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {
            this.state.invoiceDetails && 
            <OrderTotal
              totalAmount={this.state.invoiceDetails.net_amount}
              shippingCharges={50}
            />
          }
          <View style={{margin: 12, borderRadius: 10, backgroundColor: Colors.white, paddingBottom: 20 }}>
            {
              this.state.invoiceDetails && 
              this.state.invoiceDetails.invoice_line_items.map((invoice_line_item) => {
                return <CartProductCard invoiceLineItem={invoice_line_item} destroy={true} />
              })
            }          
          </View>
        </ScrollView>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            backgroundColor: Colors.color2,
            width: SCREEN_WIDTH,
            borderRadius: 5,
            position: 'absolute',
            bottom: 20,
            padding: 16,
          }}
          onPress={() => this.props.navigation.navigate('AddMargin', { invoiceDetails: this.state.invoiceDetails })}>
          <Text style={{fontSize: 20, color: Colors.white}}>Continue</Text>
        </TouchableOpacity>
        
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
