import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  CheckBox,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import axios from '../utils/axios';
import Colors from '../utils/colors';
import {inject} from 'mobx-react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import { TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import {ScrollView} from 'react-native-gesture-handler';
import Fonts from '../utils/fonts';

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

@inject('BankDetails')
export default class BankDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountType: 'bankTransfer',
      account_name: '',
      account_number: '',
      bank_name: '',
      primary_account: false
    };
  }

  componentDidMount = async () => {
    console.log('Starting the app');
  };
  
  validationSchema = () => {
    return yup.object().shape({
      account_name: yup.string().trim(),
      account_number: yup.number().required(),
      bank_name: yup.string().trim().required(),
      primary_account: yup.boolean().required(),
    })
  }
  
  formInitialValue = () => {
    return {
      account_name: this.state.account_name,
      account_number: this.state.account_number,
      bank_name: this.state.bank_name,
      primary_account: this.state.primary_account
    }
  };
  
  createBankDetails = async (values) => {
    let [response_fetched, errors] = await this.props.BankDetails.createBankDetails({
      account_name: values.account_name,
      account_number: values.account_number,
      primary_account: values.primary_account,
      bank_name: values.bank_name
    });
    if (response_fetched){
      this.props.navigation.goBack();
    } else {
      console.log('Nothing Fetched');
    }
  }

  render() {
    return (        
            
      <Formik
        initialValues={this.formInitialValue()}
        validationSchema={this.validationSchema}
        onSubmit={values => this.createBankDetails(values)}
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
              <DropDownPicker
                items={[
                    {label: 'Bank Transfer', value: 'bankTransfer', selected: true},
                    {label: 'JazzCash', value: 'jazzCash'},
                    {label: 'EasyPaisa', value: 'easyPaisa'},
                ]}
                defaultValue={'bankTransfer'}
                containerStyle={{ marginTop: 20, fontFamily: 'Poppins-Medium'}}
                labelStyle={{
                    fontSize: 14,
                    textAlign: 'left',
                    fontFamily: 'Poppins-Regular',
                    color: '#000'
                }}
                style={{backgroundColor: '#fafafa', backgroundColor: Colors.white, }}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={item => this.setState({
                  accountType: item.value, bank_name: props.setFieldValue('bank_name', item.label)
                })}
              />
              { this.state.accountType == 'bankTransfer' && 
              
              <FormInput placeholder={"Bank Name"} 
                        handleChange={props.handleChange('bank_name')}
                        touched={props.touched.bank_name}
                        errors={props.errors.bank_name} />
              }
              { this.state.accountType == 'bankTransfer' && 
              <FormInput placeholder={"Account Title"} 
                        handleChange={props.handleChange('account_name')}
                        touched={props.touched.account_name}
                        errors={props.errors.account_name} />
              }
                        
              <FormInput placeholder={"Account Number"} 
                        handleChange={props.handleChange('account_number')}
                        touched={props.touched.account_number}
                        errors={props.errors.account_number} 
                        keyboard={"number-pad"}/>
                        
              <View style={{flexDirection: 'row', marginTop: 16, alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => props.setFieldValue('primary_account', !props.values.primary_account)}>
                  {props.values.primary_account ? (
                    <Ionicons
                      size={25}
                      color={Colors.color1}
                      name={'ios-checkbox'}
                    />
                  ) : (
                    <Ionicons
                      size={25}
                      color={Colors.color1}
                      name={'square-outline'}
                    />
                  )}
                </TouchableOpacity>
                <Text style={{paddingLeft: 8}}>Send Money to this Account</Text>
              </View>
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
              <Text style={{fontSize: 20, color: Colors.white, fontFamily: Fonts.medium }}>Save Bank Account</Text>
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
