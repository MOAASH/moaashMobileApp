import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import axios from '../utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {inject} from 'mobx-react';
import CustomButton from '../components/CustomButton';
import Loader from '../components/Loader';
import {findErrorKey} from  '../utils/Constants'

const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
@inject('User')
export default class MainLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
      loaded: false,
      showPassword: true,
    };
  }

  componentDidMount = async () => {
    // console.log('Starting the app');
  };
  showPassword = async () => {
    this.setState({showPassword: !this.state.showPassword});
  };

  loginUser = async () => {
    // console.log('confirming sign in the app');
    this.setState({loaded: true});
    let [response_fetched, errors] = await this.props.User.loginUser(
      this.state.phone,
      this.state.password
    );
    if (response_fetched) {
      this.props.navigation.navigate('Home');
    } else {
      let password_error = await findErrorKey(errors.errors, "password");
      let verify_otp_error = await findErrorKey(errors.errors, "verify_otp");

      if (password_error){
        Alert.alert('Phone Number and Password is not correct');
      } else if (verify_otp_error){
        this.props.navigation.navigate('OTPScreen');
      } else {
        Alert.alert('Invalid Credentials!');
      }
      this.setState({loaded: false});
    }
  };
  storeData = async (value) => {
    console.log('MY value is ', value);
    try {
      const login = JSON.stringify(value);
      await AsyncStorage.setItem('@storage_Key', login);
      return true;
    } catch (e) {
      // saving error
      return false;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={{fontSize: 20, marginHorizontal: 20, marginTop: 30}}>
            Enter your phone number
          </Text>
          <TextInput
            style={[styles.inputStyle, {marginTop: 10}]}
            placeholder="Phone"
            placeholderTextColor="black"
            keyboardType="phone-pad"
            returnKeyType="next"
            onChangeText={(text) => this.setState({phone: text})}
          />
          <Text style={{fontSize: 20, marginHorizontal: 20, marginTop: 20}}>
            Enter your password
          </Text>
          <TextInput
            style={[styles.inputStyle, {marginTop: 10}]}
            placeholder="Password"
            placeholderTextColor="black"
            secureTextEntry={this.state.showPassword}
            keyboardType="default"
            returnKeyType="next"
            onChangeText={(text) => this.setState({password: text})}
          />
          <TouchableOpacity
            onPress={() => this.showPassword()}
            style={{
              position: 'relative',
              right: -SCREEN_WIDTH / 1.25,
              top: -45,
              zIndex: 2,
            }}>
            <Ionicons name="ios-eye" size={25} color={Colors.darkGray} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              backgroundColor: Colors.color2,
              marginHorizontal: 80,
              borderRadius: 200,
              marginTop: 60,
              padding: 16,
            }}
            onPress={() => this.loginUser()}>
            <Text style={{fontSize: 20, color: Colors.white}}>Login</Text>
          </TouchableOpacity>
        </ScrollView>
        {this.state.loaded && <Loader />}
      </View>
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
    borderColor: Colors.color2,
    borderWidth: 1,
    paddingVertical: 16,
    borderRadius: 6,
    color: 'black',
  },
});
