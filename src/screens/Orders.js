import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import axios from '../utils/axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../utils/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {inject} from 'mobx-react';
import CustomButton from '../components/CustomButton';

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
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>Orders</Text>
        </View>
        <FontAwesome
          name="gift"
          size={120}
          color={Colors.color1}
          style={{alignSelf: 'center'}}
        />
        <Text style={{fontSize: 28, alignSelf: 'center', marginTop: 12}}>
          No Orders Found
        </Text>
        <CustomButton
          text="Browse Catalogs"
          buttonStyle={{
            alignItems: 'center',
            backgroundColor: Colors.color2,
            marginHorizontal: 20,
            borderRadius: 10,
            marginTop: 20,
            padding: 16,
          }}
          textStyle={{fontSize: 20, color: Colors.white}}
          navigation={this.props.navigation}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  inputStyle: {
    marginHorizontal: 20,
    paddingHorizontal: 10,
    shadowOpacity: 0.2,
    shadowColor: 'black',
    marginTop: 30,
    borderColor: Colors.color2,
    borderWidth: 1,
    paddingVertical: 16,
    borderRadius: 6,
    color: 'black',
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  header: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: Colors.borderGray,
    borderBottomWidth: 1,
  },
});
