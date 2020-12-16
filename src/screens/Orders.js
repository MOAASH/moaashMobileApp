import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import axios from '../utils/axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../utils/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {inject} from 'mobx-react';
import CustomButton from '../components/CustomButton';

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
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>Orders</Text>
        </View>
        <Text style={{paddingHorizontal: 8, marginTop: 4, fontSize: 14}}>
          Target Tracker => 1 Jan - 7 Jan
        </Text>

        <View
          style={{
            marginTop: 4,
            marginHorizontal: 8,
            elevation: 8,
            borderColor: Colors.lightGray,
            borderWidth: 2,
            paddingVertical: 8,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                paddingHorizontal: 8,
                marginTop: 4,
                fontSize: 18,
                fontWeight: '700',
              }}>
              Target sales for 2% bonus:
            </Text>
            <Text
              style={{
                color: Colors.color1,
                fontSize: 18,
                fontWeight: '700',
                marginTop: 4,
              }}>
              PKR 1800
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 4}}>
            <Text
              style={{
                paddingHorizontal: 8,
                marginTop: 4,
                fontSize: 18,
                fontWeight: '700',
              }}>
              Current week sales:
            </Text>
            <Text
              style={{
                color: Colors.color1,
                fontSize: 18,
                fontWeight: '700',
                marginTop: 4,
              }}>
              PKR 0
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 4}}>
            <Text
              style={{
                paddingHorizontal: 8,
                marginTop: 4,
                fontSize: 18,
                fontWeight: '700',
              }}>
              Amount left to reach target:
            </Text>
            <Text
              style={{
                color: Colors.color1,
                fontSize: 18,
                fontWeight: '700',
                marginTop: 4,
              }}>
              PKR 1800
            </Text>
          </View>
        </View>
        <Text style={{fontSize: 28, alignSelf: 'center', marginTop: 12}}>
          No Orders Found
        </Text>
        <CustomButton
          text="Browse Catalogs"
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
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  header: {
    marginTop: 50,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
  },
});
