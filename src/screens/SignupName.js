import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Colors from '../utils/colors';
import Fonts from '../utils/fonts'
import { inject } from 'mobx-react';

@inject('User')
export default class MainLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  componentDidMount = async () => {
    // console.log('Starting the app');
  };
  setName = async () => {
    this.props.User.setName(this.state.name);
    this.props.navigation.navigate('SignupPhone');
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={{fontSize: 20, marginHorizontal: 20, marginTop: 30, fontFamily: Fonts.medium }}>
          What's your name?
        </Text>
        <TextInput
          style={[styles.inputStyle, {marginTop: 4}]}
          placeholder="Name"
          placeholderTextColor="black"
          keyboardType="default"
          returnKeyType="next"
          autoFocus
          onChangeText={(text) => this.setState({name: text})}
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
          onPress={() => this.setName()}>
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
