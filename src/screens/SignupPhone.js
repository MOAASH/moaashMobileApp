import React, {Component} from 'react';
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from '../utils/axios';
import Colors from '../utils/colors';
import Fonts from '../utils/fonts';
import {inject} from 'mobx-react';
import PhoneLoader from '../components/PhoneLoader';
import {decorateErrors} from  '../utils/Constants'
import Loader from '../components/Loader';
@inject('User')
export default class MainLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      loaded: false,
      errors: null
    };
  }

  componentDidMount = async () => {
    // console.log('Starting the app');
  };
  
  perform_action = async () => {
    if (this.props.navigation.state.params && this.props.navigation.state.params.forgot_password) {
      this.forgot_password();
    } else {
      this.setPhone();
    }
  }
  
  forgot_password = async () => {
    this.setState({loaded: true});
    let [response_fetched, errors] = await this.props.User.forgot_password(this.state.phone);
    this.setState({loaded: false});

    if (response_fetched) {
      this.props.navigation.navigate('OTPScreen', { forgot_password: true });
    } else {
      let errors_array = await decorateErrors(errors.errors)
      this.setState({ errors: errors_array, phone: '' })
    }
  }
  
  setPhone = async () => {
    this.setState({loaded: true});
    let [available, errors] = await this.props.User.setPhone(this.state.phone);
    // console.log('phone set ', available);
    this.setState({loaded: false});

    if (available) {
      this.props.navigation.navigate('SignupPassword');
    } else {
      let errors_array = await decorateErrors(errors.errors)
      this.setState({ errors: errors_array, phone: '' })
    }
  };


  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={{fontSize: 20, marginHorizontal: 20, marginTop: 30, fontFamily: Fonts.medium}}>
            What's your phone number?
          </Text>
          <TextInput
            style={[styles.inputStyle, {marginTop: 4}]}
            placeholder="923xxxxxxxxx"
            placeholderTextColor="black"
            keyboardType="phone-pad"
            returnKeyType="next"
            autoFocus
            value={this.state.phone}
            onChangeText={(text) => this.setState({phone: text})}
          />
          { this.state.errors && 
            this.state.errors.map( (error) => {
              return <Text style={{ color: 'red', marginHorizontal: 20, paddingHorizontal: 10, paddingTop: 4, fontFamily: Fonts.medium, fontSize: 12 }}>{error}</Text>
            })
          }
          <TouchableOpacity
            style={{
              alignItems: 'center',
              backgroundColor: Colors.color2,
              marginHorizontal: 80,
              borderRadius: 200,
              marginTop: 60,
              padding: 16,
            }}
            onPress={() => this.perform_action()}>
            <Text style={{fontSize: 20, color: Colors.white}}>Next</Text>
          </TouchableOpacity>
        </ScrollView>
        {this.state.loaded && <PhoneLoader />}
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
    borderColor: Colors.color2,
    borderWidth: 1,
    paddingVertical: 16,
    borderRadius: 8,
    color: 'black',
  },
});
