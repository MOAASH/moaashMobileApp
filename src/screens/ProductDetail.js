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
  ScrollView,
} from 'react-native';
import axios from '../utils/axios';
import Colors from '../utils/colors';
import {inject} from 'mobx-react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../components/CustomButton';
import FacebookLogo from '../utils/Constants';
import ShareAndCartButton from '../components/ShareAndCartButton';
import ProductDetailsDescription from '../components/ProductDetailsDescription';
import IconBanner from '../components/IconBanner';

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
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.lightGray}}>
        <ScrollView style={{marginBottom: SCREEN_HEIGHT / 16}}>
          <View style={styles.productCard}>
            <View>
              <Image
                style={{
                  width: Dimensions.get('screen').width / 2,
                  height: 210,
                  marginTop: 20,
                  alignSelf: 'center',
                }}
                source={require('../../assets/shirt1.jpg')}
              />
            </View>
            <View style={{marginTop: 20, paddingHorizontal: 16}}>
              <Text style={{fontSize: 18}}>Fancy Men Shirt</Text>
              <Text style={{fontSize: 16}}>PKR 300</Text>
              <Text style={{fontSize: 10, marginTop: 8, marginBottom: 8}}>
                Price includes GST
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: Colors.lightGray,
                  padding: 4,
                  width: 150,
                }}>
                <FontAwesome
                  name="truck"
                  size={28}
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
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: Colors.lightGray,
                  padding: 4,
                  width: 200,
                  marginTop: 8,
                }}>
                <FontAwesome
                  name="calendar"
                  size={12}
                  style={{fontWeight: '700'}}
                  color={Colors.color2}
                />
                <Text
                  style={{
                    alignSelf: 'center',
                    paddingLeft: 4,
                    fontWeight: '600',
                  }}>
                  Delivered in 2 - 3 Days
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  alignContent: 'center',
                  justifyContent: 'center',
                  backgroundColor: Colors.white,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: Colors.color2,
                  marginTop: 20,
                  flexDirection: 'row',
                  padding: 8,
                }}
                onPress={() => this.shareProduct()}>
                <FontAwesome
                  name="share-square"
                  size={20}
                  style={{fontWeight: '700'}}
                  color={Colors.color2}
                />
                <Text
                  style={{fontSize: 18, color: Colors.color2, paddingLeft: 12}}>
                  Share Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              marginTop: 4,
            }}>
            <ProductDetailsDescription />
          </View>
          <View
            style={{
              marginTop: 8,
            }}>
            <IconBanner />
          </View>
        </ScrollView>
        <ShareAndCartButton />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
  },
  productCard: {
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderColor: Colors.color5,
    paddingBottom: 12,
    marginBottom: 8,
  },
});
