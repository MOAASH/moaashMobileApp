import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import axios from '../utils/axios';
import Colors from '../utils/colors';
import {inject} from 'mobx-react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
import FacebookLogo from '../utils/Constants';
import {ScrollView} from 'react-native-gesture-handler';

const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height);
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
export default class MainLogin extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    console.log('Starting the app');
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
        <ScrollView
          style={{
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 22,
            color: Colors.Gray,
          }}>
          <Text style={{fontSize: 14, marginTop: 4, fontWeight: '600'}}>
            Please enter your bank details correctly. They will be used for all
            refunds, margins and bonus payments
          </Text>
          <Text style={{fontSize: 15, marginTop: 30}}>Name of Bank</Text>
          <TextInput
            style={[styles.inputStyle, {marginTop: 4}]}
            label="Banks"
            mode="outlined"
            keyboardType="default"
            returnKeyType="next"
            onChangeText={(text) => this.setState({email: text})}
          />
          <Text style={{fontSize: 15, marginTop: 12}}>
            Account Title / Account Holder's Name
          </Text>
          <TextInput
            style={[styles.inputStyle, {marginTop: 4}]}
            label="Account Title"
            mode="outlined"
            keyboardType="default"
            returnKeyType="next"
            onChangeText={(text) => this.setState({email: text})}
          />
          <Text style={{fontSize: 15, marginTop: 12}}>
            Account Number / IBAN Number
          </Text>
          <TextInput
            style={[styles.inputStyle, {marginTop: 4}]}
            label="Account Number"
            mode="outlined"
            keyboardType="default"
            returnKeyType="next"
            onChangeText={(text) => this.setState({email: text})}
          />
        </ScrollView>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            backgroundColor: Colors.color2,
            width: SCREEN_WIDTH,
            borderRadius: 5,
            position: 'absolute',
            bottom: 20,
            padding: 16,
          }}
          onPress={() => this.props.navigation.navigate('Home')}>
          <Text style={{fontSize: 20, color: Colors.white}}>Save</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },

  inputStyle: {
    shadowOpacity: 0.2,
    shadowColor: 'black',
    borderColor: Colors.color2,
    borderWidth: 1,
    paddingVertical: 16,
    borderRadius: 6,
    paddingHorizontal: 8,
    color: 'black',
  },
});
