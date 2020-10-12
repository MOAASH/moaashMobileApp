import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text
} from "react-native";
import axios from "../utils/axios";
import Colors from '../utils/colors'
import { inject } from "mobx-react";


export default class Splash extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
   console.log("Starting the app")
  };


  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ width: Dimensions.get("screen").width, height: 180 }}
          source={require("../../assets/Logo.png")}
          resizeMode="contain"
        />
        <Text style={{fontSize:18, color: Colors.color1}}>Pakistan's #1 Online Reselling App</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  logo: {
    alignSelf: "center",
  },
});
