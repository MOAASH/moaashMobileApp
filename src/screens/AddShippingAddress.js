import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import axios from '../utils/axios';
import Colors from '../utils/colors';
import { TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import {inject} from 'mobx-react';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
import FacebookLogo from '../utils/Constants';
import {ScrollView} from 'react-native-gesture-handler';
import { values } from 'mobx';

const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height);
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);

const FormInput = ({ placeholder, handleChange, touched, errors, keyboard = null }) => {
  return (
      <View>
          <TextInput
            theme={{ colors: { text: Colors.black, primary: Colors.color3, background: Colors.white }}}
            selectionColor={Colors.color2}
            underlineColor={Colors.lightGray2}
            style={[styles.inputStyle, {marginTop: 4, backgroundColor: Colors.white}]}
            label={placeholder}
            placeholder={placeholder}
            keyboardType={keyboard ? keyboard : "default" }
            returnKeyType="next"
            onChangeText={handleChange}
          />
          {errors && touched &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors}</Text>
          }
      </View>
  )
}

@inject('ShippingAddress')
export default class AddShippingAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: 'Punjab'
    };
  }

  componentDidMount = async () => {
    console.log('Starting the app');
  };
  
  validationSchema = () => {
    return yup.object().shape({
      customer_name: yup.string().trim().required('Customer is a required field'),
      phone_number: yup.number().required(),
      street_address: yup.string().trim().required(),
      city: yup.string().trim().required(),
      zipcode: yup.number(),
    })
  }
  
  formInitialValue = () => {
    return {
      customer_name: '', phone_number: '', street_address: '', city: '', zipcode: ''
    }
  };
  
  createAddress = async (values) => {
    console.log(values);
    values.state = this.state.state;
    console.log(values);
    let [response_fetched, error_message] = await this.props.ShippingAddress.createShippingAddress(values);
    if (response_fetched){
      this.props.navigation.navigate('SelectShippingAddress');
    }
  }

  render() {
    return (
      <Formik
        initialValues={this.formInitialValue()}
        validationSchema={this.validationSchema}
        onSubmit={values => this.createAddress(values)}
      >
        {props => (
          <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
            <ScrollView
              style={{
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 22,
                color: Colors.Gray,
              }}>
                
                <FormInput placeholder={"Customer Name"} 
                          handleChange={props.handleChange('customer_name')}
                          touched={props.touched.customer_name}
                          errors={props.errors.customer_name} />
                          
                <FormInput placeholder={"Customer Phone Number"} 
                          handleChange={props.handleChange('phone_number')}
                          touched={props.touched.phone_number}
                          errors={props.errors.phone_number}
                          keyboard={"number-pad"} />
                          
                <FormInput placeholder={"Complete Address"} 
                          handleChange={props.handleChange('street_address')}
                          touched={props.touched.street_address}
                          errors={props.errors.street_address} />
                          
                <FormInput placeholder={"City"} 
                          handleChange={props.handleChange('city')}
                          touched={props.touched.city}
                          errors={props.errors.city} />
                          
                <FormInput placeholder={"ZipCode"} 
                          handleChange={props.handleChange('zipcode')}
                          touched={props.touched.zipcode}
                          errors={props.errors.zipcode}
                          keyboard={"number-pad"} />
                          
                <DropDownPicker
                  items={[
                      {label: 'Punjab', value: 'Punjab', selected: true},
                      {label: 'Khyber Pakhtunkhwa', value: 'Khyber Pakhtunkhwa'},
                      {label: 'Sindh', value: 'Sindh'},
                      {label: 'Balochistan', value: 'Balochistan'},
                      {label: 'Gilgit', value: 'Gilgit'},
                      {label: 'Kashmir', value: 'Kashmir'},
                  ]}
                  defaultValue={this.state.country}
                  containerStyle={{ marginTop: 20, fontFamily: 'Poppins-Medium'}}
                  labelStyle={{
                      fontSize: 14,
                      textAlign: 'left',
                      fontFamily: 'Poppins-Regular',
                      color: '#000'
                  }}
                  style={{backgroundColor: '#fafafa', backgroundColor: Colors.white, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0}}
                  itemStyle={{
                      justifyContent: 'flex-start'
                  }}
                  dropDownStyle={{backgroundColor: '#fafafa'}}
                  onChangeItem={item => this.setState({
                      state: item.value
                  })}
                />
                          
            </ScrollView>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                backgroundColor: Colors.color2,
                width: SCREEN_WIDTH,
                borderRadius: 5,
                position: 'absolute',
                bottom: 20,
                padding: 16,
              }}
              onPress={props.handleSubmit}>
              <Text style={{fontSize: 20, color: Colors.white}}>Continue</Text>
            </TouchableOpacity>
          </SafeAreaView>
        )}
        </Formik>    
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },

  inputStyle: {
  },
});
