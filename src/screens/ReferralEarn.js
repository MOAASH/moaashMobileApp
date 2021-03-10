import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  Alert,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import axios from '../utils/axios';
import Colors from '../utils/colors';
import {inject} from 'mobx-react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../components/CustomButton';
import FacebookLogo from '../utils/Constants';
import {ScrollView} from 'react-native-gesture-handler';

const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height);
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
export default class MainLogin extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    console.log('Starting the app');
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text
          style={{
            fontSize: 24,
            marginTop: 12,
            paddingHorizontal: 12,
          }}>
          Refer{' '}
          <Text
            style={{
              color: Colors.color1,
            }}>
            Friends and Family and Earn
          </Text>
        </Text>
        <View style={{paddingHorizontal: 12}}>
          <Text style={{fontSize: 16}}>
            Invite your friends and family to become resellers on Pakistan's #1
            online reselling platform and earn commission on each product they
            resell.
          </Text>
          <View
            style={{
              marginTop: 12,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Ionicons name="wallet-outline" size={80} color={Colors.color1} />
            <Text style={{fontSize: 16}}>
              <Text
                style={{
                  color: Colors.color1,
                }}>
                2%{' '}
              </Text>
              commission on each product they resell for first 18 months
            </Text>
          </View>
          <Text
            style={{
              fontSize: 24,
              marginTop: 12,
              alignSelf: 'center',
              fontWeight: '600',
              marginTop: 12,
              marginBottom: 8,
            }}>
            Whom to{' '}
            <Text
              style={{
                color: Colors.color1,
              }}>
              Refer?
            </Text>
          </Text>
          <View
            style={{borderWidth: 1, borderColor: Colors.color2, elevation: 8}}>
            <View
              style={{
                padding: 8,
                paddingVertical: 20,
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <FontAwesome
                  name="users"
                  size={20}
                  style={{fontWeight: '700'}}
                />
                <Text
                  style={{
                    alignSelf: 'center',
                    paddingLeft: 12,
                    fontSize: 16,
                  }}>
                  Friends & Family
                </Text>
              </View>
              <Text style={{paddingTop: 8}}>
                Friends and family are the people you can easily talk to and
                convince them to join Moaash
              </Text>
            </View>
            <View
              style={{
                padding: 8,
                paddingVertical: 20,
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <FontAwesome
                  name="user"
                  size={20}
                  style={{fontWeight: '700'}}
                />
                <Text
                  style={{
                    alignSelf: 'center',
                    paddingLeft: 12,
                    fontSize: 16,
                  }}>
                  Good Convincer
                </Text>
              </View>
              <Text style={{paddingTop: 8}}>
                Refer to someone who can convince people easily and sell
                products and also has a wide network of friends.
              </Text>
            </View>
            <View
              style={{
                padding: 8,
                paddingVertical: 20,
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <FontAwesome
                  name="user-plus"
                  size={20}
                  style={{fontWeight: '700'}}
                />
                <Text
                  style={{
                    alignSelf: 'center',
                    paddingLeft: 12,
                    fontSize: 16,
                  }}>
                  An Entrepreneur
                </Text>
              </View>
              <Text style={{paddingTop: 8}}>
                Refer to someone who wants to start earning money online with
                zero investment.
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            backgroundColor: Colors.color2,
            borderRadius: 5,
            marginTop: 20,
            marginHorizontal: 12,
            padding: 16,
          }}
          onPress={() => Alert.alert('Thank you. This feature is coming soon')}>
          <Text style={{fontSize: 20, color: Colors.white}}>
            Refer and Earn
          </Text>
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
