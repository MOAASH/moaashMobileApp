import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from '../utils/axios';
import Colors from '../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {inject} from 'mobx-react';
import CustomButton from '../components/CustomButton';
import Loader from '../components/Loader';

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
    console.log('Starting the app');
  };
  showPassword = async () => {
    this.setState({showPassword: !this.state.showPassword});
  };
  loginUser = async () => {
    this.setState({loaded: true});
    let loginUser = await this.props.User.loginUser(
      // this.state.phone,
      '03218449409',
      'Hamza123',
      // this.state.password,
    );
    if (loginUser === true) {
      this.setState({loaded: false});
      this.props.navigation.navigate('Home');
    } else {
      Alert.alert('Invalid Credentials');
      this.setState({loaded: false});
      this.props.navigation.navigate('Login');
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
            keyboardType="default"
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
            style={{position: 'absolute', right: 30, top: 180, zIndex: 2}}>
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
