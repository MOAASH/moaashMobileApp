import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import axios from '../utils/axios';
import Colors from '../utils/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {inject} from 'mobx-react';
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
export default class IconBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
    };
  }

  render() {
    return (
      <View style={styles.leftScroller}>
        <TouchableOpacity
          style={{
            paddingBottom: 12,
            backgroundColor: Colors.white,
            paddingTop: 12,
          }}>
          <Image
            source={require('../../assets/new.png')}
            style={{width: 30, height: 30, alignSelf: 'center'}}
          />
          <Text
            style={{
              color: Colors.color1,
              alignSelf: 'center',
              fontSize: 10,
              paddingBottom: 8,
            }}>
            New Arrivals
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{paddingBottom: 12, paddingTop: 12}}>
          <Image
            source={require('../../assets/men.png')}
            style={{width: 30, height: 30, alignSelf: 'center'}}
          />
          <Text style={{alignSelf: 'center', fontSize: 10, paddingBottom: 8}}>
            Men
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{paddingBottom: 12, paddingTop: 12}}>
          <Image
            source={require('../../assets/women.png')}
            style={{width: 30, height: 30, alignSelf: 'center'}}
          />
          <Text style={{alignSelf: 'center', fontSize: 10, paddingBottom: 8}}>
            Women
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{paddingBottom: 12, paddingTop: 12}}>
          <Image
            source={require('../../assets/kids.png')}
            style={{width: 30, height: 30, alignSelf: 'center'}}
          />
          <Text style={{alignSelf: 'center', fontSize: 10, paddingBottom: 8}}>
            Kids
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{paddingBottom: 12, paddingTop: 12}}>
          <Image
            source={require('../../assets/shoes.png')}
            style={{width: 30, height: 30, alignSelf: 'center'}}
          />
          <Text style={{alignSelf: 'center', fontSize: 10, paddingBottom: 8}}>
            Shoes & Bags
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{paddingBottom: 12, paddingTop: 12}}>
          <Image
            source={require('../../assets/sofa.png')}
            style={{width: 30, height: 30, alignSelf: 'center'}}
          />
          <Text style={{alignSelf: 'center', fontSize: 10, paddingBottom: 8}}>
            Home Accessories
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{paddingBottom: 12, paddingTop: 12}}>
          <Image
            source={require('../../assets/sport.png')}
            style={{width: 30, height: 30, alignSelf: 'center'}}
          />
          <Text style={{alignSelf: 'center', fontSize: 10, paddingBottom: 8}}>
            Sports
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  leftScroller: {
    backgroundColor: Colors.lightGray,
    width: SCREEN_WIDTH / 4,
    paddingBottom: 12,
  },
});
