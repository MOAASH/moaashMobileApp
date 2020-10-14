import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import axios from '../utils/axios';
import Colors from '../utils/colors';
import {inject} from 'mobx-react';
import CustomButton from '../components/CustomButton';
import FacebookLogo from '../utils/Constants';

export default class MainLogin extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    console.log('Starting the app');
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{
            width: Dimensions.get('screen').width,
            height: 180,
            marginTop: 40,
          }}
          source={require('../../assets/Logo.png')}
          resizeMode="contain"
        />

        <CustomButton
          text="Sign up"
          onPress="Signup"
          buttonStyle={{
            alignItems: 'center',
            backgroundColor: Colors.color2,
            width: '80%',
            borderRadius: 10,
            padding: 16,
          }}
          textStyle={{fontSize: 20, color: Colors.white}}
          navigation={this.props.navigation}
        />
        <CustomButton
          text="Log in"
          onPress="Login"
          buttonStyle={{
            alignItems: 'center',
            borderColor: Colors.color2,
            borderWidth: 2,
            width: '80%',
            borderRadius: 10,
            marginTop: 40,
            padding: 16,
          }}
          textStyle={{fontSize: 20}}
          navigation={this.props.navigation}
        />
        <View style={{flexDirection: 'row', marginTop: 30}}>
          <View
            style={{
              width: '48%',
              borderColor: Colors.lightGray,
              borderWidth: 1,
              marginTop: 12,
              height: 1,
            }}
          />
          <Text style={{fontSize: 20, color: Colors.Gray}}>or</Text>
          <View
            style={{
              width: '48%',
              borderColor: Colors.lightGray,
              borderWidth: 1,
              marginTop: 12,
              height: 1,
            }}
          />
        </View>
        <CustomButton
          text="Continue with Facebook"
          onPress="Facebook"
          buttonStyle={{
            alignItems: 'center',
            backgroundColor: Colors.blue,
            marginTop: 30,
            width: '80%',
            borderRadius: 10,
            padding: 16,
          }}
          textStyle={{fontSize: 20, color: Colors.white}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  logo: {
    alignSelf: 'center',
  },
});
