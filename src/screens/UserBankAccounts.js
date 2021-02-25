import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import axios from '../utils/axios';
import Colors from '../utils/colors';
import Fonts from '../utils/fonts';
import {inject} from 'mobx-react';
import CheckBox from '@react-native-community/checkbox';
import {RFValue, RFPercentage} from '../utils/fontSizeStyling';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
import FacebookLogo from '../utils/Constants';
import {ScrollView} from 'react-native-gesture-handler';

const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height);
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);

@inject('BankDetails')
export default class BankDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bankAccountsList: [],
    };
  }

  componentDidMount = async () => {
    console.log('Starting the app LOLOLOLOLOL');
    this.props.navigation.addListener('didFocus', async () => {
      await this.fetchAccountsList();
    });
    await this.fetchAccountsList();
  };

  fetchAccountsList = async () => {
    let [
      response_fetched,
      errors,
    ] = await this.props.BankDetails.fetchBankDetails();
    if (response_fetched) {
      this.setState({
        bankAccountsList: this.props.BankDetails.bankAccountsList,
      });
    } else {
      console.log('Nothing Fetched');
    }
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
        <View
          style={{
            padding: 16,
            color: Colors.Gray,
          }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('BankDetails')}
            style={{
              borderColor: Colors.color2,
              alignItems: 'center',
              padding: 16,
              borderWidth: 1,
              borderStyle: 'dashed',
              borderRadius: 10,
            }}>
            <Text style={{fontFamily: Fonts.medium, color: Colors.color2}}>
              Add a new Bank Account
            </Text>
          </TouchableOpacity>
          <FlatList
            keyExtractor={(item) => item.id}
            style={{paddingTop: 12}}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 10,
                  backgroundColor: Colors.white,
                }}
              />
            )}
            data={this.state.bankAccountsList}
            renderItem={(item) => (
              <View
                style={{
                  padding: 12,
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: Colors.lightGray2,
                  borderRadius: 10,
                }}>
                <View>
                  <CheckBox
                    onCheckColor={Colors.color5}
                    onTintColor={Colors.color5}
                    value={item.item.attributes.primary_account}
                    tintColors={{true: Colors.color5, false: Colors.Gray}}
                    style={{
                      width: RFPercentage(2),
                      height: RFPercentage(2),
                      marginRight: 8,
                    }}
                  />
                </View>
                <View style={{flex: 1, paddingLeft: 8}}>
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
                      {item.item.attributes.bank_name}
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
                      {item.item.attributes.account_name}
                    </Text>
                    <Text
                      style={{
                        paddingVertical: 4,
                        fontFamily: Fonts.regular,
                        fontSize: RFValue(10),
                        color: Colors.Gray,
                      }}>
                      {item.item.attributes.account_number}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
