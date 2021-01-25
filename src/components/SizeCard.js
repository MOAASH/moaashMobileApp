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
import {inject} from 'mobx-react';

export default class SizeCard extends Component {
  constructor(props) {
    super(props);
    const {size, selected} = this.props;
    this.state = {
      size: size,
    };
  }
  componentDidMount = async () => {
    console.log('Sizes of items are ', this.props.size);
  };
  
  select = async (item) => {
    if (!this.state.selected){
      this.props.sizeChoosen(item);
    }
  };

  render() {
    return (
      <View style={{alignItems: 'flex-start'}}>
        <TouchableOpacity
          style={{
            borderColor: Colors.color5,
            borderRadius: 20,
            backgroundColor: this.props.selected ? Colors.color5 : Colors.white,
            borderWidth: 2,
            paddingVertical: 8,
            paddingHorizontal: 12,
            marginHorizontal: 8,
          }}
          onPress={() => this.select(this.state.size)}>
          <Text
            style={{
              fontSize: 12,
              color: this.props.selected ? Colors.white : Colors.color1,
            }}>
            {this.state.size}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
