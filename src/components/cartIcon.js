import React, {Component} from 'react';

import {View, ActivityIndicator, StyleSheet, Button} from 'react-native';
import Colors from '../utils/colors';

export default class SoldBy extends Component {
  render() {
    return (
      <Button
          onPress={() => alert('This is a button!')}
          title="Info"
          color="#000"
        />
    )};
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

