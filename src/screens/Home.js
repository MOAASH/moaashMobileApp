import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
  TextInput,
} from 'react-native';
import axios from '../utils/axios';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../utils/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {inject} from 'mobx-react';

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
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image
            style={{
              width: 150,
              height: 60,
              alignSelf: 'center',
            }}
            source={require('../../assets/Logo.png')}
          />
          <TouchableOpacity>
            <TextInput
              style={[styles.inputStyle]}
              placeholder="Search by Keyword or Product ID"
              placeholderTextColor="black"
              keyboardType="default"
              returnKeyType="next"
              onChangeText={(text) => this.setState({email: text})}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal={true}
          style={{paddingHorizontal: 12, marginTop: 10, height: 50}}>
          <View style={{alignItems: 'center'}}>
            <FontAwesome
              name="list-alt"
              size={40}
              style={{fontWeight: '700'}}
              color={Colors.color1}
            />
            <Text
              style={{alignSelf: 'center', fontSize: 11, color: Colors.color2}}>
              {' '}
              Categories
            </Text>
          </View>

          <View style={{alignItems: 'center'}}>
            <FontAwesome
              name="list-alt"
              size={40}
              style={{fontWeight: '700'}}
              color={Colors.color1}
            />
            <Text
              style={{alignSelf: 'center', fontSize: 11, color: Colors.color2}}>
              {' '}
              Categories
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <FontAwesome
              name="list-alt"
              size={40}
              style={{fontWeight: '700'}}
              color={Colors.color1}
            />
            <Text
              style={{alignSelf: 'center', fontSize: 11, color: Colors.color2}}>
              {' '}
              Categories
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <FontAwesome
              name="list-alt"
              size={40}
              style={{fontWeight: '700'}}
              color={Colors.color1}
            />
            <Text
              style={{alignSelf: 'center', fontSize: 11, color: Colors.color2}}>
              {' '}
              Categories
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <FontAwesome
              name="list-alt"
              size={40}
              style={{fontWeight: '700'}}
              color={Colors.color1}
            />
            <Text
              style={{alignSelf: 'center', fontSize: 11, color: Colors.color2}}>
              {' '}
              Categories
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <FontAwesome
              name="list-alt"
              size={40}
              style={{fontWeight: '700'}}
              color={Colors.color1}
            />
            <Text
              style={{alignSelf: 'center', fontSize: 11, color: Colors.color2}}>
              {' '}
              Categories
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <FontAwesome
              name="list-alt"
              size={40}
              style={{fontWeight: '700'}}
              color={Colors.color1}
            />
            <Text
              style={{alignSelf: 'center', fontSize: 11, color: Colors.color2}}>
              {' '}
              Categories
            </Text>
          </View>
        </ScrollView>
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
    paddingHorizontal: 10,
    shadowColor: 'black',
    borderColor: Colors.color2,
    borderWidth: 1,
    paddingVertical: 8,
    borderRadius: 6,
    marginHorizontal: 12,
    backgroundColor: Colors.lightGray,
    marginBottom: 8,
    color: 'black',
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  header: {
    borderBottomColor: Colors.borderGray,
    borderBottomWidth: 1,
  },
});
