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
import {inject} from 'mobx-react';
import CustomButton from '../components/CustomButton';
@inject('User')
export default class MainLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      showPassword: true,
    };
  }

  componentDidMount = async () => {
    console.log('Starting the app');
  };
  showPassword = async () => {
    this.setState({showPassword: !this.state.showPassword});
  };
  setPassword = async () => {
    this.props.User.setPassword(this.state.password);
    this.props.navigation.navigate('SignupConfirmPassword');
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={{fontSize: 20, marginHorizontal: 20, marginTop: 30}}>
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
          onPress={() => this.setPassword()}>
          <Text style={{fontSize: 20, color: Colors.white}}>Next</Text>
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
