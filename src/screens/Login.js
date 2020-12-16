import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import axios from '../utils/axios';
import Colors from '../utils/colors';
import {inject} from 'mobx-react';
import CustomButton from '../components/CustomButton';

export default class MainLogin extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    console.log('Starting the app');
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={{fontSize: 20, marginHorizontal: 20, marginTop: 30}}>
          Enter your phone number
        </Text>
        <TextInput
          style={[styles.inputStyle, {marginTop: 10}]}
          placeholder="Phone"
          placeholderTextColor="black"
          keyboardType="default"
          returnKeyType="next"
          onChangeText={(text) => this.setState({email: text})}
        />
        <Text style={{fontSize: 20, marginHorizontal: 20, marginTop: 20}}>
          Enter your password
        </Text>
        <TextInput
          style={[styles.inputStyle, {marginTop: 10}]}
          placeholder="Password"
          placeholderTextColor="black"
          keyboardType="default"
          returnKeyType="next"
          onChangeText={(text) => this.setState({email: text})}
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
          onPress={() => this.props.navigation.navigate('Home')}>
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
    borderRadius: 6,
    color: 'black',
  },
});
