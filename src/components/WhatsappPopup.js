import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  //   Share,
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
    };
  }
  componentDidMount = async () => {
    console.log('Image is  ', this.props.images);
  };
  markOptionImage = async () => {
    this.setState({markImage: !this.state.markImage});
  };
  markOptionDescription = async () => {
    this.setState({markDescription: !this.state.markDescription});
  };
  // convertTo64 = async () => {
  //   let myImages = [];

  //   for (const item of this.props.images) {
  //     // console.log('item' + item);
  //     await ImgToBase64.getBase64String(item)
  //       .then((base64String) => {
  //         // console.log('Converting' + base64String);
  //         base64String = 'data:image/png;base64,' + base64String;
  //         myImages.push(base64String);
  //       })
  //       .catch((err) => console.log('My error is ', err));
  //   }

  //   return myImages;
  // };
  shareImageToWhatsApp = async () => {
    console.log('Sharing');
    // this.props.loading(true);
    // var myImages = await this.convertTo64();
    await Share.open({
      urls: this.props.images,
    });
    // this.props.loading(false);
    this.setState({markImage: true});
    this.shareTextToWhatsapp();
  };
  shareTextToWhatsapp = async () => {
    await Share.open({
      message: 'I Love you',
    });
    this.setState({markDescription: true});
    this.props.hidePopup(false);
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
          <View style={{flexDirection: 'row'}}>
            <View
              style={{paddingTop: 8}}
              onPress={() => this.markOptionImage()}>
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
          </View>
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
          <TouchableOpacity
            style={{
              alignItems: 'center',
              backgroundColor: Colors.color2,
              borderRadius: 5,
              padding: 6,
              marginTop: 20,
            }}
            onPress={() => this.shareImageToWhatsApp()}>
            <Text style={{fontSize: 18, color: Colors.white}}>Share</Text>
          </TouchableOpacity>
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
