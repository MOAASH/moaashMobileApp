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
import CustomButton from '../components/CustomButton';
@inject('User')
export default class MainLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
    };
  }

  componentDidMount = async () => {
    console.log('Starting the app');
  };
  registerUser = async () => {
    if (this.state.password !== this.props.User.password) {
      Alert.alert('Passwords do not match');
      this.props.navigation.navigate('SignupPassword');
    } else {
      let registerUser = await this.props.User.registerUser();
      registerUser === true
        ? this.props.navigation.navigate('Home')
        : this.props.navigation.navigate('StartScreen');
    }
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
          returnKeyType="next"
          autoFocus
          onChangeText={(text) => this.setState({password: text})}
        />
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
