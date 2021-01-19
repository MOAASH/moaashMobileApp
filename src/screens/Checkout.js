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
import SoldBy from '../components/SoldBy';

const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height);
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
@inject('User')
@inject('Products')
@inject('Cart')
export default class MainLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };
  }

  componentDidMount = async () => {
    console.log('Starting the app');
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <OrderTotal
          totalAmount={this.props.Cart.invoiceDetail.net_amount}
          shippingCharges={50}
        />
        <View
          style={{
            marginTop: 12,
          }}>
          <Text
            style={{
              fontSize: 16,
              paddingHorizontal: 16,
              marginBottom: 12,
              fontWeight: '600',
            }}>
            Cart Details
          </Text>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 16,
              paddingVertical: 24,
              borderBottomColor: Colors.color2,
              borderBottomWidth: 1,
            }}>
            <Image
              style={{width: Dimensions.get('screen').width / 4, height: 100}}
              source={require('../../assets/shirt1.jpg')}
            />
            <View
              style={{
                width: Dimensions.get('screen').width / 1.5,
                height: 100,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 4,
                }}>
                <Text style={{fontSize: 15, fontWeight: '600'}}>
                  Fancy Men Shirt
                </Text>
                <Ionicons name="trash" size={20} />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 4,
                }}>
                <Text style={{fontSize: 15}}>Price</Text>
                <Text style={{fontSize: 15}}>PKR 300</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 4,
                }}>
                <Text style={{fontSize: 15}}>Size</Text>
                <Text style={{fontSize: 15}}>L</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontSize: 15}}>
                  Quantity : {this.state.quantity}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: Colors.borderGray,
                      justifyContent: 'space-around',
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                    }}
                    onPress={() =>
                      this.setState({quantity: this.state.quantity - 1})
                    }>
                    <Text>-</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: Colors.borderGray,
                      justifyContent: 'space-around',
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                    }}
                    onPress={() =>
                      this.setState({quantity: this.state.quantity + 1})
                    }>
                    <Text>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <SoldBy />
        </View>
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
          onPress={() => this.props.navigation.navigate('AddMargin')}>
          <Text style={{fontSize: 20, color: Colors.white}}>Continue</Text>
        </TouchableOpacity>
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
