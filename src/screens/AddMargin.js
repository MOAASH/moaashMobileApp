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
import axios from '../utils/axios';
import Colors from '../utils/colors';
import {inject} from 'mobx-react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
import FacebookLogo from '../utils/Constants';
import {ScrollView} from 'react-native-gesture-handler';
import OrderTotal from '../components/OrderTotal';
import CartProductCard from '../components/CartProductCard';
import Margin from '../components/Margin';
import SoldBy from '../components/SoldBy';

const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height);
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
export default class AddMargin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoiceDetails: null
    };
  }

  componentDidMount = async () => {
    console.log('Starting the app');
    this.setState({ invoiceDetails: this.props.navigation.state.params.invoiceDetails });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Margin />
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
                return <CartProductCard invoiceLineItem={invoice_line_item} destroy={false} />
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
          onPress={() => this.props.navigation.navigate('AddShippingAddress')}>
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
