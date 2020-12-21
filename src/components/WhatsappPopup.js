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
import files from '../components/imageFile64';

export default class WhatsappPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markImage: false,
      markDescription: false,
    };
  }
  componentDidMount = async () => {
    // console.log('Image is  ', files.image1);
  };
  markOptionImage = async () => {
    this.setState({markImage: !this.state.markImage});
  };
  markOptionDescription = async () => {
    this.setState({markDescription: !this.state.markDescription});
  };
  shareImageToWhatsApp = async () => {
    // Linking.openURL(`whatsapp://send?text=${text}`);
    await Share.open({
      urls: [files.image1, files.image2],
      // message: 'I Love you',
    });
    this.setState({markImage: true});
    this.shareTextToWhatsapp();
  };
  shareTextToWhatsapp = async () => {
    await Share.open({
      message: 'I Love you',
    });
    this.setState({markDescription: true});
    this.po;
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
            <TouchableOpacity
              style={{paddingTop: 8}}
              onPress={() => this.markOptionImage()}>
              {this.state.markImage == true ? (
                <Ionicons name="checkmark-circle" size={25} />
              ) : (
                <Ionicons name="ellipse-outline" size={25} />
              )}
            </TouchableOpacity>
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
            <TouchableOpacity
              style={{paddingTop: 8}}
              onPress={() => this.markOptionDescription()}>
              {this.state.markDescription == true ? (
                <Ionicons name="checkmark-circle" size={25} />
              ) : (
                <Ionicons name="ellipse-outline" size={25} />
              )}
            </TouchableOpacity>
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
              padding: 8,
              marginTop: 20,
            }}
            onPress={() => this.shareImageToWhatsApp()}>
            <Text style={{fontSize: 20, color: Colors.white}}>Share</Text>
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
                fontSize: 20,
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
