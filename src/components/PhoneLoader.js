import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import Colors from '../utils/colors';

const PhoneLoader = ({style}) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={Colors.color4} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 30,
    top: 75,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
});

export default PhoneLoader;
