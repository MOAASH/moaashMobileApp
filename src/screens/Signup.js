import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput} from 'react-native';
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
        <TextInput
          style={[styles.inputStyle, {marginTop: 60}]}
          placeholder="Name"
          placeholderTextColor="black"
          keyboardType="default"
          returnKeyType="next"
          onChangeText={(text) => this.setState({email: text})}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Phone"
          placeholderTextColor="black"
          keyboardType="default"
          returnKeyType="next"
          onChangeText={(text) => this.setState({email: text})}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          placeholderTextColor="black"
          keyboardType="default"
          returnKeyType="next"
          onChangeText={(text) => this.setState({email: text})}
        />
        <CustomButton
          text="Signup"
          buttonStyle={{
            alignItems: 'center',
            backgroundColor: Colors.color2,
            marginHorizontal: 20,
            borderRadius: 10,
            marginTop: 20,
            padding: 16,
          }}
          textStyle={{fontSize: 20, color: Colors.white}}
          navigation={this.props.navigation}
        />
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
    marginTop: 30,
    borderColor: Colors.color2,
    borderWidth: 1,
    paddingVertical: 16,
    borderRadius: 6,
    color: 'black',
  },
});
