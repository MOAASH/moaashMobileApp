import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import axios from '../utils/axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../utils/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {inject} from 'mobx-react';

const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height);
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
@inject('User')
export default class MainLogin extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    // console.log('Starting the app');
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>Account</Text>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginTop: 20,
            backgroundColor: Colors.lightGray,
            padding: 8,
            paddingVertical: 20,
          }}>
          <View
            style={{
              borderRadius: 2000,
              backgroundColor: Colors.color1,
              width: 50,
              height: 50,
            }}
          />
          <View>
            <Text
              style={{
                paddingLeft: 12,
                fontSize: 16,
                fontWeight: '600',
              }}>
              {this.props.User.userInformation.attributes.name}
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                paddingLeft: 12,
                fontSize: 16,
              }}>
              {this.props.User.userInformation.attributes.phone_number}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            backgroundColor: Colors.lightGray,
            padding: 8,
            marginTop: 20,
            paddingVertical: 20,
            justifyContent: 'space-between',
          }}
          onPress={() => this.props.navigation.navigate('UserBankAccounts')}>
          <View style={{flexDirection: 'row'}}>
            <FontAwesome name="bank" size={20} style={{fontWeight: '700'}} />
            <Text
              style={{
                alignSelf: 'center',
                paddingLeft: 12,
                fontSize: 16,
              }}>
              Payment Details
            </Text>
          </View>
          <View
            style={{
              alignItems: 'flex-end',
            }}>
            <Ionicons name="ios-chevron-forward-outline" size={20} style={{}} />
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={{
            flexDirection: 'row',
            backgroundColor: Colors.lightGray,
            padding: 8,
            paddingVertical: 20,
            justifyContent: 'space-between',
          }}
          onPress={() => this.props.navigation.navigate('Payments')}>
          <View style={{flexDirection: 'row'}}>
            <FontAwesome name="money" size={20} style={{fontWeight: '700'}} />
            <Text
              style={{
                alignSelf: 'center',
                paddingLeft: 12,
                fontSize: 16,
              }}>
              My Payments
            </Text>
          </View>
          <View
            style={{
              alignItems: 'flex-end',
            }}>
            <Ionicons name="ios-chevron-forward-outline" size={20} style={{}} />
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            backgroundColor: Colors.lightGray,
            padding: 8,
            paddingVertical: 20,
            justifyContent: 'space-between',
          }}
          onPress={() => this.props.navigation.navigate('MySharedProducts')}>
          <View style={{flexDirection: 'row'}}>
            <Ionicons name="ios-share-outline" size={20} />
            <Text
              style={{
                alignSelf: 'center',
                paddingLeft: 12,
                fontSize: 16,
              }}>
              My Shared Products
            </Text>
          </View>
          <View
            style={{
              alignItems: 'flex-end',
            }}>
            <Ionicons name="ios-chevron-forward-outline" size={20} style={{}} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            backgroundColor: Colors.lightGray,
            padding: 8,
            paddingVertical: 20,
            justifyContent: 'space-between',
          }}
          onPress={() => this.props.navigation.navigate('ReferralEarn')}>
          <View style={{flexDirection: 'row'}}>
            <Ionicons
              name="cash-outline"
              size={20}
              style={{fontWeight: '700'}}
            />
            <Text
              style={{
                alignSelf: 'center',
                paddingLeft: 12,
                fontSize: 16,
              }}>
              Refer & Earn
            </Text>
          </View>
          <View
            style={{
              alignItems: 'flex-end',
            }}>
            <Ionicons name="ios-chevron-forward-outline" size={20} style={{}} />
          </View>
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
