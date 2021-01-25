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
            height: 200,
          }}
          source={require('../../assets/Logo.png')}
          resizeMode="contain"
        />
        <Text
          style={{
            fontSize: 18,
            color: Colors.color1,
            marginBottom: 40,
            fontFamily: 'Poppins-bold',
            fontWeight: '600',
          }}>
          Pakistan's #1 Online Reselling Platform
        </Text>
        <CustomButton
          text="SIGN UP"
          onPress="Signup"
          buttonStyle={{
            alignItems: 'center',
            backgroundColor: Colors.color2,
            width: '80%',
            borderRadius: 10,
            padding: 16,
          }}
          textStyle={{fontSize: 20, color: Colors.white, fontFamily: 'Poppins-Medium'}}
          navigation={this.props.navigation}
          onPress="SignupName"
        />
        <CustomButton
          text="LOGIN"
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
          textStyle={{fontSize: 20, fontFamily: 'Poppins-Medium'}}
          navigation={this.props.navigation}
          onPress="Login"
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
    justifyContent: 'center',
  },
  logo: {
    alignSelf: 'center',
  },
});
