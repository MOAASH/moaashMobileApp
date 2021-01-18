import React, {Component} from 'react';
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from '../utils/axios';
import Colors from '../utils/colors';
import {inject} from 'mobx-react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
import Loader from '../components/Loader';
@inject('User')
export default class MainLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      loaded: false,
      showPassword: true,
    };
  }

  componentDidMount = async () => {
    console.log('Starting the app');
  };
  registerUser = async () => {
    this.setState({loaded: true});
    if (this.state.password !== this.props.User.password) {
      Alert.alert('Passwords do not match');
      this.props.navigation.navigate('SignupPassword');
    } else {
      let registerUser = await this.props.User.registerUser();
      this.setState({loaded: false});
      registerUser === true
        ? this.props.navigation.navigate('Home')
        : this.props.navigation.navigate('StartScreen');
    }
  };
  showPassword = async () => {
    this.setState({showPassword: !this.state.showPassword});
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={{fontSize: 20, marginHorizontal: 20, marginTop: 30}}>
          Please confirm your password
        </Text>
        <TextInput
          style={[styles.inputStyle, {marginTop: 4}]}
          placeholder="Confirm Password"
          placeholderTextColor="black"
          keyboardType="default"
          secureTextEntry={this.state.showPassword}
          returnKeyType="next"
          autoFocus
          onChangeText={(text) => this.setState({password: text})}
        />
        <TouchableOpacity
          onPress={() => this.showPassword()}
          style={{position: 'absolute', right: 30, top: 68, zIndex: 2}}>
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
          onPress={() => this.registerUser()}>
          <Text style={{fontSize: 20, color: Colors.white}}>
            Create Account
          </Text>
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
