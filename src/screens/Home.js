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
import ItemGroupList from '../components/ItemGroupList';
import Loader from '../components/Loader';

const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height);
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
@inject('User')
@inject('Products')
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sharing: false,
      loaded: true,
    };
  }

  componentDidMount = async () => {
    console.log('Home page of the app');
    this.getItemGroups();
  };
  getItemGroups = async () => {
    let gettingItemGroup = await this.props.Products.getItemGroups(
      this.props.User.userInformation.attributes.authentication_token,
    );
    this.setState({loaded: false});
  };
  shareProduct = async () => {
    this.setState({sharing: true});
  };
  hidePopup = async () => {
    this.setState({sharing: false});
  };

  render() {
    const data = ['../../assets/MoaashBanner.png', '../../assets/Logo.png'];
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={{marginBottom: SCREEN_HEIGHT / 18}}>
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
          <View>
            <ScrollView
              horizontal={true}
              style={{paddingHorizontal: 12, marginTop: 10}}>
              <View style={{alignItems: 'center', width: 80}}>
                <FontAwesome
                  name="male"
                  size={30}
                  style={{fontWeight: '700'}}
                  color={Colors.color1}
                />
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 11,
                    color: Colors.color2,
                  }}>
                  {' '}
                  Men
                </Text>
              </View>

              <View style={{alignItems: 'center', width: 80}}>
                <FontAwesome
                  name="female"
                  size={30}
                  style={{fontWeight: '700'}}
                  color={Colors.color1}
                />
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 11,
                    color: Colors.color2,
                  }}>
                  {' '}
                  Women
                </Text>
              </View>
              <View style={{alignItems: 'center', width: 80}}>
                <FontAwesome
                  name="child"
                  size={30}
                  style={{fontWeight: '700'}}
                  color={Colors.color1}
                />
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 11,
                    color: Colors.color2,
                  }}>
                  {' '}
                  Kids
                </Text>
              </View>
              <View style={{alignItems: 'center', width: 80}}>
                <FontAwesome
                  name="shopping-bag"
                  size={30}
                  style={{fontWeight: '700'}}
                  color={Colors.color1}
                />
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 11,
                    color: Colors.color2,
                  }}>
                  {' '}
                  Shoes & Bags
                </Text>
              </View>
              <View style={{alignItems: 'center', width: 80}}>
                <FontAwesome
                  name="bed"
                  size={30}
                  style={{fontWeight: '700'}}
                  color={Colors.color1}
                />
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 11,
                    color: Colors.color2,
                  }}>
                  {' '}
                  Home
                </Text>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 11,
                    color: Colors.color2,
                  }}>
                  {' '}
                  Accessories
                </Text>
              </View>
              <View style={{alignItems: 'center', width: 80}}>
                <FontAwesome
                  name="soccer-ball-o"
                  size={30}
                  style={{fontWeight: '700'}}
                  color={Colors.color1}
                />
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 11,
                    color: Colors.color2,
                  }}>
                  {' '}
                  Sports
                </Text>
              </View>
            </ScrollView>
          </View>
          <View>
            <FlatList
              keyExtractor={(item) => item.id}
              data={data}
              horizontal
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              renderItem={(item) => (
                <AdSlider
                  AdImage={item}
                  scrollEnabled={true}
                  navigation={this.props.navigation}
                />
              )}
            />
          </View>
          <QualityBanner />
          <FlatList
            keyExtractor={(item) => item.id}
            data={this.props.Products.itemGroups}
            renderItem={(item) => (
              <ItemGroupList
                Products={item}
                scrollEnabled={false}
                navigation={this.props.navigation}
                shareProduct={this.shareProduct}
              />
            )}
          />
        </ScrollView>
        {this.state.sharing && <WhatsappPopup hidePopup={this.hidePopup} />}
        {this.state.loaded && <Loader />}
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
  productCard: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderColor: Colors.color5,
    paddingVertical: 8,
    marginBottom: 8,
  },
});
