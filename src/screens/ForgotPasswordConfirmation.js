import React, {Component} from 'react';
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import axios from '../utils/axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../utils/colors';
import Fonts from '../utils/fonts';
import {inject} from 'mobx-react';
import {decorateErrors} from  '../utils/Constants'
import CustomButton from '../components/CustomButton';
import Loader from '../components/Loader';

const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
@inject('User')
export default class ForgotPasswordConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      loaded: false,
      password_confirmation: '',
      showPassword: true,
      showPasswordConfirmation: true,
      errors: []
    };
  }

  componentDidMount = async () => {
    // console.log('Starting the app');
  };
  showPassword = async () => {
    this.setState({showPassword: !this.state.showPassword});
  };
  
  showPasswordConfirmation = async () => {
    this.setState({showPasswordConfirmation: !this.state.showPasswordConfirmation});
  };
  reset_password = async () => {
    if (this.state.password != this.state.password_confirmation){
      // console.log(this.props.navigation.state.params.current_otp, this.state.password, this.state.password_confirmation)
      this.setState({ errors: ['The Passwords do not match'] });
      return;
    }
    this.setState({loaded: true});
    let [response_fetched, errors] = await this.props.User.reset_password(this.props.navigation.state.params.current_otp, this.state.password, this.state.password_confirmation);
    // console.log('phone92342 set ', response_fetched);
    this.setState({loaded: false});

    if (response_fetched) {
      this.props.navigation.navigate('Home', { set_user: true });
    } else {
      let errors_array = await decorateErrors(errors.errors)
      this.setState({ errors: errors_array, phone: '' })
    }
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={{fontSize: 20, marginHorizontal: 20, marginTop: 30, fontFamily: Fonts.medium}}>
          What's your password?
        </Text>

        <TextInput
          style={[styles.inputStyle, {marginTop: 4}]}
          placeholder="Password"
          placeholderTextColor="black"
          secureTextEntry={this.state.showPassword}
          keyboardType="default"
          returnKeyType="next"
          autoFocus
          onChangeText={(text) => this.setState({password: text})}
        />
        <TouchableOpacity
          onPress={() => this.showPassword()}
          style={{
            position: 'relative',
            top: -42,
            right: -SCREEN_WIDTH / 1.2,
            zIndex: 2,
          }}>
          <Ionicons name="ios-eye" size={25} color={Colors.darkGray} />
        </TouchableOpacity>
        <TextInput
          style={[styles.inputStyle, {marginTop: 4}]}
          placeholder="Password Confirmation"
          placeholderTextColor="black"
          secureTextEntry={this.state.showPasswordConfirmation}
          keyboardType="default"
          returnKeyType="next"
          onChangeText={(text) => this.setState({password_confirmation: text})}
        />
        <TouchableOpacity
          onPress={() => this.showPasswordConfirmation()}
          style={{
            position: 'relative',
            top: -42,
            right: -SCREEN_WIDTH / 1.2,
            zIndex: 2,
          }}>
          <Ionicons name="ios-eye" size={25} color={Colors.darkGray} />
        </TouchableOpacity>
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
          onPress={() => this.reset_password()}>
          <Text style={{fontSize: 20, color: Colors.white}}>Next</Text>
        </TouchableOpacity>
        {this.state.loaded && <Loader />}
      </ScrollView>
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
