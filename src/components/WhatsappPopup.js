import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  AppState,
  // Share,
  Linking,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from '../utils/axios';
import Share from 'react-native-share';
import Colors from '../utils/colors';
import {inject} from 'mobx-react';
import ImgToBase64 from 'react-native-image-base64';
import files from '../components/imageFile64';

@inject('User')
@inject('Products')
export default class WhatsappPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markImage: false,
      markDescription: false,
      count: 10,
    };
  }
  componentDidMount = async () => {
    // console.log('Image is  ', this.props.images);
  };
  markOptionImage = async () => {
    this.setState({markImage: !this.state.markImage});
  };
  markOptionDescription = async () => {
    this.setState({markDescription: !this.state.markDescription});
  };

  shareFirst = async () => {
    await Share.open({
      message: this.props.message,
      failOnCancel: false,
    }).then((res) => {
      this.setState({markDescription: true});
    });
    if (this.state.markImage === false) {
      // console.log('text done ', this.props.number);
      let [
        response_fetched,
        errors,
      ] = await this.props.Products.itemGroupShared(this.props.number);
    }
    // return true;
  };

  shareImageToWhatsApp = async () => {
    // console.log('Sharing');
    await Share.open({
      urls: this.props.images,
      failOnCancel: false,
    });
    this.setState({markImage: true});
    if (this.state.markDescription === false) {
      // console.log('Images done ', this.props.number);
      let [
        response_fetched,
        errors,
      ] = await this.props.Products.itemGroupShared(this.props.number);
    }

    // this.props.hidePopup(false);
  };
  shareTextToWhatsapp = async () => {
    // this.setState({markImage: true});
    await this.shareFirst();

    // this.shareImageToWhatsApp();
  };
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: Colors.white,
            paddingVertical: 24,
            paddingHorizontal: 12,
          }}>
          <Text style={{fontSize: 18, fontWeight: '600', marginBottom: 12}}>
            Share product images and description
          </Text>
          {/* 
          <View style={{flexDirection: 'row'}}>
            <View style={{paddingTop: 8}}>
              {this.state.markDescription == true ? (
                <Ionicons name="checkmark-circle" size={25} />
              ) : (
                <Ionicons name="ellipse-outline" size={25} />
              )}
            </View>
            <Text
              style={{
                fontSize: 16,
                alignSelf: 'center',
                paddingLeft: 8,
                paddingTop: 4,
              }}>
              Product Description
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{paddingTop: 8}}>
              {this.state.markImage == true ? (
                <Ionicons name="checkmark-circle" size={25} />
              ) : (
                <Ionicons name="ellipse-outline" size={25} />
              )}
            </View>
            <Text
              style={{
                fontSize: 16,
                alignSelf: 'center',
                paddingLeft: 8,
                paddingTop: 4,
              }}>
              Images
            </Text>
          </View> */}
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                borderColor: Colors.color3,
                borderRadius: 5,
                borderWidth: 1,
                padding: 12,
                borderRadius: 5,
              }}
              onPress={() => this.shareTextToWhatsapp()}>
              <Text style={{fontSize: 16, color: Colors.color2}}>
                Share Description
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                borderColor: Colors.color3,
                borderRadius: 5,
                borderWidth: 1,
                padding: 12,
                borderRadius: 5,
              }}
              onPress={() => this.shareImageToWhatsApp()}>
              <Text style={{fontSize: 16, color: Colors.color2}}>
                Share Images
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              borderRadius: 5,
              marginTop: 5,
            }}
            onPress={() => this.props.hidePopup(false)}>
            <Text
              style={{
                fontSize: 18,
                color: Colors.color3,
                textDecorationLine: 'underline',
                alignSelf: 'center',
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
});
