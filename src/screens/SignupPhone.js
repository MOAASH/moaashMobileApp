import React, {Component} from 'react';
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from '../utils/axios';
import Colors from '../utils/colors';
import {inject} from 'mobx-react';
import PhoneLoader from '../components/PhoneLoader';
import Loader from '../components/Loader';
@inject('User')
export default class MainLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      loaded: false,
    };
  }

  componentDidMount = async () => {
    // console.log('Starting the app');
  };
  setPhone = async () => {
    this.setState({loaded: true});
    let available = await this.props.User.setPhone(this.state.phone);
    // console.log('phone set ', available);
    this.setState({loaded: false});

    if (available == true) {
      this.props.navigation.navigate('SignupPassword');
    } else {
      Alert.alert('Phone number taken');
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={{fontSize: 20, marginHorizontal: 20, marginTop: 30}}>
            What's your phone number?
          </Text>
          <TextInput
            style={[styles.inputStyle, {marginTop: 4}]}
            placeholder="Phone"
            placeholderTextColor="black"
            keyboardType="default"
            returnKeyType="next"
            autoFocus
            onChangeText={(text) => this.setState({phone: text})}
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
            onPress={() => this.setPhone()}>
            <Text style={{fontSize: 20, color: Colors.white}}>Next</Text>
          </TouchableOpacity>
        </ScrollView>
        {this.state.loaded && <PhoneLoader />}
      </SafeAreaView>
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
