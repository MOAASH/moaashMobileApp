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

export default class CustomButton extends Component {
  constructor(props) {
    super(props);
    const {size} = this.props;
    this.state = {
      selected: false,
      size: size,
    };
  }
  componentDidMount = async () => {
    console.log('Sizes of items are ', this.props.size);
  };
  select = async (item) => {
    this.setState({selected: !this.state.selected});
    this.props.sizeChoosen(item);
  };

  render() {
    return (
      <View style={{alignItems: 'flex-start'}}>
        <TouchableOpacity
          style={{
            borderColor: this.state.selected ? 'green' : Colors.color2,
            borderRadius: 20,
            borderWidth: 2,
            paddingVertical: 8,
            paddingHorizontal: 12,
            marginHorizontal: 8,
          }}
          onPress={() => this.select(this.state.size)}>
          <Text style={{fontSize: 18}}>{this.state.size}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
