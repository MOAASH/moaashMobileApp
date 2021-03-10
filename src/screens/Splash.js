import React, {Component} from 'react';
import {View, StyleSheet, Image, Dimensions, Text} from 'react-native';
import axios from '../utils/axios';
import Colors from '../utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginLoader from '../components/LoginLoader';

import {inject} from 'mobx-react';
@inject('User')
export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      loaded: true,
    };
  }

  componentDidMount = async () => {
    // console.log('Starting the app');
    try {
      let jsonValue = await AsyncStorage.getItem('@storage_Key');
      // console.log('My value is ', jsonValue);
      if (jsonValue === null) {
        this.interval = setInterval(() => {
          this.inc();
        }, 1000);
      } else {
        const value = JSON.parse(jsonValue);
        // console.log('My username is ', value.phone);
        // console.log('My password is ', value.password);
        let userLogin = await this.props.User.loginUser(
          value.phone,
          value.password,
        );
        // console.log('userloging is ', userLogin);
        userLogin == true
          ? this.props.navigation.navigate('Home')
          : this.props.navigation.navigate('StartScreen');
      }
    } catch (e) {
      // error reading value
    }
  };

  inc = () => {
    if (this.state.count <= 0) {
      clearInterval(this.interval);
      this.props.navigation.navigate('StartScreen');
    } else {
      // console.log('Decreaseing');
      this.setState((prevState) => ({
        count: prevState.count - 1,
      }));
    }
  };
  componentWillUnmount = async () => {
    clearInterval(this.interval);
  };
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{width: Dimensions.get('screen').width, height: 180}}
          source={require('../../assets/Logo.png')}
          resizeMode="contain"
        />
        <Text style={{fontSize: 18, color: Colors.color1}}>
          Pakistan's #1 Online Reselling App
        </Text>
        {this.state.loaded && <LoginLoader />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  logo: {
    alignSelf: 'center',
  },
});
