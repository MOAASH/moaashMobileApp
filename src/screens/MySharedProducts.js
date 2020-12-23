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
  FlatList,
  ImageBackground,
} from 'react-native';
import axios from '../utils/axios';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../utils/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {inject} from 'mobx-react';
import CategoriesList from '../components/CategoriesList';
import AdSlider from '../components/AdSlider';
import QualityBanner from '../components/QualityBanner';
import WhatsappPopup from '../components/WhatsappPopup';

const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height);
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
export default class MainLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sharing: false,
    };
  }

  componentDidMount = async () => {
    console.log('Home page of the app');
  };
  shareProduct = async () => {
    this.setState({sharing: true});
  };
  hidePopup = async () => {
    this.setState({sharing: false});
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={{marginBottom: SCREEN_HEIGHT / 18}}>
          <Text
            style={{
              paddingHorizontal: 12,
              fontSize: 16,
              fontWeight: '500',
              paddingVertical: 8,
            }}>
            Shared at 1 January
          </Text>
          <TouchableOpacity
            style={styles.productCard}
            onPress={() => this.props.navigation.navigate('ProductDetail')}>
            <View
              style={{
                flexDirection: 'row',
                height: 220,
                justifyContent: 'space-evenly',
              }}>
              <Image
                style={{
                  width: Dimensions.get('screen').width / 2,
                  height: 210,
                  marginTop: 20,
                }}
                source={require('../../assets/shirt1.jpg')}
              />
              <View>
                <Image
                  style={{
                    width: Dimensions.get('screen').width / 3,
                    height: 100,
                    marginTop: 20,
                  }}
                  source={require('../../assets/shirt2.jpeg')}
                />
                <View
                  style={{
                    justifyContent: 'space-around',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{
                      width: Dimensions.get('screen').width / 3,
                      height: 100,
                      marginTop: 10,
                    }}
                    source={require('../../assets/shirt3.jpeg')}
                  />
                  <View
                    style={{
                      ...StyleSheet.absoluteFillObject,
                      backgroundColor: 'rgba(0,0,0,0.6)',
                    }}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 32,

                        color: Colors.white,
                      }}>
                      + 2
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{marginTop: 20, paddingHorizontal: 16}}>
              <Text style={{fontSize: 18}}>Fancy Men Shirt</Text>
              <Text style={{fontSize: 16}}>Starting from Rs. 300</Text>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: Colors.lightGray,
                  padding: 4,
                  width: 150,
                }}>
                <FontAwesome
                  name="truck"
                  size={40}
                  style={{fontWeight: '700'}}
                  color={Colors.color2}
                />
                <Text
                  style={{
                    alignSelf: 'center',
                    paddingLeft: 4,
                    fontWeight: '600',
                  }}>
                  Free Delivery
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  alignContent: 'center',
                  justifyContent: 'center',
                  backgroundColor: Colors.color3,
                  borderRadius: 5,
                  marginTop: 20,
                  flexDirection: 'row',
                  padding: 12,
                }}
                onPress={() => this.shareProduct()}>
                <FontAwesome
                  name="share-square"
                  size={20}
                  style={{fontWeight: '700'}}
                  color={Colors.white}
                />
                <Text
                  style={{fontSize: 18, color: Colors.white, paddingLeft: 12}}>
                  Share Now
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </ScrollView>
        {this.state.sharing && <WhatsappPopup hidePopup={this.hidePopup} />}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
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
  productCard: {
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderColor: Colors.color5,
    paddingVertical: 8,
    marginBottom: 8,
  },
});
