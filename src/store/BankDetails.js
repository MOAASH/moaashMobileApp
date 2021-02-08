import {observable, action} from 'mobx';
import axios from '../utils/axios';
import {observer} from 'mobx-react';
import AsyncStorage from '@react-native-async-storage/async-storage';

class BankDetails {
  @observable bankAccountsList = [];

  constructor() {}

  @action
  fetchBankDetails = async () => {
    let response_fetched = false;
    let error_message    = {};
    const userAuthenticationToken = await AsyncStorage.getItem('APP:UserAuthToken');
    await axios
      .get(`/bank_details`, { headers: { Authorization: `Token ${userAuthenticationToken}` } }
      ).then((response) => {
        console.log("res --------> ", response.data.data)
        this.bankAccountsList = response.data.data;
        response_fetched = true;
      }).catch((error) => {
        error_message = error.response;
      })

    return [response_fetched, error_message];    
  };
  
  @action
  createBankDetails = async (bank_details_params) => {
    let response_fetched = false;
    let error_message    = {};
    const userAuthenticationToken = await AsyncStorage.getItem('APP:UserAuthToken');
    await axios
      .post(`/bank_details`, { bank_details: bank_details_params }, { headers: { Authorization: `Token ${userAuthenticationToken}` } }
      ).then((response) => {
        console.log("res --------> ", response.data.data)
        this.bankAccountsList = response.data.data;
        response_fetched = true;
      }).catch((error) => {
        error_message = error.response;
      })

    return [response_fetched, error_message];    
  };
}

export default BankDetails;

