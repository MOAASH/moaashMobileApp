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
    const userAuthToken = await this.props.User.get_auth_token();
    console.log('GOINGGG', userAuthToken);
    // if (userAuthToken) {
    //   let [response_fetched, errors] = await this.props.User.fetch_user_details_from_auth_token();
      
    //   if (!response_fetched) {
    //     console.log('Yeh Kya baat hai bc')
    //     AsyncStorage.clear();
    //     this.props.navigation.navigate('StartScreen');
    //   }
    // }
    
    // console.log('GOINGGG', userAuthToken);
    if (userAuthToken) {
      this.props.navigation.navigate('Home', { set_user: true });
    } else {
      this.props.navigation.navigate('StartScreen');
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
