import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import axios from '../utils/axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../utils/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {inject} from 'mobx-react';
import CustomButton from '../components/CustomButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CategoriesType from '../components/CategoriesType';

const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height);
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
export default class Categories extends Component {
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
          <Text style={styles.heading}>Categories</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <CategoriesType />
          <View style={{width: SCREEN_WIDTH / 1.3}}>
            <Text style={{padding: 8, fontWeight: '500', fontSize: 16}}>
              New Arrivals
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                borderTopColor: Colors.color4,
                borderTopWidth: 1,
                paddingTop: 12,
              }}>
              <TouchableOpacity style={{paddingBottom: 12}}>
                <Image
                  source={require('../../assets/new.png')}
                  style={{width: 40, height: 40, alignSelf: 'center'}}
                />
                <Text
                  style={{alignSelf: 'center', fontSize: 12, paddingTop: 6}}>
                  Shirts
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{paddingBottom: 12}}>
                <Image
                  source={require('../../assets/new.png')}
                  style={{width: 40, height: 40, alignSelf: 'center'}}
                />
                <Text
                  style={{alignSelf: 'center', fontSize: 12, paddingTop: 6}}>
                  Jeans
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{paddingBottom: 12}}>
                <Image
                  source={require('../../assets/new.png')}
                  style={{width: 40, height: 40, alignSelf: 'center'}}
                />
                <Text
                  style={{alignSelf: 'center', fontSize: 12, paddingTop: 6}}>
                  T-shirts
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <TouchableOpacity style={{paddingBottom: 12}}>
                <Image
                  source={require('../../assets/new.png')}
                  style={{width: 40, height: 40, alignSelf: 'center'}}
                />
                <Text
                  style={{alignSelf: 'center', fontSize: 12, paddingTop: 6}}>
                  Jackets
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{paddingBottom: 12}}>
                <Image
                  source={require('../../assets/new.png')}
                  style={{width: 40, height: 40, alignSelf: 'center'}}
                />
                <Text
                  style={{alignSelf: 'center', fontSize: 12, paddingTop: 6}}>
                  Hoodies
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{paddingBottom: 12}}>
                <Image
                  source={require('../../assets/new.png')}
                  style={{width: 40, height: 40, alignSelf: 'center'}}
                />
                <Text
                  style={{alignSelf: 'center', fontSize: 12, paddingTop: 6}}>
                  Trousers
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  header: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: Colors.borderGray,
    borderBottomWidth: 1,
  },
});
