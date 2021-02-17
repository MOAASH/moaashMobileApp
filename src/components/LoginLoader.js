import React from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';
import Colors from '../utils/colors';

const LoginLoader = ({style}) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={Colors.color4} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
});

export default LoginLoader;
