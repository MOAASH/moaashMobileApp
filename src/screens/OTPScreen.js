import React, {Component} from 'react';
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import axios from '../utils/axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../utils/colors';
import Fonts from '../utils/fonts';
import {RFValue} from '../utils/fontSizeStyling';
import {inject} from 'mobx-react';
import {decorateErrors} from  '../utils/Constants'
import CustomButton from '../components/CustomButton';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
@inject('User')
export default class OTPScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      showPassword: true,
      errors: [],
      loading: false,
      autofocus: true
    };
  }

  componentDidMount = async () => {
    // console.log('Starting the app');
  };
  
  perform_action = async (code) => {
    if (this.props.navigation.state.params && this.props.navigation.state.params.forgot_password) {
      this.reset_password(code);
    } else {
      this.verify_otp(code);
    }
  }
  
  reset_password = async (code) => {
    this.props.navigation.navigate('ForgotPasswordConfirmation', { forgot_password: true, current_otp: code });
  }

  verify_otp = async (code) => {
    console.log('CODE: ', code);
    this.setState({ loading: true });
    let [response_fetched, errors] = await this.props.User.verify_sign_up_otp(code)
    if (response_fetched){
      this.props.navigation.navigate('Home');
    } else {
      let errors_array = await decorateErrors(errors.errors);
      console.log('OTP SCREEN ERROR -> ', errors_array);
      this.setState({ errors: errors_array });
    }
    this.setState({ loading: false });
  }
  render() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Text style={{ fontSize: RFValue(10), fontFamily: Fonts.medium, textAlign: 'center', paddingHorizontal: 4, color: Colors.color3 }}>You are one step away from</Text>
        <Text style={{ fontSize: RFValue(12), fontFamily: Fonts.bold, textAlign: 'center', paddingHorizontal: 4, color: Colors.color3 }}>Earning Online without any Investment</Text>
        <OTPInputView
          style={{width: '80%', height: 200}}
          pinCount={6}
          code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          onCodeChanged = {code => { this.setState({code})}}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled = {(code) => {
              this.perform_action(code)
          }}
        />
        {
          this.state.loading && (
            <ActivityIndicator size="small" color={Colors.color4} />
          )
        }
        { this.state.errors && 
          this.state.errors.map( (error) => {
            return <Text style={{ color: 'red', marginHorizontal: 20, paddingHorizontal: 10, paddingTop: 4, fontFamily: Fonts.medium, fontSize: 12 }}>{error}</Text>
          })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({

  borderStyleHighLighted: {
    borderColor: Colors.color6,
  },

  underlineStyleBase: {
    width: SCREEN_WIDTH/8,
    height: 45,
    borderWidth: 2,
    borderBottomWidth: 1,
    borderColor: Colors.color6,
    color: Colors.color3,
    backgroundColor: Colors.white
  },

  underlineStyleHighLighted: {
    borderColor: Colors.color1,
  },
});
